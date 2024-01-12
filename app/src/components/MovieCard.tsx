import { Link, useNavigate } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

import { IMovietoshow, IShowError } from "../Interfaces/interfaces";
import Modal from "./Modal";
import movieLogo from "../assets/movieLogo.jpeg";
const Loading = lazy(() => import("./Loading"));

import { addRatingApi, deleteMovieApi } from "../services/api";

interface IMovieCard {
  movie: IMovietoshow;
}

const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  // console.log("movie", movie);
  let overall_rating = movie.rating;

  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rating_value, setRatingValue] = useState(0);

  useEffect(() => {
    async function addRating() {
      try {
        const addRAtingPayload = {
          rating_value: rating_value,
        };
        const addRatingResponse = await addRatingApi(
          addRAtingPayload,
          movie.movie_id
        );

        if (addRatingResponse) {
          setShowModalMsg({
            action: "Success",
            msg: `Rating Added Successfully`,
          });
        }
      } catch (error: any) {
        setShowModal(true);
        setShowModalMsg({
          action: "Unable to show movies",
          msg: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
        toggleModal();
      }
    }
    addRating();
  }, [rating_value]);
  const handleDeleteMovie = (movie_id: string) => {
    console.log("movie_id", movie_id);
    handleDelete(movie_id);
  };
  async function handleDelete(movie_id: string) {
    try {
      setIsLoading(true);
      {
        isLoading ? <Loading /> : <></>;
      }
      const deletedMovie = await deleteMovieApi(movie_id);
      console.log("deletedMovie", deletedMovie);
      location.reload();
      // if (deletedMovie) {
      //   setShowModalMsg({
      //     action: "Success",
      //     msg: `Movie ${movie.movie_name} deleted Successfully`,
      //   });
      // }
      // navigate("/");
    } catch (error: any) {
      console.log(error);
      setShowModalMsg({
        action: "failed",
        msg: error.response.data.message,
      });
    } finally {
      setIsLoading(false);
      toggleModal();
    }
  }
  return (
    <>
      <div className="movieCard"></div>
      <h3>{movie.movie_name}</h3>
      <div className="image-block ">
        <img
          src={`http://localhost:3456/uploads/${movie.movie_img_path}`}
          alt={`Pic-${movie.movie_name}`}
        ></img>
      </div>
      <p className="movie_desc"> {movie.movie_desc}</p>
      <p className="release_year">Released In: {movie.release_year}</p>

      <Rating name="simple-controlled" value={overall_rating} readOnly />
      <div className="grid movieCardBtns">
        <Link to={`/movies/list/${movie.movie_id}`} role="button">
          View Movie
        </Link>
        <Link to={`/movies/update/${movie.movie_id}`} role="button">
          Update Movie
        </Link>
      </div>
      <div className="deleteMovieDiv">
        <button
          className="DeleteMovieBtn"
          onClick={() => handleDeleteMovie(movie.movie_id)}
        >
          Delete
        </button>
      </div>
      <div className="Rating">
        <p>Rate the movie here:</p>
        <Rating
          className="RatingStars"
          name="simple-controlled"
          value={rating_value}
          onChange={(e, newValue) => {
            setRatingValue(newValue || 0);
          }}
        />
      </div>

      {showModal && <Modal errorMsg={showModalMsg} closeModal={toggleModal} />}
    </>
  );
};

export default MovieCard;
