import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="overflow-scroll mb-5">
        <EditProfile user={user} />
      </div>
    )
  );
};
export default Profile;
