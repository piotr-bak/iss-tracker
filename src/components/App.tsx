import { Planet } from "./Planet/Planet.tsx";
import { Sidebar } from "./Sidebar/Sidebar.tsx";
import "./App.scss";

export function App() {
    return (
        <div className='container'>
            <Sidebar />
            <Planet />
        </div>
    );
}
