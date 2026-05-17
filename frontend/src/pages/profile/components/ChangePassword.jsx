import { useDispatch } from "react-redux";
import { useChangePasswordMutation } from "../../../services/authAPI";
import { authAPI } from "../../../services/authAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword({ setMessage }) {
    const [changePassword, { isLoading: isChangingPwd }] =
        useChangePasswordMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e) =>
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            return setMessage({
                type: "error",
                text: "New Passwords do not match!",
            });
        }

        try {
            const res = await changePassword({
                password: passwordForm.newPassword,
            }).unwrap();
            if (res.OK) {
                dispatch(authAPI.util.resetApiState());
                navigate("/login");
            }
            setMessage({
                type: "success",
                text: "Password updated successfully!",
            });
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            setIsChangingPassword(false);
        } catch (err) {
            setMessage({
                type: "error",
                text: err.data?.message || "Failed to update password",
            });
        }
    };

    return (
        <div className="unified-card">
            <div className="section-header">
                <h3>Security</h3>
            </div>
            
            {!isChangingPassword ? (
                <div className="details-grid">
                    <div className="detail-item">
                        <span className="detail-label">Password</span>
                        <span className="detail-value">••••••••••••</span>
                    </div>
                    <button onClick={() => setIsChangingPassword(true)}>
                        Change Password
                    </button>
                </div>
            ) : (
                <form className="profile-form" onSubmit={handlePasswordSubmit}>
                    <div className="input-group">
                        <label className="detail-label">Current Password</label>
                        <input
                            className="profile-input"
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="detail-label">New Password</label>
                        <input
                            className="profile-input"
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="detail-label">Confirm New Password</label>
                        <input
                            className="profile-input"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={passwordForm.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" disabled={isChangingPwd}>
                            {isChangingPwd ? "Updating..." : "Update Password"}
                        </button>
                        <button
                            className="cancel-btn"
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
                    </div>
                </form>
            )}
        </div>
    );
}

export default ChangePassword;
