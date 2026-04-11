
// import { BrowserRouter } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <LoginPage />
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ParentSignupPage from "./pages/ParentSignupPage";
import PsychologistSignupPage from "./pages/PsychologistSignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup/parent" element={<ParentSignupPage />} />
        <Route path="/signup/psychologist" element={<PsychologistSignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;