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
                setIsEditingProfile(false);
            }
        } catch (err) {
            setMessage({
                type: "error",
                text: err.data?.message || "Failed to update profile",
            });
        }
    };

    return (
        <div className="unified-card">
            <div className="section-header">
                <h3>Personal Details</h3>
            </div>

            {!isEditingProfile ? (
                <div className="details-grid">
                    <div className="detail-item">
                        <span className="detail-label">First Name</span>
                        <span className="detail-value">{user?.firstName}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Last Name</span>
                        <span className="detail-value">{user?.lastName}</span>
                    </div>
                    <button onClick={() => setIsEditingProfile(true)}>
                        Edit Profile
                    </button>
                </div>
            ) : (
                <form className="profile-form" onSubmit={handleProfileSubmit}>
                    <div className="input-group">
                        <label className="detail-label">First Name</label>
                        <input
                            className="profile-input"
                            type="text"
                            name="firstName"
                            value={profileForm.firstName}
                            onChange={handleProfileChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="detail-label">Last Name</label>
                        <input
                            className="profile-input"
                            type="text"
                            name="lastName"
                            value={profileForm.lastName}
                            onChange={handleProfileChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" disabled={isUpdatingProfile}>
                            {isUpdatingProfile ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            className="cancel-btn"
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default PersonalDetails;
