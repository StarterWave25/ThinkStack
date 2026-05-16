import { useUploadPhotoMutation } from "../../../services/userAPI";
import { useRef } from "react";

function ProfilePhoto({ user, setMessage }) {
    const [uploadPhoto, { isLoading: isUploadingPhoto }] =
        useUploadPhotoMutation();

    const fileInputRef = useRef(null);

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

    return <div>
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
    </div>;
}

export default ProfilePhoto;