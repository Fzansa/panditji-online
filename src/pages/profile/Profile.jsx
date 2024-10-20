import "./profile.css";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("/img/panditji1.png");
  const [readOnly, setReadOnly] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === "null") navigate("/*");
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const originalFileName = file.name;
    const imagePath = `uploads/profile_images/`;
    const uniqueFileName = `${Date.now()}_${originalFileName}`;
    const uniqueImagePath = `${imagePath}${uniqueFileName}`;
    setProfileImage(file); // Set the selected file as the profile image
    setImagePreview(URL.createObjectURL(file)); // Create a preview URL for the image
    let urlGenrate = await axios.get(
      `${baseURL}/generate-presigned-url?file_name=${originalFileName}&image_path=${imagePath}&unique_image_path=${uniqueImagePath}`
    );
    setImageUrl(`https://morsmilesdev.s3.amazonaws.com/${uniqueImagePath}`);

    if (urlGenrate?.data && urlGenrate?.data?.results?.presigned_url) {
      await uploadImage(file, urlGenrate?.data?.results?.presigned_url);
      e.target.value = null;
    } else {
      console.error("No presigned URL returned from server");
    }
  };

  const uploadImage = async (file, presignedUrl) => {
    try {
      let res = await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type, // Set the correct content type
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const handleSubmit = async () => {
    if (!open) {
      setOpen(!open);
      setReadOnly(true);
    } else {
      const formData = new FormData();
      formData.append("first_name", fName);
      formData.append("last_name", lName);
      formData.append("contact_number", number);
      formData.append("profile_image", imageUrl);

      try {
        // Send the form data (including the image) to the backend
        const response = await axios.patch(
          `${baseURL}/pandit/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        navigate('/category')
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    }
  };

  return (
    <div className="profile">
      <span className="goBackBtn">
        <FaArrowLeftLong />
      </span>
      <Header />
      <div className="profileContainer">
        <div className="formArea">
          <div className="formContainer">
            <h1>Profile Details</h1>
            <div className="avatarContainer">
              <label className="editProfile" htmlFor="imageUpload">
                <CiEdit className="pen" />
              </label>
              <img src={imagePreview} alt="" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="imageUpload"
                hidden
              />
            </div>
            <div className="inputGroup">
              <label>First Name</label>
              <input
                type="text"
                value={fName}
                onChange={(e) => setFname(e.target.value)}
                readOnly={readOnly}
              />
            </div>
            <div className="inputGroup">
              <label>Last Name</label>
              <input
                type="text"
                value={lName}
                onChange={(e) => setLname(e.target.value)}
                readOnly={readOnly}
              />
            </div>
            <div className="inputGroup">
              <label>Contact Number</label>
              <input
                type="text"
                value={number}
                readOnly={readOnly}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            {open && (
              <div className="buttonGroup">
                <button
                  className="button edit"
                  onClick={() => setReadOnly(!readOnly)}
                >
                  {!readOnly ? "Cancel" : "Edit"}
                </button>
                <button className="button" onClick={handleSubmit}>
                  Next
                </button>
              </div>
            )}
            {!open && (
              <button className="button" onClick={handleSubmit}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
