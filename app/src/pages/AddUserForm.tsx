import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { addUser } from "../services/api";
import React, { useState } from "react";
import { IaddUser, IShowError } from "../Interfaces/interfaces";
import { UserForm } from "../components/UserForm";
import Loading from "../components/Loading";
const AddUserForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  //const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  async function handleUserAdd(user: IaddUser) {
    //setIsLoading(true);
    try {
      const UserPayload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        user_name: user.user_name,
        user_password: user.user_password,
        phone_no: user.phone_no,
      };
      {
        isLoading ? <Loading /> : <></>;
      }
      const addedUser = await addUser(UserPayload);
      if (addedUser) {
        setShowModalMsg({
          action: "Success",
          msg: `User  "${UserPayload.user_name}" signUp Successfully`,
        });
        console.log(addedUser);
      }

      //navigate("/");
    } catch (error) {
      console.log("Errored", error);
      if (error instanceof Error) {
        setShowModalMsg({
          action: "failed",
          msg: error.message,
        });
      }
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  }

  return (
    <>
      <Layout title="AddUserForm">
        <div className="container usersignin">
          <>
            <div>
              <h1>SignIn as New User</h1>
            </div>

            <UserForm type="add" addingUser={(user) => handleUserAdd(user)} />

            {showModal && (
              <Modal errorMsg={showModalMsg} closeModal={toggleModal} />
            )}
          </>
        </div>
      </Layout>
    </>
  );
};
export default AddUserForm;
