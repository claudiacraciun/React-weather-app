import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header/header";
import ForecastPage from "./pages/forecast";
import About from "./pages/about";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
