import "./App.css";
import Header from "./Components/Header";
import Homepage from "./Components/Homepage";
import Register from "./Components/Register";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
// import Contact from "./Components/Contact";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <div className="flex flex-col min-h-screen">
    <Header />

      <Routes>
        <Route index element={<Homepage />}
        />
        <Route
          path="/login" element={<Login />}
        />
        <Route
          path="/register" element={<Register />}
        />
        <Route
          path="/home" element={<Navigate to="/" replace />}
        />
     
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
