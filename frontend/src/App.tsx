import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/auth/register";
import Index from "./pages";
import Login from "./pages/auth/login";
import { GuestRoute } from "./lib/auth";
import { Layout } from "./components/layouts/layout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
