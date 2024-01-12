import { useState } from "react";
import Layout from "../components/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { IShowError } from "../Interfaces/interfaces";
import { changePwdApi } from "../services/api";

const ForgotPasswordUpdate = () => {
  const [newPass, setNewPass] = useState("");
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
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
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewPass(value);
  }
  const handlepwdForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePwdChangetoDB(newPass);
  };
  async function handlePwdChangetoDB(newPass: string) {
    try {
      setIsLoading(true);
      if (conPass === newPass) {
        try {
          const ChangePasswordPayload = {
            user_password: newPass,
          };
          {
            isLoading ? <Loading /> : <></>;
          }
          const changenewPwd = await changePwdApi(
            ChangePasswordPayload,
            user_id || ""
          );

          if (changenewPwd) {
            navigate("/login");
            setNewPass("");
          } else {
            setShowModalMsg({
              action: "failed",
              msg: "Password Not updated",
            });
          }
        } catch (error: any) {
          console.log("Errored", error);
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
    } catch (error: any) {
      console.log(error);
      setShowModalMsg({
        action: "Failed",
        msg: error.response.data.message,
      });
    }
  }
  return (
    <>
      <Layout title="Change Password">
        <div>
          <form className="changePwdForm" onSubmit={(e) => handlepwdForm(e)}>
            <h3>Update your password here</h3>
            <label htmlFor="new_password">New Password</label>
            <input
              type="password"
              name="new_password"
              id="user_password"
              placeholder="Enter your new password"
              onChange={(e) => handleInputChange(e)}
              required
            ></input>
            <label htmlFor="confirm-password">
              Confirm-Password
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="ReType your new Password"
                onChange={handleconfirmPassword}
                required
              />
              {passError.show && (
                <p style={{ color: "red" }}>{passError.error}</p>
              )}
            </label>

            <div className="changePasswordBtns">
              <Link to="/login" role="button" className="cancelBtn">
                Back
              </Link>

              <button type="submit" className="changePassword">
                Update
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
export default ForgotPasswordUpdate;
