import { useTheme } from "@/context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import type { RootState } from "@/redux/store";
interface UserModalProps {
  closeModal: () => void;
}

const UserModal: React.FC<UserModalProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeColor } = useTheme();
  const  user  = useSelector((state: RootState) => state.auth?.user);
console.log(user)
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    toast.success("logout successfull")
  };
  return (
    <div
      style={{ background: themeColor }}
      className="absolute top-14 right-0 z-999 w-56 p-4 bg-white rounded-xl shadow-xl"
    >
      <p className="  text-white mb-2">{user?.email}</p>
      <ul className="space-y-2">
        <li>
          <Link to={"/user/profile"} className="w-full text-white text-left">
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-white cursor-pointer text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserModal;
