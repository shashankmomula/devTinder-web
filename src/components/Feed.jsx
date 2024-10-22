import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return; // Prevent unnecessary fetch if feed is already available

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data));
    } catch (err) {
      //
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Display loading state or no users message
  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found</h1>;

  // Render user feed
  return (
    feed && (
      <div className="flex justify-center my-10">
        {feed[0] && <UserCard user={feed[0]} />}
      </div>
    )
  );
};

export default Feed;
