
const fs = require('fs');
const path = require('path');

// Mock Buffer if needed (Node has it global usually)
const { Buffer } = require('buffer');

async function debug() {
    let pdfParse = require('pdf-parse');

    // Handle import structure as in the app
    if (typeof pdfParse !== 'function') {
        if (pdfParse.default) {
            pdfParse = pdfParse.default;
        } else if (pdfParse.PDFParse) {
            pdfParse = pdfParse.PDFParse;
        }
    }

    console.log('pdfParse type:', typeof pdfParse);

    // Create a dummy PDF buffer (minimal valid PDF)
    // This is a minimal PDF with "Hello World"
    const pdfData = Buffer.from(`%PDF-1.7
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 24 Tf
100 700 Td
(Hello World) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000010 00000 n
0000000060 00000 n
0000000117 00000 n
0000000234 00000 n
0000000328 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
417
%%EOF`);

    try {
        console.log('Attempting to parse dummy PDF...');
        let data;
        try {
            data = await pdfParse(pdfData);
            console.log('Called as function success.');
        } catch (e) {
            console.log('Call as function failed:', e.message);
            if (e.message && e.message.includes("Class constructors cannot be invoked without 'new'")) {
                console.log('Attempting with new...');
                const uint8Data = new Uint8Array(pdfData);
                const parser = new pdfParse(uint8Data);
                console.log('Called with new success. Calling load()...');

                // Check if load returns promise
                try {
                    // Try passing data to load
                    const loadResult = parser.load(uint8Data);
                    if (loadResult instanceof Promise) {
                        await loadResult;
                    }
                    console.log('Load complete.');
                } catch (err) {
                    console.error('Load failed:', err);
                }

                console.log('Calling getText()...');
                try {
                    const textResult = parser.getText();
                    if (textResult instanceof Promise) {
                        data = { text: await textResult };
                    } else {
                        data = { text: textResult };
                    }
                    console.log('getText complete.');
                } catch (err) {
                    console.error('getText failed:', err);
                }
            } else {
                throw e;
            }
        }

        console.log('Result keys:', Object.keys(data || {}));
        if (data && data.text) {
            console.log('Text content:', data.text);
        } else {
            console.log('No text content found.');
            if (data) {
                console.log('Data object keys:', Object.keys(data));
                console.log('Data prototype:', Object.getPrototypeOf(data));
                console.log('Data prototype keys:', Object.getOwnPropertyNames(Object.getPrototypeOf(data)));
            }
        }

    } catch (e) {
        console.error('Parsing failed:', e);
    }
}

debug();
