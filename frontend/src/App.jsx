import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import QuienesSomos from "./pages/QuienesSomos";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
