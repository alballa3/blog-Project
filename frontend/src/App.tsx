import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { AuthRoute, GuestRoute } from "./lib/auth";
import { Layout } from "./components/layouts/layout";
import Index from "./pages";
import BlogPage from "./pages/blog/page";
import BlogSearchResults from "./pages/blog/search";
import BlogCreateForm from "./pages/blog/create";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<AuthRoute />}>
            <Route path="/create" element={<BlogCreateForm />} />
          </Route>
          <Route path="/" element={<Index />} />
          <Route path="/blog/:id" element={<BlogPage />} />
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
