import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CardPage from "./pages/CardPage";
import CardDetailPage from "./pages/CardDetailPage";
import CreateGuide from "./pages/CreateGuide";
import EditGuide from "./pages/EditGuide";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cards" element={<CardPage />} />
      <Route path="/cards/:id" element={<CardDetailPage />} />
      <Route path="/create" element={<CreateGuide />} />
      <Route path="/edit/:id" element={<EditGuide />} />
    </Routes>
  );
}

export default App;
