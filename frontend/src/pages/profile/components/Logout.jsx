import Button from "../../../reusable-components/Button";
import { useLogoutMutation } from "../../../services/authAPI";
import { authAPI } from "../../../services/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Logout() {
    const [apiLogout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await apiLogout().unwrap();
            if (response.OK) {
                dispatch(authAPI.util.resetApiState());
                navigate("/login");
            }
        } catch (err) {
            console.error("Error Logoutting user!", err);
            alert("Error in Logout");
        }
    };

    return <Button text={"Logout"} clickHandler={handleLogout}></Button>;
}

export default Logout;
