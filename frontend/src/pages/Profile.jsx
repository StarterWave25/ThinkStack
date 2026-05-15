import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from '../app/authSlice';
import {
    useGetMeQuery,
    useChangePasswordMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
} from '../services/authAPI';
import './styles/Profile.css';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Component State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });
    const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState({ type: '', text: '' });

    // RTK Query Hooks
    const { data: profileData, isLoading, error } = useGetMeQuery();
    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isUpdatingPassword }] = useChangePasswordMutation();
    const [apiLogout] = useLogoutMutation();

    const user = profileData?.data;

    // Effect to pre-fill form data when user data is fetched
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
            });
        }
    }, [user]);

    // --- Event Handlers ---

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordInputChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Here you would typically call a mutation to upload the file
            console.log("Selected file:", file.name);
            setMessage({ type: 'success', text: 'Profile picture upload functionality is not yet implemented.' });
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        try {
            const res = await updateProfile(formData).unwrap();
            setMessage({ type: 'success', text: res.message || 'Profile updated successfully!' });
            setIsEditingProfile(false);
        } catch (err) {
            setMessage({ type: 'error', text: err.data?.message || 'Failed to update profile.' });
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return setMessage({ type: 'error', text: 'New passwords do not match!' });
        }
        setMessage({ type: '', text: '' });
        try {
            const res = await changePassword({ password: passwords.newPassword }).unwrap();
            setMessage({ type: 'success', text: res.message || 'Password changed successfully!' });
            setIsChangingPassword(false);
            setPasswords({ newPassword: '', confirmPassword: '' });
        } catch (err) {
            setMessage({ type: 'error', text: err.data?.message || 'Failed to change password.' });
        }
    };

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
        // Reset form data to original state
        if (user) {
             setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
            });
        }
    };

    const handleLogout = async () => {
        try {
            await apiLogout().unwrap();
        } catch (err) {
            console.error("Backend logout failed", err);
        }
        dispatch(logoutAction());
        navigate('/login');
    };

    // --- Render Logic ---

    if (isLoading) return <div className="profile-page-loading">Loading profile...</div>;
    if (error) return <div className="profile-page-loading">Error loading profile! Please try again.</div>;

    return (
        <div className="profile-page">
            <div className="profile-header-card">
                <div className="profile-image-container" onClick={handleImageClick}>
                    <img
                        src={user?.profilePhotoUrl || '/favicon.png'}
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-image-edit-overlay">
                        <span>Change</span>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg"
                />
                <h2 className="profile-username">{user?.username}</h2>
            </div>

            {message.text && (
                <div className={`toast ${message.type}`}>{message.text}</div>
            )}

            <div className="profile-details-card">
                <h3>Personal Details</h3>
                {!isEditingProfile ? (
                    <div className="details-view-mode">
                        <p><strong>First Name:</strong> {formData.firstName}</p>
                        <p><strong>Last Name:</strong> {formData.lastName}</p>
                        <button onClick={() => setIsEditingProfile(true)} className="btn btn-primary">Edit Profile</button>
                    </div>
                ) : (
                    <form onSubmit={handleProfileUpdate} className="details-edit-mode">
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                        <div className="edit-buttons">
                            <button type="submit" className="btn btn-success" disabled={isUpdatingProfile}>
                                {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button type="button" onClick={handleCancelEdit} className="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                )}
            </div>

            <div className="profile-security-card">
                <h3>Security</h3>
                {!isChangingPassword ? (
                    <button onClick={() => setIsChangingPassword(true)} className="btn btn-primary">Change Password</button>
                ) : (
                    <form onSubmit={handlePasswordUpdate} className="password-change-form">
                        <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordInputChange} placeholder="New Password" required />
                        <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordInputChange} placeholder="Confirm New Password" required />
                        <div className="edit-buttons">
                            <button type="submit" className="btn btn-success" disabled={isUpdatingPassword}>
                                {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                            <button type="button" onClick={() => setIsChangingPassword(false)} className="btn btn-secondary">Cancel</button>
                        </div>
                    </form>
                )}
            </div>

            <button className="fixed-logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;