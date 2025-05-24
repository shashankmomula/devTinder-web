import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      // Handle error
    }
  };

  const fetchRequests = async () => {
    const res = await axios.get(`${BASE_URL}/user/request/received`, {
      withCredentials: true,
    });
    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-xl text-black">
        No requests found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl text-slate-300 mb-8">
        Connection Requests
      </h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex m-4 justify-between items-center bg-neutral-400  shadow-md p-6 rounded-lg w-11/12 md:w-3/5 mx-auto transition-transform transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <img
                alt="profile"
                className="w-24 h-24 rounded-full border-2 border-gray-300"
                src={photoUrl}
              />
              <div className="text-left">
                <h2 className="font-semibold text-2xl text-gray-900">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-500 text-sm">
                    {age} years old, {gender}
                  </p>
                )}
                <p className="text-gray-700 mt-2">{about}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
