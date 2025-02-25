
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import AddGamePage from "./views/AddGamePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddGamePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
