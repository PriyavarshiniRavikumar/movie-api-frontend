import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ILogin, IShowError } from "../Interfaces/interfaces";
import Loading from "../components/Loading";
import { loginUserapi } from "../services/api";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
const LoginForm: React.FC = () => {
  const [loginUser, setLoginUser] = useState<ILogin>({
    email: "",
    user_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const navigate = useNavigate();
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const [conPass, setConpass] = useState("");
  const [passError, setPassError] = useState({
    error: "",
    show: false,
  });
  function handleconfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConpass(value);
  }
  async function handleUserLogintoDb(loginUser: ILogin) {
    setIsLoading(true);
    if (conPass === loginUser.user_password) {
      try {
        const LoginPayload = {
          email: loginUser.email,
          user_password: loginUser.user_password,
        };
        {
          isLoading ? <Loading /> : <></>;
        }
        const userLoggedIn = await loginUserapi(LoginPayload);
        if (userLoggedIn) {
          // setShowModalMsg({
          //   action: "Success",
          //   msg: `Login Successful!`,
          // });
          let token = userLoggedIn.data.created_token;
          localStorage.setItem("token", token);
          navigate("/");
        }

        //navigate("/");
      } catch (error: any) {
        console.log("Errored", error);
        // if (error instanceof Error) {
        setShowModalMsg({
          action: "failed",
          msg: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
        toggleModal();
      }
    } else {
      setPassError({
        ...passError,
        error: "Password does not match",
        show: true,
      });
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  }
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUserLogintoDb(loginUser);
  };

  return (
    <>
      <Layout title="Login Page">
        <div className="LoginForm">
          <form onSubmit={(e) => handleLogin(e)}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="user_password">Password</label>
            <input
              type="password"
              name="user_password"
              id="user_password"
              placeholder="Enter your password"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="confirm-password">
              Confirm-Password
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="confirm Password"
                onChange={handleconfirmPassword}
                required
              />
              {passError.show && (
                <p style={{ color: "red" }}>{passError.error}</p>
              )}
            </label>
            <div className="forgotPwdDiv">
              <Link to="/users/send-otp-mail" className="forgotPwdBtn">
                Forgot Password
              </Link>
            </div>
            <div className="User-form-input-AddFormbuttons"></div>
            <div className="LoginBtns">
              <button type="submit" className="LoginBtn">
                Login
              </button>
              <p>-------Or-------</p>
              <Link to="/SignUp" role="button" className="LoginFormSignUpBtn">
                Create an Account
              </Link>
            </div>
            {showModal && (
              <Modal errorMsg={showModalMsg} closeModal={toggleModal} />
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};
export default LoginForm;
