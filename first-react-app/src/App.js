
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ParentSignupPage from "./pages/ParentSignupPage";
import PsychologistSignupPage from "./pages/PsychologistSignupPage";
import ParentDashboard from "./pages/ParentDashboard";
import AddChildPage from "./pages/AddChildPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup/parent" element={<ParentSignupPage />} />
        <Route path="/signup/psychologist" element={<PsychologistSignupPage />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/add-child" element={<AddChildPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;