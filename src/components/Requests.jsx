import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    console.log(res.data.data);
    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests || requests.length === 0) return <h1>No requests found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, about } =
          request.fromUserId; // Assuming there's an id

        return (
          <div
            key={_id}
            className="flex m-4 justify-center p-4 rounded-lg items-center bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2">Reject</button>
              <button className="btn btn-secondary mx-2">Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
