// Ofir Bittan 208660076
// Nava Naane 212229512

// Import Bootstrap library.
import 'bootstrap/dist/css/bootstrap.min.css';

// Import MainApp component.
import MainApp from './AppComponents/MainApp';
import './App.css';

// Define the App component.
function App() {
    return (
        <main className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <MainApp/>
        </main>
    );
}

// Export the App component.
export default App;
