import { useState } from "react";
import { useGetMeQuery } from "../../services/authAPI";
import ProfilePhoto from "./components/ProfilePhoto";
import PersonalDetails from "./components/PersonalDetails";
import ChangePassword from "./components/ChangePassword";
import Logout from "./components/Logout";

const Profile = () => {
    const { data: profileData, isLoading, refetch } = useGetMeQuery();

    const user = profileData?.data;
    console.log(profileData);

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

            <ProfilePhoto
                user={user}
                setMessage={setMessage}
                refetch={refetch}
            ></ProfilePhoto>
            <hr />
            <PersonalDetails
                user={user}
                setMessage={setMessage}
                refetch={refetch}
            ></PersonalDetails>
            <hr />
            <ChangePassword
                user={user}
                setMessage={setMessage}
                refetch={refetch}
            ></ChangePassword>
            <br />
            <Logout></Logout>
        </div>
    );
};

export default Profile;
