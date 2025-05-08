import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BACKEND_URL } from "../Utills/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../Utills/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [profileUrl, setProfileUrl] = useState(user.profileUrl);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    setError("");
    try {
      if (!profileUrl.startsWith("https")) {
        setToast("fail");
        setTimeout(() => setToast(null), 3000);
        return;
      }
      const res = await axios.patch(
        BACKEND_URL + "/profile/edit",
        { firstName, lastName, about, age, gender, profileUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setToast("success");
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <div className="flex justify-center my-5">
        <div className="card card-dash bg-base-300 w-96 mx-2">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  placeholder="Type here"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  placeholder="Type here"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL:</legend>
                <input
                  type="text"
                  className="input"
                  value={profileUrl}
                  placeholder="Type here"
                  onChange={(e) => setProfileUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age:</legend>
                <input
                  type="text"
                  className="input"
                  value={age}
                  placeholder="Type here"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender:</legend>
                <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">
                    {gender}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li onClick={() => setGender("male")}>
                      <a>Male</a>
                    </li>
                    <li onClick={() => setGender("female")}>
                      <a>Female</a>
                    </li>
                    <li onClick={() => setGender("others")}>
                      <a>Other</a>
                    </li>
                  </ul>
                </div>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About:</legend>
                <textarea
                  className="textarea h-24"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Update
              </button>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, about, age, gender, profileUrl }}
          showBtn={false}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          {toast === "fail" ? (
            <div className="alert alert-error">
              <span>Profile Update Failed</span>
            </div>
          ) : (
            <div className="alert alert-success">
              <span>Profile Updated Successfully.</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default EditProfile;
