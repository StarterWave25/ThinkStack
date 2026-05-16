import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout as logoutAction } from "../app/authSlice";
import {
  useGetMeQuery,
  useChangePasswordMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUploadPhotoMutation,
} from "../services/authAPI";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // API Hooks
  const { data: profileData, isLoading } = useGetMeQuery();
  const [changePassword, { isLoading: isChangingPwd }] =
    useChangePasswordMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileMutation();
  const [uploadPhoto, { isLoading: isUploadingPhoto }] =
    useUploadPhotoMutation();
  const [apiLogout] = useLogoutMutation();

  const user = profileData?.user || profileData;

  // UI Toggle States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form Data States
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Populate profile form when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
      });
    }
  }, [user]);

  // Input Handlers
  const handleProfileChange = (e) =>
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  // 1. Submit Profile Updates
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      await updateProfile(profileForm).unwrap();
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditingProfile(false); // Close edit mode on success
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.message || "Failed to update profile",
      });
    }
  };

  // 2. Submit Password Updates
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setMessage({ type: "error", text: "New Passwords do not match!" });
    }

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }).unwrap();
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false); // Close password form on success
    } catch (err) {
      setMessage({
        type: "error",
        text: err.data?.message || "Failed to update password",
      });
    }
  };

  // 3. Handle Photo Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      await uploadPhoto(formData).unwrap();
      setMessage({ type: "success", text: "Photo updated!" });
    } catch (err) {
      setMessage({ type: "error", text: "Photo upload failed." });
    }
  };

  // 4. Logout
  const handleLogout = async () => {
    try {
      await apiLogout().unwrap();
    } catch (err) {
      console.error(err);
    }
    dispatch(logoutAction());
    navigate("/login");
  };

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

      {/* --- SECTION 1: PROFILE HEADER & PHOTO --- */}
      <div>
        <img
          src={user?.profilePhotoUrl || "/favicon.png"}
          alt="Profile"
          width="100"
          height="100"
          onClick={() => fileInputRef.current.click()}
          style={{ cursor: "pointer", borderRadius: "50%" }}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        {isUploadingPhoto && <p>Uploading photo...</p>}
        <h2>{user?.username}</h2>
      </div>

      <hr />

      {/* --- SECTION 2: USER DETAILS (VIEW / EDIT MODE) --- */}
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
            <p>
              <strong>Username:</strong> {user?.username}
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
            <div>
              <label>Username: </label>
              <input
                type="text"
                name="username"
                value={profileForm.username}
                onChange={handleProfileChange}
                required
              />
            </div>
            <button type="submit" disabled={isUpdatingProfile}>
              Save Changes
            </button>
            <button type="button" onClick={() => setIsEditingProfile(false)}>
              Cancel
            </button>
          </form>
        )}
      </div>

      <hr />

      {/* --- SECTION 3: PASSWORD MANAGEMENT --- */}
      <div>
        {!isChangingPassword ? (
          <button onClick={() => setIsChangingPassword(true)}>
            Change Password
          </button>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <h3>Change Password</h3>
            <div>
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" disabled={isChangingPwd}>
              Update Password
            </button>
            <button
              type="button"
              onClick={() => {
                setIsChangingPassword(false);
                setPasswordForm({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <br />

      {/* -- SECTION 4: LOGOUT -- */}
      <button
        onClick={handleLogout}
        style={{ color: "white", backgroundColor: "red" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
