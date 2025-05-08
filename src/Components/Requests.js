import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../Utills/constants";
import axios from "axios";
import { addRequests } from "../Utills/requestsSlice";
import { useEffect } from "react";
import ConnectionCard from "./ConnectionCard";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.result));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  return (
    <div className="flex flex-col items-center py-4 px-4">
      <h1 className="">Requests</h1>
      {!requests || requests.length === 0 ? (
        <p>No connections found</p>
      ) : (
        requests.map((each) => (
          <ConnectionCard
            key={each._id}
            connection={each.fromUserId}
            requestId={each._id}
          />
        ))
      )}
    </div>
  );
};

export default Requests;
