// Ofir Bittan 208660076
// Nava Naane 212229512

// This file is for the indexed db functions.
// Create a namespace object for indexeddb.

const idb = {};

// Define a function that will open calories db with a given name and version.
idb.openCaloriesDB = async function (dbName, dbVersion) {
    return new Promise((resolve, reject) => {

        // Check if indexeddb is available in the browser.
        if (!indexedDB) {
            reject('IndexedDB is not available in the current browser!');
            return;
        }

        // Open calories database with the provided name and version.
        const idbRequest = indexedDB.open(dbName, dbVersion);

        // Handle errors during the calories database opening process.
        idbRequest.onerror = event => reject(`Could not open ${dbName} Data Base. Error message: ${event.target.error}`);
        idbRequest.onsuccess = event => {

            // Get a reference to calories database.
            const caloriesDB = event.target.result;

            // Define a function that inserts calorie data to calories database.
            caloriesDB.addCalories = ({calories, category, description}) => new Promise((resolve, reject) => {
                const transaction = caloriesDB.transaction(['calories'], 'readwrite');
                const caloriesObjectStore = transaction.objectStore('calories');
                transaction.oncomplete = () => resolve(true);
                transaction.onerror = event => reject(`Error adding calorie consumption: ${event.target.error}`);

                // Create a calorie data object and add it to the calories database.
                const caloriesData = {
                    calories: calories,
                    category: category,
                    description: description,
                    date: getFormattedYearMonth(new Date())
                };
                caloriesObjectStore.add(caloriesData);
            });

            // Define a function that gets monthly report about calorie consumption data.
            caloriesDB.getMonthlyReport = date => new Promise((resolve, reject) => {
                const transaction = caloriesDB.transaction(['calories'], 'readonly');
                const caloriesObjectStore = transaction.objectStore('calories');
                const calorieConsumptionDates = caloriesObjectStore.index('date');
                const dateMatcher = IDBKeyRange.only(date);
                const request = calorieConsumptionDates.getAll(dateMatcher);

                // Map the data we got to a simplified format and resolve the promise.
                request.onsuccess = event => {
                    const monthlyCalories = event.target.result
                        .map(({calories, description, category}) => ({calories, description, category}));
                    resolve(monthlyCalories);
                };
                request.onerror = event => reject(`Error getting calories: ${event.target.error}`);
            });

            // Resolve the promise with the calories database instance.
            resolve(caloriesDB);
        };

        // Handle an event of calories database version upgrades.
        idbRequest.onupgradeneeded = event => {
            const caloriesDB = event.target.result;

            // Create an object for calories consumptions and an index for date-based queries.
            if (!idb.caloriesObjectStore) {
                idb.caloriesObjectStore = caloriesDB.createObjectStore('calories', {
                    keyPath: 'id',
                    autoIncrement: true
                });
                idb.caloriesObjectStore.createIndex('date', 'date', {unique: false});
            }
        };

        const getFormattedYearMonth = date => {
            return `${(date.getFullYear())}-${(date.getMonth() + 1) < 10 ? '0' : ''}${(date.getMonth() + 1)}`;
        };
    });
}
window.idb = idb;