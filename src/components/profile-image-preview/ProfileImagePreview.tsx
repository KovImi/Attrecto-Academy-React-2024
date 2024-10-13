import React from "react";

interface ProfileImagePreviewProps {
  imageUrl: string;
}

const ProfileImagePreview: React.FC<ProfileImagePreviewProps> = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile Preview" className="img-thumbnail" />
      ) : (
        <p>No available image</p>
      )}
    </div>
  );
};

export default ProfileImagePreview;