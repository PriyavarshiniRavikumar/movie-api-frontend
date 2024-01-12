import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { IMovie, IShowError } from "../Interfaces/interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addMovieApi } from "../services/api";
const AddMovie = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const [addMovie, setAddMovie] = useState<IMovie>({
    movie_name: "",
    movie_desc: "",
    release_year: "",
    file: "",
  });
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setAddMovie({ ...addMovie, [name]: value });
  }
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAddMovie({
        ...addMovie,
        file: e.target.files[0],
      });
    }
  };
  const handleAddMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddMovietoDb(addMovie);
  };
  async function handleAddMovietoDb(addMovie: IMovie) {
    setIsLoading(true);
    const formData = new FormData();
    try {
      // const MovieAddPayload = {
      //   movie_name: addMovie.movie_name,
      //   movie_desc: addMovie.movie_desc,
      //   release_year: addMovie.release_year,
      // };
      formData.append("movie_name", addMovie.movie_name);
      formData.append("movie_desc", addMovie.movie_desc);
      formData.append("release_year", addMovie.release_year);
      formData.append("file", addMovie.file as File);
      {
        isLoading ? <p>Loading</p> : <></>;
      }
      const addedMovie = await addMovieApi(formData);
      if (addedMovie) {
        // toggleModal();
        setShowModalMsg({
          action: "Success",
          msg: `Movie  "${addMovie.movie_name}" Added Successfully`,
        });
        console.log(addedMovie);
      }

      //navigate("/");
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
      <Layout title="Add new Movie">
        <div className="container AddMovie">
          <form onSubmit={(e) => handleAddMovie(e)}>
            <label htmlFor="movie_name">Movie Name</label>
            <input
              type="text"
              name="movie_name"
              id="movie_name"
              placeholder="Enter Movie Name"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="movie_desc">Movie Description</label>
            <input
              type="text"
              name="movie_desc"
              id="movie_desc"
              placeholder="Give a brief description of the movie"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="release_year">Release Year</label>
            <input
              type="text"
              name="release_year"
              id="release_year"
              placeholder="Enter Movie Release Year"
              onChange={(e) => handleInputChange(e)}
            ></input>
            <label htmlFor="movieImg">Upload the movie Image:</label>
            <input
              type="file"
              id="movieImg"
              name="movieImg"
              onChange={(e) => handleFile(e)}
            ></input>

            <div className="AddMovie-AddBtns">
              <Link to="/" role="button" className="AddMovie-CancelBtn">
                Back
              </Link>
              <button type="submit" className="AddMovieBtn">
                Add Movie
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
export default AddMovie;
