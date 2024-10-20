import { LuLogOut } from "react-icons/lu";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="headerSection">
      <div className="headerContainer">
        <div className="headerLogo">
          <img src="/img/logo.png" alt="book pooja" />
        </div>
        <div className="headerRight">
          {!accessToken ? (
            <p>Don’t have a account?</p>
          ) : (
            <LuLogOut className="logOutBtn" onClick={handleLogOut} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
