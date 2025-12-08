
import { fetchDriveDocuments } from '../app/oct-assistant/services/documentService';

async function main() {
    try {
        console.log("Testing 'IT Service Desk' document fetching...");
        const documents = await fetchDriveDocuments('IT Service Desk');

        if (documents.length > 0) {
            console.log('SUCCESS: Fetched documents for IT Service Desk');
            console.log('Document count:', documents.length);
            documents.forEach(doc => {
                console.log(`- ${doc.name} (Content length: ${doc.content.length})`);
            });
        } else {
            console.warn('WARNING: No documents returned. Check if the folder is empty or if there is an error.');
        }
    } catch (error) {
        console.error('ERROR: Failed to fetch documents:', error);
        process.exit(1);
    }
}

main();
