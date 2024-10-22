import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastname] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response);
    }
  };
  return (
    <div className="flex justify-center ">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Photo Url:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <textarea
                  className="textarea"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
            </div>
            <p className="text-red-600"></p>
            <div className="card-actions flex justify-center my-1">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{firstName,lastName,photoUrl,age,gender,about}} />

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
