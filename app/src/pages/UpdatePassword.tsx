//imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
//Components
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
//Interfaces
import { IShowError } from "../Interfaces/interfaces";

//Api
import { updatePasswordApi } from "../services/api";
//Component Starts here
const updatePassword = () => {
  //Loading
  const [isLoading, setIsLoading] = useState(false);

  //Show Error Modal
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });
  const navigate = useNavigate();
  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  // Usestate
  const [updatePassword, setUpdatePassword] = useState({
    old_password: "",
    new_password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatePassword({ ...updatePassword, [name]: value });
  };

  // Confirm Password
  const [conPass, setConpass] = useState("");
  const [passError, setPassError] = useState({
    error: "",
    show: false,
  });
  function handleconfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setConpass(value);
  }
  //Form Submit
  const handlePasswordFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("updatePassword", updatePassword);
    handleUpdatePassword();
  };
  async function handleUpdatePassword() {
    setIsLoading(true);
    if (conPass === updatePassword.new_password) {
      try {
        const UpdatePasswordPayload = {
          old_password: updatePassword.old_password,
          new_password: updatePassword.new_password,
        };
        {
          isLoading ? <Loading /> : <></>;
        }
        const passwordUpdated = await updatePasswordApi(UpdatePasswordPayload);
        if (passwordUpdated) {
          setShowModalMsg({
            action: "Success",
            msg: `Password Updated Successfully`,
          });

          localStorage.removeItem("token");
          navigate("/login");
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
  }

  return (
    <>
      <Layout title="Update User Password">
        <form
          onSubmit={(e) => handlePasswordFormSubmit(e)}
          className="updatePwdForm"
        >
          <h1>Update Password</h1>
          <label htmlFor="old_password">Old Password</label>
          <input
            type="password"
            name="old_password"
            id="old_password"
            placeholder="Enter your Old Password"
            onChange={(e) => handleInputChange(e)}
            required
          ></input>
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
            <Link
              to="/users/user/update"
              role="button"
              className="changePasswordCancelButton"
            >
              Cancel
            </Link>
            <button type="submit" className="changePassword">
              Update
            </button>
          </div>
          {showModal && (
            <Modal errorMsg={showModalMsg} closeModal={toggleModal} />
          )}
        </form>
      </Layout>
    </>
  );
};
export default updatePassword;
