import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import styles from "./Profile.module.scss";
import { toast } from "react-toastify";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [editing, setEditing] = useState({
    displayName: false
  });
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserProfile({
        displayName: user.displayName,
        email: user.email,
      });
      setDisplayName(user.displayName || "");
    }
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await updateProfile(user, {
        displayName: displayName,
      });
      setUserProfile({
        ...userProfile,
        displayName: displayName,
      });
      setEditing({
        displayName: false,
      });
      setIsEditingMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile:", error.message);
    }
  };

  const toggleEditing = (field) => {
    setEditing((prevEditing) => ({
      ...prevEditing,
      [field]: !prevEditing[field],
    }));
    setIsEditingMode(true); 
  };

  return (
    <div className={styles["profile-container"]}>
      <h2 className={styles["profile-heading"]}>User Profile</h2>
      {userProfile && (
        <div className={styles["user-info"]}>
          <img
            src={userProfile.photoURL}
            alt="Profile"
            className={styles["profile-img"]}
          />
          <div>
            <p className={styles["profile-name"]}>
              Name:
              {editing.displayName ? (
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              ) : (
                <span className={styles["name-edit-btn"]}>
                  {userProfile.displayName}
                  <button onClick={() => toggleEditing("displayName")}>
                    Edit
                  </button>
                </span>
              )}
            </p>
            <p className={styles["profile-email"]}>
              Email: {userProfile.email}
            </p>
          </div>
        </div>
      )}
      {isEditingMode && ( 
        <button className="--btn --btn-danger --button" onClick={handleUpdateProfile}>Update</button>
      )}
    </div>
  );
};

export default Profile;
