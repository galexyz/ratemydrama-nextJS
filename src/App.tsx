import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Views/Home";
import CategoryView from "./Views/CategoryView";
import AddDramaView from "./Views/AddDramaView";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Navbar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/category/:category"
                        element={<CategoryView />}
                    />
                    <Route
                        path="/add-drama/:category"
                        element={<AddDramaView />}
                    />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
