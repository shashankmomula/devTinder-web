import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Return message if no connections are found
  if (!connections || connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-xl text-black">
        No connections found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-4xl text-black mb-8">
        Your Connections
      </h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, about } = connection;

        return (
          <div
            key={_id}
            className="flex m-4 justify-between items-center bg-slate-300 shadow-md p-6 rounded-lg w-11/12 md:w-3/5 mx-auto"
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
                <p className="text-gray-700 mt-2">{about}</p>
              </div>
            </div>
            <Link to={"/chat/"+_id}>
               <button className="btn btn-primary">Chat</button>
            </Link>
           
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
