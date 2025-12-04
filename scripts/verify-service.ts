import { fetchDriveDocuments } from '../app/oct-assistant/services/documentService';

async function verify() {
    console.log("Verifying 'HR Policies' fetch...");
    try {
        const docs = await fetchDriveDocuments('HR Policies');
        console.log(`Fetched ${docs.length} documents.`);
        docs.forEach(doc => {
            console.log(`- ${doc.name} (${doc.content ? doc.content.length : 0} chars)`);
            if (doc.content) {
                console.log(`  Preview: ${doc.content.substring(0, 100).replace(/\n/g, ' ')}...`);
            }
        });

        console.log("\nVerifying 'Service Management' fetch (Mock)...");
        const mockDocs = await fetchDriveDocuments('Service Management');
        console.log(`Fetched ${mockDocs.length} documents.`);
        mockDocs.forEach(doc => {
            console.log(`- ${doc.name}`);
        });

    } catch (error) {
        console.error('Verification failed:', error);
    }
}

verify();
