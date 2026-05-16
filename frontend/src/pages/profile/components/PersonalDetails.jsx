import { useUpdateProfileMutation } from "../../../services/userAPI";
import { useState, useEffect } from "react";

function PersonalDetails({ user, setMessage, refetch }) {
    const [updateProfile, { isLoading: isUpdatingProfile }] =
        useUpdateProfileMutation();

    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        if (user) {
            setProfileForm({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
            });
        }
    }, [user]);

    const handleProfileChange = (e) =>
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });
        try {
            const res = await updateProfile(profileForm).unwrap();
            if (res.OK) {
                refetch();
                setMessage({
                    type: "success",
                    text: "Profile updated successfully!",
                });
            }
            setIsEditingProfile(false);
        } catch (err) {
            setMessage({
                type: "error",
                text: err.data?.message || "Failed to update profile",
            });
        }
    };

    return (
        <div>
            <h3>Personal Details</h3>
            {!isEditingProfile ? (
                <div>
                    <p>
                        <strong>First Name:</strong> {user?.firstName}
                    </p>
                    <p>
                        <strong>Last Name:</strong> {user?.lastName}
                    </p>
                    <button onClick={() => setIsEditingProfile(true)}>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form onSubmit={handleProfileSubmit}>
                    <div>
                        <label>First Name: </label>
                        <input
                            type="text"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name: </label>
                        <input
                            type="text"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isUpdatingProfile}>
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
}

export default PersonalDetails;
