import { useState } from "react";
import "./login.css";
import Header from "../../components/header/Header";

const Login = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!open) {
      setOpen(!open);
    } else {
      setNumber("");
      setOtp("");
      alert("loggined");
    }
  };

  return (
    <div className="loginPage">
      {/* <div className="header"> */}
        <Header />
      {/* </div> */}
      <div className="loginContainer">
        <div className="formArea">
          <div className="formContainer">
            <h1>Log In</h1>
            {!open ? (
              <div className="inputGroup">
                <label>Enter Mobile no.</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            ) : (
              <div className="inputGroup">
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            <button className="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="otherSide">
          <div className="rightImgs">
            <h3 className="panditPara">
              पूजा पाठ हो या अनुष्ठान,
              <br />
              <span className="highlight">पंडित</span> मिलना हुआ आसान।
            </h3>
            <img
              src="img/decorative1.png"
              alt="decorationItem"
              className="decorative1"
            />
            <img src="img/panditji.png" alt="" className="pandijiImg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
