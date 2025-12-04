import { listSharedFolders, listFilesInFolder, getFileContent } from '../app/lib/google-drive';

async function main() {
    try {
        const folders = await listSharedFolders();
        const hrFolder = folders.find(f => f.name === 'HR_FILES');

        if (hrFolder && hrFolder.id) {
            console.log(`\nListing files in '${hrFolder.name}' (${hrFolder.id})...`);
            const files = await listFilesInFolder(hrFolder.id);

            if (files.length > 0) {
                const firstFile = files[0];
                console.log(`\nFetching content for file: ${firstFile.name} (${firstFile.id})`);
                if (firstFile.id && firstFile.mimeType) {
                    const content = await getFileContent(firstFile.id, firstFile.mimeType);
                    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
                    console.log('Content preview:', contentStr.substring(0, 200) + '...');
                }
            } else {
                console.log('No files found in HR_FILES');
            }
        } else {
            console.log('HR_FILES folder not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
