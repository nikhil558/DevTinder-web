import axios from "axios";
import { BACKEND_URL } from "../Utills/constants";
import { useDispatch } from "react-redux";
import { removeRequests } from "../Utills/requestsSlice";
import { Link } from "react-router";

const ConnectionCard = ({ connection, requestId = null }) => {
  const { _id, firstName, about, profileUrl } = connection;
  const dispatch = useDispatch();

  const handleAccepTAndReject = async (state) => {
    try {
      await axios.post(
        BACKEND_URL + "/request/review/" + state + "/" + requestId,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequests(requestId));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-base-300 flex p-5 items-center justify-between rounded-lg w-full md:w-1/2 my-2">
      <div className="flex-shrink-0">
        <img
          src={profileUrl}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <div className="flex-grow mx-4 w-[30%]">
        <h2 className="text-lg font-semibold">{firstName}</h2>
        <p className="line-clamp-2">{about}</p>
      </div>
      {requestId && (
        <div className="flex space-x-2">
          <button
            className="btn btn-success"
            onClick={() => handleAccepTAndReject("accepted")}
          >
            Accept
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleAccepTAndReject("rejected")}
          >
            Reject
          </button>
        </div>
      )}
      {!requestId && (
        <Link
          to={"/chat/" + _id}
          className="inline-flex items-center px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-200 hover-scale"
        >
          Open Chat
        </Link>
      )}
    </div>
  );
};

export default ConnectionCard;
