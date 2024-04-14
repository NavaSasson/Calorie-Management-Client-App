// Open the IndexedDB database
const openDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('caloriesdb', 1);

        request.onerror = () => {
            reject('Error opening database');
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('data', {keyPath: 'id', autoIncrement: true });
            // objectStore.createIndex('someIndex', 'someKey');
        };
    });
};

// Function to add calories to the object store
const addCalories = async (formData) => {
    try {
        // Open the database
        const db = await openDB();

        // Start a transaction
        const transaction = db.transaction(['data'], 'readwrite');

        // Access the object store
        const objectStore = transaction.objectStore('data');

        // Add the form data to the object store
        const request = objectStore.add({
            category: formData.category,
            description: formData.description,
            numOfCalories: formData.numOfCalories,
            date: formData.date
        });

        // Return a promise
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                resolve('Data added successfully');
            };

            request.onerror = () => {
                reject('Error adding data');
            };
        });
    } catch (error) {
        throw new Error('Error adding data: ' + error.message);
    }
};

// Usage example
const form = document.getElementById('f-selections');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        category: form.category.value,
        description: form.description.value,
        numOfCalories: form.numOfCalories.value,
        date: form.date.value
};

    try {
        const result = await addCalories(formData);
        console.log(result); // Data added successfully
        alert("data has been added")
        location.reload()
    } catch (error) {
        console.error(error); // Handle error
    }
   
    
});
