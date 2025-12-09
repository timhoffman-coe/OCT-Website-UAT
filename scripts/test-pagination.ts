
import { listSharedFolders } from '../app/lib/google-drive';

async function main() {
    try {
        console.log('Fetching shared folders...');
        const folders = await listSharedFolders();
        console.log(`Total folders returned: ${folders.length}`);

        if (folders.length === 100) {
            console.log('WARNING: Exactly 100 folders returned. This indicates pagination limiting is active.');
        } else {
            console.log('Folder count is below limit (100). Pagination is likely not the issue.');
        }

        // Check for Service_Desk
        const sd = folders.find(f => f.name === 'Service_Desk');
        if (sd) {
            console.log(`Found "Service_Desk" at index ${folders.indexOf(sd)}`);
        } else {
            console.log('Service_Desk NOT found in this batch.');
        }

    } catch (error) {
        console.error(error);
    }
}

main();
