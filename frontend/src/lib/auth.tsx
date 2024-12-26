import React from "react"
import { Navigate, Outlet } from "react-router";


interface ISession {
    status: boolean,
    session: {
        name: string,
        email: string,
    } | null
}
export async function session(): Promise<ISession> {
    const response = await fetch("http://localhost:3000/api/auth/session", {
        method: "GET",
        credentials: "include"
    })
    const json = await response.json()
    if (!response.ok) {
        return { session: null, status: false }
    }
    const session = json.session
    return { session, status: true }
}

export const AuthRoute: React.FC = () => {
    const [state, setState] = React.useState(false) ;

    React.useEffect(() => {
        session().then((data) => setState(data.status));
    }, []);

    

    return state ? <Outlet/> : <Navigate to="/login" />;
};
export const GuestRoute:React.FC=()=>{
    const [state, setState] = React.useState(true) ;
    React.useEffect(() => {
        session().then((data) => setState(!data.status));
    }, []);
    return state ? <Outlet/> : <Navigate to="/" />;
}