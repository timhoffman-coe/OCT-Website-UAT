
const pdfParse = require('pdf-parse');
console.log('Type of pdfParse:', typeof pdfParse);
console.log('pdfParse value:', pdfParse);
if (typeof pdfParse === 'object') {
    console.log('Keys:', Object.keys(pdfParse));
    if (pdfParse.default) {
        console.log('Type of pdfParse.default:', typeof pdfParse.default);
    } else {
        console.log('No default export found.');
    }
    if (pdfParse.PDFParse) {
        console.log('Type of pdfParse.PDFParse:', typeof pdfParse.PDFParse);
        try {
            console.log('Attempting to call as function...');
            pdfParse.PDFParse(Buffer.from('test'));
        } catch (e) {
            console.log('Call failed:', e.message);
        }
        try {
            console.log('Attempting to call with new...');
            new pdfParse.PDFParse(Buffer.from('test'));
            console.log('Instantiation successful');
        } catch (e) {
            console.log('Instantiation failed:', e.message);
        }
    }
}
