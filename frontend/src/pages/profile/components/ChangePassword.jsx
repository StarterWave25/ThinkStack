import { useChangePasswordMutation } from "../../../services/authAPI";
import { useState } from "react";

function ChangePassword({ user, setMessage }) {
    const [changePassword, { isLoading: isChangingPwd }] =
        useChangePasswordMutation();

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
            await changePassword({
                password: passwordForm.newPassword,
            }).unwrap();
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

    return <div>
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
    </div>;
}

export default ChangePassword;