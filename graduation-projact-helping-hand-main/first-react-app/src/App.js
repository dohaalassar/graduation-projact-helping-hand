import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ParentSignupPage from "./pages/ParentSignupPage";
import PsychologistSignupPage from "./pages/PsychologistSignupPage";
import ParentDashboard from "./pages/ParentDashboard";
import AddChildPage from "./pages/AddChildPage";
import ChildrenDetailsPage from "./pages/ChildrenDetailsPage";
import SDQAssessmentPage from "./pages/SDQAssessmentPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/parent" element={<ParentSignupPage />} />
        <Route path="/signup/psychologist" element={<PsychologistSignupPage />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/add-child" element={<AddChildPage />} />
        <Route path="/parent/children" element={<ChildrenDetailsPage />} />
        <Route path="/parent/sdq" element={<SDQAssessmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;