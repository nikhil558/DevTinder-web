import axios from "axios";
import { BACKEND_URL } from "../Utills/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../Utills/feedSlice";

const UserCard = ({ user, showBtn = true }) => {
  const { firstName, lastName, about, age, gender, profileUrl } = user;
  const dispatch = useDispatch();

  const handleIntrestedAndIgnore = async (state) => {
    try {
      await axios.post(
        BACKEND_URL + "/request/send/" + state + "/" + user._id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(user._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={profileUrl} alt="Profile pic" />
      </figure>
      <div className="card-body">
        <h2 className="card-title"> {firstName + " " + lastName}</h2>
        {age && gender && <div>{age + ", " + gender}</div>}
        <div className="text-wrap">{about}</div>
        {showBtn && (
          <div className="card-actions justify-center my-3">
            <button
              className="btn bg-red-500 mr-3"
              onClick={() => handleIntrestedAndIgnore("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleIntrestedAndIgnore("intrested")}
            >
              Intrested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
