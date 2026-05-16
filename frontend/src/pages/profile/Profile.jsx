import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    useGetMeQuery,
    useChangePasswordMutation,
    useLogoutMutation,
    authAPI,
} from "../../services/authAPI";
import {
    useUpdateProfileMutation,
    useUploadPhotoMutation,
} from "../../services/userAPI";
import ProfilePhoto from "./components/ProfilePhoto";
import PersonalDetails from "./components/PersonalDetails";
import ChangePassword from "./components/ChangePassword";
import Logout from "./components/Logout";

const Profile = () => {
    const navigate = useNavigate();

    const { data: profileData, isLoading } = useGetMeQuery();

    const user = profileData?.data;
    console.log(profileData)

    const [message, setMessage] = useState({ type: "", text: "" });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {message.text && (
                <div
                    style={{
                        color: message.type === "error" ? "red" : "green",
                        margin: "10px 0",
                    }}
                >
                    {message.text}
                </div>
            )}

            <ProfilePhoto user={user} setMessage={setMessage}></ProfilePhoto>
            <hr />
            <PersonalDetails user={user} setMessage={setMessage}></PersonalDetails>
            <hr />
            <ChangePassword user={user} setMessage={setMessage}></ChangePassword>
            <br />
            <Logout></Logout>
        </div>
    );
};

export default Profile;
