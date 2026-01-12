// IndexedDB setup for dataset storage
const DB_NAME = 'PaLintaSanDB';
const DB_VERSION = 1;
const DATASET_STORE = 'datasets';

// Initialize IndexedDB
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Create datasets store if it doesn't exist
            if (!db.objectStoreNames.contains(DATASET_STORE)) {
                const store = db.createObjectStore(DATASET_STORE, { keyPath: 'id' });
                store.createIndex('category', 'category', { unique: false });
                store.createIndex('year', 'year', { unique: false });
                store.createIndex('upload_date', 'upload_date', { unique: false });
            }
        };
    });
}

// Save dataset to IndexedDB
async function saveDataset(dataset) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DATASET_STORE], 'readwrite');
        const store = transaction.objectStore(DATASET_STORE);
        const request = store.put(dataset);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Get all datasets from IndexedDB
async function getAllDatasets() {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DATASET_STORE], 'readonly');
        const store = transaction.objectStore(DATASET_STORE);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Get dataset by ID
async function getDataset(id) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DATASET_STORE], 'readonly');
        const store = transaction.objectStore(DATASET_STORE);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Delete dataset
async function deleteDataset(id) {
    const db = await initDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([DATASET_STORE], 'readwrite');
        const store = transaction.objectStore(DATASET_STORE);
        const request = store.delete(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Search datasets
async function searchDatasets(query) {
    const allDatasets = await getAllDatasets();
    const lowerQuery = query.toLowerCase();

    return allDatasets.filter(dataset =>
        dataset.title.toLowerCase().includes(lowerQuery) ||
        dataset.description.toLowerCase().includes(lowerQuery) ||
        dataset.category.toLowerCase().includes(lowerQuery)
    );
}

// Get datasets by category
async function getDatasetsByCategory(category) {
    const allDatasets = await getAllDatasets();
    return allDatasets.filter(dataset => dataset.category === category);
}

// Get datasets by year
async function getDatasetsByYear(year) {
    const allDatasets = await getAllDatasets();
    return allDatasets.filter(dataset => dataset.year === year);
}
