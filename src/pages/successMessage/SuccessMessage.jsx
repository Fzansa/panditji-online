import { Link, useLocation } from "react-router-dom";
import "./successMessage.css";
import Header from "../../components/header/Header";
import { FaCheck } from "react-icons/fa";

const SuccessMessage = () => {
  const location = useLocation();
  const msg = location.state;

  return (
    <div className="successPage">
      <img src="/img/decorative1.png" alt="" className="leftSideEffect" />
      <img src="/img/decorative1.png" alt="" className="rightSideEffect" />
      <Header />
      <div className="successInfo">
        <span className="checkIcon">
          <FaCheck />
        </span>
        <h1>{msg}</h1>
        <Link to={'/pandit-services'} className="goToBtn">Go to My Services</Link>
      </div>
    </div>
  );
};

export default SuccessMessage;
