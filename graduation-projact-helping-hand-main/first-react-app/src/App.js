import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ParentSignupPage from "./pages/ParentSignupPage";
import PsychologistSignupPage from "./pages/PsychologistSignupPage";
import ParentDashboard from "./pages/ParentDashboard";
import AddChildPage from "./pages/AddChildPage";
import ChildrenDetailsPage from "./pages/ChildrenDetailsPage";
import SDQAssessmentPage from "./pages/SDQAssessmentPage";
import GameIntroPage from "./pages/GameIntroPage";
import GamePlayPage from "./pages/GamePlayPage";
import Game2IntroPage from "./pages/Game2IntroPage";
import Game2PlayPage from "./pages/Game2PlayPage";
import Game3IntroPage from "./pages/Game3IntroPage";
import Game4IntroPage from "./pages/Game4IntroPage";
import Game4PlayPage from "./pages/Game4PlayPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public Routes ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/signup/parent" element={<ParentSignupPage />} />
        <Route path="/signup/psychologist" element={<PsychologistSignupPage />} />

        {/* ── Parent Protected Routes ── */}
        <Route path="/parent/dashboard" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <ParentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/parent/add-child" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <AddChildPage />
          </ProtectedRoute>
        } />
        <Route path="/parent/children" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <ChildrenDetailsPage />
          </ProtectedRoute>
        } />
        <Route path="/parent/sdq" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <SDQAssessmentPage />
          </ProtectedRoute>
        } />

        {/* ── Game Routes ── */}
        <Route path="/game/intro/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <GameIntroPage />
          </ProtectedRoute>
        } />
        <Route path="/game/play/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <GamePlayPage />
          </ProtectedRoute>
        } />
        <Route path="/game2/intro/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <Game2IntroPage />
          </ProtectedRoute>
        } />
        <Route path="/game2/play/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <Game2PlayPage />
          </ProtectedRoute>
        } />
        <Route path="/game3/intro/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <Game3IntroPage />
          </ProtectedRoute>
        } />
        <Route path="/game4/intro/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <Game4IntroPage />
          </ProtectedRoute>
        } />
        <Route path="/game4/play/:childId" element={
          <ProtectedRoute allowedRoles={['parent']}>
            <Game4PlayPage />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;