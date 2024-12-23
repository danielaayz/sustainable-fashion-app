import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Components/Homepage";
import Profile from "./Components/Profile";
import Footer from "./Components/Footer";
// import AddItems from "./Components/AddItems";
import Contact from "./Components/Contact";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <div className="flex flex-col min-h-screen">
    <Header />
      <div className="flex-grow">
        <Routes>
          <Route index element={<Homepage />}
          />
          <Route
            path="/profile" element={<Profile />}
          />
          <Route
            // path="/add-items" element={<AddItems />}
          />
          <Route
            path="/home" element={<Navigate to="/" replace />}
          />
          <Route
            path="/contact" element={<Contact />}
          />
          <Route
            path="/register" element={<Register />}
          />
          <Route
            path="/login" element={<Login />}
          />
          
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;
