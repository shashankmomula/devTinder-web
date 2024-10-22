import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, age, photoUrl, gender } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      //
    }
  };
  return (
    <div className="card bg-base-300 w-80 shadow-xl">
      <figure>
        <img src={photoUrl} alt="userPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{gender + ", " + age}</p>}
        {/* <p>{skills}</p> */}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
