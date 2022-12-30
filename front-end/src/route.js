import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App"
import AddUser from "./components/AddUser";

function routesApp(){

return (
    <BrowserRouter>
        <Routes>
             <Route path="/" element={<App/>}/>
             <Route path="/Adduser" element={<AddUser/>}/>
        </Routes>
    </BrowserRouter>
)
}

export default routesApp