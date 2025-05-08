import axios from "axios";
import { BACKEND_URL } from "../Utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utills/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const fetchFeed = async () => {
    try {
      const feedData = await axios.get(BACKEND_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(feedData.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [user]);

  return (
    <div className="flex justify-center py-5">
      {!feed || feed.length === 0 ? (
        <p> Users not found </p>
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
};

export default Feed;
