import "./App.css";
import { useState } from "react";
import { Item } from "./types/ItemTypes";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import AddItemForm from "./components/AddItems";
import ViewProfile from "./components/ViewProfile";
import UserAccount from "./components/UserAccount";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Login from "./components/Login";
import WardrobePage from "./components/WardrobePage";
import { Routes, Route, Navigate } from "react-router-dom";
import ItemDetailModal from "./components/ItemModal";

function App() {
   const [selectedItem, setSelectedItem] = useState<Item | null>(null);
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedItem(null);
   };

   return (
      <div className="flex flex-col min-h-screen">
         <Header />
         <div className="flex-grow">
            <Routes>
               <Route index element={<Homepage />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/add-items" element={<AddItemForm />} />
               <Route path="/add-items/:id" element={<AddItemForm />} />
               <Route path="/wardrobe" element={<WardrobePage />} />
               <Route path="/ViewProfile" element={<ViewProfile />} />
               <Route path="/UserAccount" element={<UserAccount />} />
               <Route path="/home" element={<Navigate to="/" replace />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
            </Routes>

            {selectedItem && (
               <ItemDetailModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  item={selectedItem}
               />
            )}
         </div>
         <Footer />
      </div>
   );
}

export default App;
