import { useState } from "react";
import "./login.css";
import Header from "../../components/header/Header";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!open) {
      setOpen(!open);

      try {
        if (number === "") {
          setMsg("Please Enter the Number");
          return;
        }
        let response = await axios.post(`${baseURL}/send-otp`, {
          contact_number: number,
        });
        setMsg(response.data.message);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        let response = await axios.post(`${baseURL}/pandit-login`, {
          contact_number: number,
          otp: otp,
        });
        setMsg(response.data.message);
        console.log(response);
        localStorage.setItem("accessToken", response?.data?.results?.access);
        localStorage.setItem("refreshToken", response?.data?.results?.refresh);
        navigate(`/profile/${response?.data?.results?.data?.user_id}`)
      } catch (error) {
        console.log(error.response.data.message);
        setMsg(error.response.data.message);
      }
    }
  };

  return (
    <div className="loginPage">
      <Header />
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
                  required
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
            {msg !== "" && (
              <p>
                {msg}
                {/* <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpen(!open);
                    setMsg("");
                  }}
                >
                  Resend
                </span> */}
              </p>
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
