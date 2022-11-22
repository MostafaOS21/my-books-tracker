import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";
import { GetShelfs, SetShelfs } from "./components/BooksContext";
// Import Books Shelf
import BooksShelf from "./components/BooksShelf";

// Import Search Page
import SearchPage from "./components/SearchPage";
function App() {
  const [currRead, setcurrRead] = useState(null);
  const [wantToRead, setWantToRead] = useState(null);
  const [readDone, setReadDone] = useState(null);
  const location = useLocation();

  return (
    <div className="App">
      <SetShelfs.Provider value={[setcurrRead, setWantToRead, setReadDone]}>
        <GetShelfs.Provider value={[currRead, wantToRead, readDone]}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BooksShelf />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </GetShelfs.Provider>
      </SetShelfs.Provider>
    </div>
  );
}

export default App;
