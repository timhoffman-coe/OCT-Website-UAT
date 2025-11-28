import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_DIR = path.join(__dirname, '../app');
const OUTPUT_FILE = path.join(__dirname, '../lib/siteMapData.ts');

function toTitleCase(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function scanDirectory(dir, baseUrl = '') {
    let pages = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            // Skip special Next.js folders and api
            if (item.name.startsWith('(') || item.name.startsWith('_') || item.name === 'api') continue;

            const fullPath = path.join(dir, item.name);
            const relativePath = path.join(baseUrl, item.name);

            // Check if this directory has a page.tsx/js
            const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx')) ||
                fs.existsSync(path.join(fullPath, 'page.js'));

            if (hasPage) {
                const title = toTitleCase(item.name);
                pages.push({
                    title: title,
                    path: `/${relativePath.replace(/\\/g, '/')}`,
                    description: `Page for ${title}`,
                    keywords: item.name.split('-')
                });
            }

            // Recurse
            pages = pages.concat(scanDirectory(fullPath, relativePath));
        }
    }
    return pages;
}

console.log('Scanning app directory...');
const pages = scanDirectory(APP_DIR);

// Add Home manually
pages.unshift({
    title: "Home",
    path: "/",
    description: "Main landing page",
    keywords: ["home", "start"]
});

const fileContent = `export interface SitePage {
  title: string;
  path: string;
  description: string;
  keywords: string[];
}

export const siteMapData: SitePage[] = ${JSON.stringify(pages, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, fileContent);
console.log(`Generated site map with ${pages.length} pages at ${OUTPUT_FILE}`);
