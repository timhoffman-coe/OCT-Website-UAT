
import { listSharedFolders } from '../app/lib/google-drive';

async function main() {
    try {
        console.log('Listing shared folders...');
        const folders = await listSharedFolders();
        console.log('Shared Folders found:');
        folders.forEach(f => {
            console.log(`- ${f.name} (ID: ${f.id})`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
