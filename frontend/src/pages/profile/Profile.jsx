import { useState } from "react";
import { useGetMeQuery } from "../../services/authAPI";
import ProfilePhoto from "./components/ProfilePhoto";
import PersonalDetails from "./components/PersonalDetails";
import ChangePassword from "./components/ChangePassword";
import Logout from "./components/Logout";
import "./Profile.css";

const Profile = () => {
    const { data: profileData, isLoading, refetch } = useGetMeQuery();
    const user = profileData?.data;
    const [message, setMessage] = useState({ type: "", text: "" });

    if (isLoading) {
        return (
            <div className="profile-page">
                <div className="loading-container">
                    <div className="typing-text">Loading profile...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            {message.text && (
                <div className={`message-banner ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="profile-header">
                <ProfilePhoto
                    user={user}
                    setMessage={setMessage}
                    refetch={refetch}
                />
                <h2>{user?.firstName} {user?.lastName}</h2>
            </div>

            <div className="profile-section">
                <PersonalDetails
                    user={user}
                    setMessage={setMessage}
                    refetch={refetch}
                />
            </div>

            <div className="profile-section">
                <ChangePassword
                    user={user}
                    setMessage={setMessage}
                    refetch={refetch}
                />
            </div>

            <div className="logout-section">
                <Logout />
            </div>
        </div>
    );
};

export default Profile;
