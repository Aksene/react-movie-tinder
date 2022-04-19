import { useAuth } from "../Auth/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    // Call custom useAuth hook
    const auth = useAuth()
    // If user is logged in then direct the user to the page
    // If not then direct them to the sign in page using Navigate
    return auth.user ? children : <Navigate to ={"/sign-in"}/>
}

export default ProtectedRoute;
