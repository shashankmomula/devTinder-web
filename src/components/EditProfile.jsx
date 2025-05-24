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
  const [skills, setSkills] = useState(user.skills || []);
  const [techInput, setTechInput] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true }
      );
      console.log("Save Profile Response", res);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || err.message);
      console.error("Error in API request:", err);
    }
  };

  const handleTechClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTech = techInput.trim();
      if (newTech && !skills.includes(newTech.toLowerCase())) {
        setSkills((skills)=>[...skills, newTech]);
        setTechInput("");
      }
    }
  };

  const handleDeleteTech = (tech) => {
    const updatedSkills = skills.filter((s) => s !== tech);
    setSkills(updatedSkills);
  };

  return (
    <div className="flex justify-center py-10 bg-gray-100">
      
      <div className="card max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        <div className="card-body flex">
          
          <h2 className="text-3xl font-semibold text-center text-gray-800">Edit Profile</h2>

          {/* UserCard - Displays current profile info */}
          


          <div className="space-y-6">
            
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-600">Age</label>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-600">Gender</label>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-600">Skills</label>
              <input
                type="text"
                placeholder="Type and press Enter to add skills"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechClick}
                className="input input-bordered w-full rounded-lg p-3 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap gap-3 mt-3">
                {skills.map((tech) => (
                  <div
                    key={tech}
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full flex items-center space-x-2"
                  >
                    <span>{tech}</span>
                    <button
                      onClick={() => handleDeleteTech(tech)}
                      className="text-red-600 hover:text-red-800 font-bold text-xl"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
      <div className="w-1/3 ml-36">
    <UserCard user={user} />
  </div>
    </div>
  );
};

export default EditProfile;
