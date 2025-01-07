import "./App.css";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import AddItems from "./components/AddItems";
import ViewProfile from "./components/ViewProfile";
import UserAccount from "./components/UserAccount";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import WardrobePage from "./components/WardrobePage";
import ItemModal from "./components/ItemModal";
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
          path="/add-items" element={<AddItems />}
          />
          <Route 
          path="/wardrobe" element={<WardrobePage />}
          />
          <Route 
          path="/ViewProfile" element={<ViewProfile/>}
          />
          <Route 
          path="/UserAccount" element={<UserAccount/>}
          />
          {/* <Route
            path="/item-modal" element={<ItemModal />}
          /> */}
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