import { google } from 'googleapis';
import path from 'path';

// Use environment variable if available, otherwise fallback to relative path
const KEY_FILE_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(process.cwd(), 'service-account.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

export const getDriveClient = () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: KEY_FILE_PATH,
        scopes: SCOPES,
    });

    return google.drive({ version: 'v3', auth });
};

export const listSharedFolders = async () => {
    const drive = getDriveClient();
    try {
        let allFiles: any[] = [];
        let pageToken: string | undefined = undefined;

        do {
            const res = await drive.files.list({
                q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
                fields: 'nextPageToken, files(id, name)',
                pageToken: pageToken,
            });
            if (res.data.files) {
                allFiles = allFiles.concat(res.data.files);
            }
            pageToken = res.data.nextPageToken || undefined;
        } while (pageToken);

        return allFiles;
    } catch (error) {
        console.error('Error listing folders:', error);
        throw error;
    }
};

export const listFilesInFolder = async (folderId: string) => {
    const drive = getDriveClient();
    try {
        let allFiles: any[] = [];
        let pageToken: string | undefined = undefined;

        do {
            const res = await drive.files.list({
                q: `'${folderId}' in parents and trashed = false`,
                fields: 'nextPageToken, files(id, name, mimeType, webViewLink)',
                pageToken: pageToken,
            });

            if (res.data.files) {
                allFiles = allFiles.concat(res.data.files);
            }
            pageToken = res.data.nextPageToken || undefined;
        } while (pageToken);

        return allFiles;
    } catch (error) {
        console.error(`Error listing files in folder ${folderId}:`, error);
        throw error;
    }
};

export const getFileContent = async (fileId: string, mimeType: string) => {
    const drive = getDriveClient();
    try {
        if (mimeType === 'application/vnd.google-apps.document') {
            // Export Google Docs to plain text
            const res = await drive.files.export({
                fileId,
                mimeType: 'text/plain',
            });
            return res.data;
        } else if (mimeType === 'application/pdf') {
            console.log(`Processing PDF file: ${fileId}`);
            const res = await drive.files.get({
                fileId,
                alt: 'media',
            }, { responseType: 'arraybuffer' });

            // Polyfill DOMMatrix for pdf-parse/pdf.js in Node environment
            if (!(global as any).DOMMatrix) {
                (global as any).DOMMatrix = class DOMMatrix {
                    a: number; b: number; c: number; d: number; e: number; f: number;
                    constructor() {
                        this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
                    }
                    setMatrixValue(str: string) { return this; }
                    translate(tx: number, ty: number) { return this; }
                    scale(sx: number, sy: number) { return this; }
                    rotate(angle: number) { return this; }
                    multiply(other: any) { return this; }
                };
            }

            let pdfParse = require('pdf-parse');
            // Handle different import structures (ESM/CJS/Next.js)
            if (typeof pdfParse !== 'function') {
                if (pdfParse.default) {
                    pdfParse = pdfParse.default;
                } else if (pdfParse.PDFParse) {
                    pdfParse = pdfParse.PDFParse;
                }
            }

            const { Buffer } = require('buffer');
            let text = '';

            try {
                // Try standard function call first (for some versions)
                const data = await pdfParse(Buffer.from(res.data as ArrayBuffer));
                text = data.text;
            } catch (e: any) {
                if (e.message && e.message.includes("Class constructors cannot be invoked without 'new'")) {
                    // Handle class-based usage (likely pdf-parse-fork or similar)
                    const uint8Data = new Uint8Array(Buffer.from(res.data as ArrayBuffer));
                    const parser = new pdfParse(uint8Data);

                    // Some versions require explicit load
                    if (typeof parser.load === 'function') {
                        await parser.load(uint8Data);
                    }

                    if (typeof parser.getText === 'function') {
                        const textData = await parser.getText();
                        if (textData && Array.isArray(textData.pages)) {
                            text = textData.pages.map((p: any) => p.text).join('\n');
                        } else if (textData && typeof textData.text === 'string') {
                            text = textData.text;
                        } else {
                            text = JSON.stringify(textData);
                        }
                    } else {
                        // Fallback if no getText
                        text = JSON.stringify(parser);
                    }
                } else {
                    throw e;
                }
            }

            console.log('PDF Text Length:', text?.length);
            return text;
        } else if (mimeType.startsWith('text/')) {
            const res = await drive.files.get({
                fileId,
                alt: 'media',
            });
            return res.data;
        }
        return 'Unsupported file type for content extraction';
    } catch (error) {
        console.error(`Error getting content for file ${fileId}:`, error);
        throw error;
    }
};
