import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { IMovietoshow, IShowError } from "../Interfaces/interfaces";
import { getOneMovieToUpdate, updateMovieApi } from "../services/api";

const EditMovie = () => {
  //To Show Modal
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  //console.log(id);
  const [editMovie, setEditMovie] = useState<IMovietoshow>({
    movie_id: "",
    movie_name: "",
    movie_desc: "",
    release_year: "",
    user_id: "",
  });

  useEffect(() => {
    async function getTheMovieToupdate() {
      setIsLoading(true);
      try {
        const toUpdateMovie = await getOneMovieToUpdate(id || "");
        if (toUpdateMovie) {
          let year = toUpdateMovie.data.release_year;
          let yearString = year.toString();
          setEditMovie({
            movie_id: toUpdateMovie.data.movie_id,
            movie_name: toUpdateMovie.data.movie_name,
            movie_desc: toUpdateMovie.data.movie_desc,
            release_year: yearString,
            user_id: toUpdateMovie.data.user_id,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getTheMovieToupdate();
  }, [id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "release_year" ? value.toString() : value;
    setEditMovie({ ...editMovie, [name]: updatedValue });
  };
  const handleEditMovieSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleEditMovie();
  };
  async function handleEditMovie() {
    let UpdatedMovie;

    setIsLoading(true);
    try {
      const MovieEditPayload = {
        movie_name: editMovie.movie_name,
        movie_desc: editMovie.movie_desc,
        release_year: editMovie.release_year,
      };
      {
        isLoading ? <p>Loading</p> : <></>;
      }
      UpdatedMovie = await updateMovieApi(MovieEditPayload, id || "");

      if (UpdatedMovie) {
        // toggleModal();
        setShowModalMsg({
          action: "Success",
          msg: `Movie  "${MovieEditPayload.movie_name}" Edited Successfully`,
        });
        console.log("UpdatedMovie", UpdatedMovie);
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
      <Layout title={`EditMovie-${editMovie.movie_name}`}>
        <div className="container EditMovieForm">
          <h1>EditMovie - {editMovie.movie_name}</h1>
          <form onSubmit={(e) => handleEditMovieSubmit(e)}>
            <label htmlFor="movie_name">Movie Name</label>
            <input
              type="text"
              name="movie_name"
              id="movie_name"
              placeholder="Change the movie name"
              value={editMovie.movie_name}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="movie_desc">Movie Description</label>
            <input
              type="text"
              name="movie_desc"
              id="movie_desc"
              placeholder="Change the brief description of the movie"
              value={editMovie.movie_desc}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="release_year">Release Year</label>
            <input
              type="text"
              name="release_year"
              id="release_year"
              placeholder="Change Movie Release Year"
              value={editMovie.release_year}
              onChange={(e) => handleInputChange(e)}
            ></input>

            <div className="EditMovie-AddBtns">
              <Link to="/" role="button" className="EditMovie-CancelBtn">
                Back
              </Link>
              <button type="submit" className="EditMovieBtn">
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
export default EditMovie;
