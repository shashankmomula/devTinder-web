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
  const [tech,setTech] = useState([]);
  const [techInput,setTechInput] = useState("");

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

  const handleTechClick = (e)=>{

    const newChip = {
      id:Date.now(),
      label:techInput.trim()
    };

   if(e.key === "Enter"){
      
    const newTech = techInput.trim();

    setTech([...tech,newChip]);
    setTechInput("");
   }
  }

  const handleDeleteTech = (id)=>{
    const updateTech = tech.filter((chip)=> chip.id!== id);
    setTech(updateTech);
  }
  return (
    <div className="flex justify-center ">
      <div className="flex justify-center mx-16 my-10">
        <div className="card  bg-neutral-400  w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex justify-center text-black">Edit Profile</h2>
            <div className="">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text text-black">First Name:</span>
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
                  <span className="label-text text-black">Last Name:</span>
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
                  <span className="label-text text-black">Photo Url:</span>
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
                  <span className="label-text text-black">Age:</span>
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
                  <span className="label-text text-black">Gender:</span>
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
                  <span className="label-text text-black">About:</span>
                </div>
                <textarea
                  className="textarea"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
            </div>
             <div className="label">
                  <span className="label-text text-black">Technologies:</span>
                </div>
            <div>
              <input 
              placeholder="Tech"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => handleTechClick(e)}
              className="input input-bordered w-full max-w-xs"
              ></input>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
  {tech.map((t) => (
    <div
      key={t.id}
      className="flex items-center bg-gradient-to-r from-slate-200 to-slate-300 text-black px-3 py-1 rounded-full shadow-md hover:shadow-lg transition duration-200"
    >
      <span className="mr-2 font-medium">{t.label}</span>
      <button
        className="text-red-500 hover:text-red-700 font-bold text-lg transition duration-200"
        onClick={() => handleDeleteTech(t.id)}
      >
        &times;
      </button>
    </div>
  ))}
</div>

            
            <div className="card-actions flex justify-center my-1">
              <button className="btn bg-slate-600 text-white" onClick={saveProfile}>
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
