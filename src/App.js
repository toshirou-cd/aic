import "./App.css";
import {  Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Darshboard } from "./pages/DarshBoard";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import AppLayout from "./components/AppLayout";
function App() {
  return (
    // <Router>
          <AppLayout>
        <Routes>
          <Route path="/" element={<Darshboard/>} />
          <Route path="/admin/dashboard" element={<Darshboard />} />
          <Route path="/admin/account" element={<Account />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes> 
      </AppLayout>
    // {/* </Router> */}
  );
}

export default App;
