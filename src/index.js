import ReactDOM from 'react-dom/client';
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {BrowserRouter} from 'react-router-dom';
import { LoginContextProvider } from './Components/Context/LoginContext';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <LoginContextProvider>
    <App />
    </LoginContextProvider>
</BrowserRouter>
);
