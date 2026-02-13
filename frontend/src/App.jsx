import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo"; // 👈

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} /> {/* 👈 */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
