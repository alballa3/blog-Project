import { useEffect, useState } from "react";
import { Header } from "./header";
import { session } from "@/lib/auth";
import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export const Layout = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [user, setUser] = useState<string | undefined>("");
  useEffect(() => {
    session().then((data) => {
      setUser(data.session?.name);
      setStatus(data.status);
    });
  }, []);
  const handleSignOut = async () => {
    const repsond = await fetch("http://localhost:3000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    const json = await repsond.json();
    toast.success(json.message);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <Header
        isAuthenticated={status}
        userName={user}
        onSignOut={handleSignOut}
      />
      <ToastContainer />
      <Outlet />

      <Navbar />
    </>
  );
};
