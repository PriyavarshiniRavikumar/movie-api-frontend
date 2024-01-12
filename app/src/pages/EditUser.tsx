import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IaddUser, IShowError } from "../Interfaces/interfaces";
import { viewUserInfo, UpdateUser } from "../services/api";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
const EditUser = () => {
  //To show Modal
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const [isLoading, setIsLoading] = useState(false);
  //To get the user to Edit
  const [editUser, setEditUser] = useState<IaddUser>({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    user_password: "",
    phone_no: "",
  });

  useEffect(() => {
    async function toFindUserToEdit() {
      try {
        const userToEdit = await viewUserInfo();
        if (userToEdit) {
          setEditUser(userToEdit.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    toFindUserToEdit();
  }, []);

  // To handle input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };
  const handleEditUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlEditUser();
  };
  async function handlEditUser() {
    setIsLoading(true);
    try {
      const UserEditPayload = {
        first_name: editUser.first_name,
        last_name: editUser.last_name,
        email: editUser.email,
        user_name: editUser.user_name,
        phone_no: editUser.phone_no,
      };
      {
        isLoading ? <p>Loading</p> : <></>;
      }
      const UpdatedUser = await UpdateUser(UserEditPayload);
      console.log(UpdatedUser);
      if (UpdatedUser) {
        // toggleModal();
        setShowModalMsg({
          action: "Success",
          msg: `Details of User  "${UpdatedUser.data.user_name}" Updated Successfully`,
        });
        console.log("UpdatedUser", UpdatedUser);
      }
    } catch (error: any) {
      console.log("Errored", error);
      setShowModalMsg({
        action: "Failed",
        msg: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  }
  return (
    <>
      <Layout title={`UpdateUser-${editUser.user_name}`}>
        <div className="container EditUserForm">
          <h1>Update User Details - {editUser.user_name}</h1>
          <form onSubmit={(e) => handleEditUserSubmit(e)}>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Change your first Name"
              value={editUser.first_name}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Change your last name"
              value={editUser.last_name}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="email"> Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Change your email"
              value={editUser.email}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="user_name"> User Name</label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Change your User Name"
              value={editUser.user_name}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="phone_no"> Phone Number</label>
            <input
              type="number"
              name="phone_no"
              id="phone_no"
              placeholder="Change your Phone Number"
              value={editUser.phone_no}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <div className="EditUser-AddBtns">
              <Link to="/" role="button" className="EditUser-CancelBtn">
                Back
              </Link>
              <button type="submit" className="EditUserBtn">
                Update
              </button>
            </div>

            <div>
              <Link
                to="/users/user/updatePassword"
                role="button"
                className="ChangePassword"
              >
                Change Password
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
export default EditUser;
