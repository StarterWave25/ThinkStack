import { useUploadPhotoMutation } from "../../../services/userAPI";
import { useRef } from "react";

function ProfilePhoto({ user, setMessage, refetch }) {
    const [uploadPhoto, { isLoading: isUploadingPhoto }] =
        useUploadPhotoMutation();

    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profilePhoto", file);

        try {
            const res = await uploadPhoto(formData).unwrap();
            if (res.OK) {
                refetch();
                setMessage({ type: "success", text: "Photo updated successfully!" });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Photo upload failed. Please try again." });
        }
    };

    return (
        <div className="avatar-container">
            <div className="avatar-wrapper" onClick={() => fileInputRef.current.click()}>
                <img
                    src={user?.profilePic || "/favicon.png"}
                    alt="Profile"
                    className="avatar-image"
                />
                <div className="avatar-overlay">
                    <span className="overlay-text">
                        {isUploadingPhoto ? "Uploading..." : "Change Photo"}
                    </span>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
}

export default ProfilePhoto;
