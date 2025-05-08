import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../Utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utills/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div className="flex flex-col items-center py-4 px-4">
      <h1 className="">Connections</h1>
      {!connections || connections.length === 0 ? (
        <p>No connections found</p>
      ) : (
        connections.map((each) => (
          <ConnectionCard key={each._id} connection={each} />
        ))
      )}
    </div>
  );
};

export default Connections;
