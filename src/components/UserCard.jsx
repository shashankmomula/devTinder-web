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
    <div className="card border-l-indigo-900 bg-neutral-800 shadow-lg rounded-lg overflow-hidden w-80 transition-all hover:shadow-2xl my-10">
      <figure className="overflow-hidden">
        <img
          src={photoUrl}
          alt="userPhoto"
          className="w-full object-cover transition-transform transform hover:scale-105"
        />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-1">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="text-sm text-white mb-2">
            {gender}, {age}
          </p>
        )}
        <p className="text-slate-200 text-sm mb-4">{about}</p>
        <div className="flex justify-between">
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-400 rounded-lg px-4 py-2 text-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-pink-500 text-white hover:bg-pink-400 rounded-lg px-4 py-2 text-sm"
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
