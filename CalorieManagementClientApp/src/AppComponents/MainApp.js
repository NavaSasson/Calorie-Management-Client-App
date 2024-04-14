// Ofir Bittan 208660076
// Nava Naane 212229512

// Imports.
import CaloriesForm from './CaloriesForm';
import CaloriesReport from './CaloriesReport';

// This file is the main app part.
// Define the MainApp component.
function MainApp() {
    // Fetch CaloriesForm and CaloriesReport AppComponents.
    return (
        <>
            <CaloriesForm/>
            <CaloriesReport/>
        </>
    );
}

// Export the Main App component.
export default MainApp;
