import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import AddPage from "./views/AddPage";
import EditPage from "./views/EditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-grocery" element={<AddPage />} />
            <Route path="/update-grocery/:id" element={<EditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
