import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ParentSignupPage from "./pages/ParentSignupPage";
import PsychologistSignupPage from "./pages/PsychologistSignupPage";
import ParentDashboard from "./pages/ParentDashboard";
import AddChildPage from "./pages/AddChildPage";
import ChildrenDetailsPage from "./pages/ChildrenDetailsPage";
import SDQAssessmentPage from "./pages/SDQAssessmentPage";
import LandingPage from "./pages/LandingPage";
import GameIntroPage from "./pages/GameIntroPage";
import GamePlayPage from "./pages/GamePlayPage";
import Game2IntroPage from "./pages/Game2IntroPage";
import Game2PlayPage from "./pages/Game2PlayPage";

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
        <Route path="/game/intro/:childId" element={<GameIntroPage />} />
        <Route path="/game/play/:childId" element={<GamePlayPage />} />
        <Route path="/game2/intro/:childId" element={<Game2IntroPage />} />
        <Route path="/game2/play/:childId" element={<Game2PlayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;