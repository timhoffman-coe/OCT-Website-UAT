
import { getFileContent } from '../app/lib/google-drive';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
    try {
        const docxFileId = '1H6ikrVdIby-tKEDsTmPzwMhxqJtTbodA'; // Network Connectivity .docx
        const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        let output = '--- Debugging .docx Content Fetching ---\n';
        output += `File ID: ${docxFileId}\n`;
        output += `MimeType: ${mimeType}\n\n`;

        console.log('Attempting to fetch file content...');

        // Call getFileContent directly
        const content = await getFileContent(docxFileId, mimeType);

        output += `Result Type: ${typeof content}\n`;
        if (typeof content === 'string') {
            output += `Content Length: ${content.length}\n`;
            output += `Preview: ${content.substring(0, 200)}...\n`;
        } else {
            output += `Result: ${JSON.stringify(content)}\n`;
        }

        fs.writeFileSync('debug-drive-output.txt', output);
        console.log('Output written to debug-drive-output.txt');

    } catch (error) {
        console.error('Error in debug script:', error);
        fs.writeFileSync('debug-drive-output.txt', `Error: ${error}`);
    }
}

main();
