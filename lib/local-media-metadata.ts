import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const METADATA_FILE = join(process.cwd(), 'public/uploads/_metadata.json');

interface FileMetadata {
    altText?: string;
    caption?: string;
    category?: string;
}

interface MetadataStore {
    [filename: string]: FileMetadata;
}

async function getStore(): Promise<MetadataStore> {
    try {
        const data = await readFile(METADATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return {};
    }
}

async function saveStore(store: MetadataStore) {
    try {
        await writeFile(METADATA_FILE, JSON.stringify(store, null, 2));
    } catch (e) {
        console.error("Failed to save metadata", e);
    }
}

export async function getFileMetadata(filename: string): Promise<FileMetadata | undefined> {
    const store = await getStore();
    return store[filename];
}

export async function updateFileMetadata(filename: string, metadata: FileMetadata) {
    const store = await getStore();
    store[filename] = { ...store[filename], ...metadata };
    await saveStore(store);
}
