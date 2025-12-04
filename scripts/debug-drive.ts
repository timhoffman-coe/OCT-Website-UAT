
import { listSharedFolders, listFilesInFolder, getFileContent } from '../app/lib/google-drive';
import path from 'path';

// Load environment variables from .env.local if available (optional)
// dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });


async function debugDrive() {
    try {
        console.log('Listing shared folders...');
        const folders = await listSharedFolders();
        console.log('Folders found:', folders.map(f => `${f.name} (${f.id})`));

        const hrFolder = folders.find(f => f.name === 'HR_FILES');
        if (hrFolder && hrFolder.id) {
            console.log(`\nFound HR_FILES folder with ID: ${hrFolder.id}`);
            console.log('Listing files in HR_FILES...');
            const files = await listFilesInFolder(hrFolder.id);

            if (files.length === 0) {
                console.log('No files found in HR_FILES folder.');
            } else {
                console.log('Files found:');
                for (const file of files) {
                    console.log(`- Name: ${file.name}`);
                    console.log(`  ID: ${file.id}`);
                    console.log(`  MimeType: ${file.mimeType}`);

                    if (file.id && file.mimeType) {
                        try {
                            console.log('  Attempting to fetch content...');
                            const content = await getFileContent(file.id, file.mimeType);
                            if (typeof content === 'string') {
                                console.log(`  Content length: ${content.length}`);
                                console.log(`  Content preview: ${content.substring(0, 100)}...`);
                            } else {
                                console.log('  Content is not a string.');
                            }
                        } catch (err) {
                            console.error('  Failed to fetch content:', err);
                        }
                    }
                    console.log('---');
                }
            }
        } else {
            console.error('HR_FILES folder not found.');
        }
    } catch (error) {
        console.error('Error debugging Drive:', error);
    }
}

debugDrive();
