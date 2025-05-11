import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, age, photoUrl, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      // Error handling
    }
  };

  return (
    <div className="card border-l-indigo-900 bg-slate-950 shadow-lg rounded-lg overflow-hidden w-80 transition-all hover:shadow-2xl my-8">
      <figure className="overflow-hidden">
        <img
          src={photoUrl}
          alt="userPhoto"
          className=" rounded-full w-48 h-48 m-8 bg-black"
        />
      </figure>
      <div className="">
        <h2 className="text-2xl font-bold text-white mb-1 flex justify-center">
          {firstName} {lastName} <span className="text-slate-400 ml-3">{age && `${age}`}</span>
        </h2>
        {/* { gender && (
          <p className="text-sm text-white mb-2">
            {gender}
          </p>
        )} */}
        <p className="text-slate-400 text-sm mb-4 flex justify-center m-2">{about}</p>
        <div className=" flex justify-center m-3">
          <button
            className="btn bg-slate-700 text-white hover:bg-blue-400 rounded-lg px-10 py-2 text-sm m-1"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-pink-500 text-white hover:bg-pink-400 rounded-lg px-10 py-2 text-sm m-1"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
