import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { sendOtpApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { IShowError } from "../Interfaces/interfaces";
const FogotPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setEmail(value);
  }
  const handleOtpForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(email);
    handleSendOtp(email);
  };
  async function handleSendOtp(email: string) {
    try {
      const otpPayload = {
        email: email,
      };
      const sendOtpRes = await sendOtpApi(otpPayload);
      //   console.log(sendOtpRes);
      //   console.log(sendOtpRes.data.response.user_id);
      let Navuser_id = sendOtpRes.data.response.user_id;
      if (sendOtpRes) {
        navigate(`/users/otp-validation/${Navuser_id}`);
        setEmail("");
      }
    } catch (error: any) {
      console.log(error);
      setShowModal(true);
      console.log(error.message);
      setShowModalMsg({
        action: "Unable to send mail",
        msg: error.response.data.message,
      });
    }
  }
  return (
    <>
      <Layout title="Forgot Password">
        <div>
          <form className="forgotPwdForm" onSubmit={(e) => handleOtpForm(e)}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your registered email to get the verification Otp"
              onChange={(e) => handleInputChange(e)}
              required
            ></input>
            <div className="forgotPwdSubmitDiv">
              <Link to="/login" role="button" className="cancelBtn">
                Back
              </Link>
              <button type="submit" className="forgotPwdSubmit">
                Send Otp
              </button>
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
export default FogotPassword;
