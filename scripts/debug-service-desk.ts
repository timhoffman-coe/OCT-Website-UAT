
import { listFilesInFolder } from '../app/lib/google-drive';

const SERVICE_DESK_ID = '118RLZ1vicCbRdXcCHwzKqPct99_pzVVO';

async function main() {
    try {
        console.log(`Listing files in Service_Desk folder (${SERVICE_DESK_ID})...`);
        const files = await listFilesInFolder(SERVICE_DESK_ID);

        if (files.length === 0) {
            console.log('Folder is empty.');
        } else {
            console.log(`Found ${files.length} files:`);
            files.forEach(f => {
                console.log(`- Name: ${f.name}`);
                console.log(`  ID: ${f.id}`);
                console.log(`  MimeType: ${f.mimeType}`);
                console.log('---');
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
