import React from 'react';
import logo from './logo.svg';
import './App.css';
import TransactionListPage from "./pages/TransactionsListPage";
import TransctionDetailPage from "./pages/TransctionDetailPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <>
          <Routes>
            <Route path="/" element={<TransactionListPage />} />
            <Route path="/List" element={<TransactionListPage />} />
            <Route path="/detail/:id" element={<TransctionDetailPage />} />
          </Routes>
        </>
      </Router>

    </div >
  );
}

export default App;
