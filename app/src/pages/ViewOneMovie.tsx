import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneMovieApi } from "../services/api";
import { Rating } from "@mui/material";
import movieLogo from "../assets/movieLogo.jpeg";
const ViewOneMovie = () => {
  const [viewOneMovie, setViewOneMovie] = useState({
    movie_id: "",
    movie_name: "",
    movie_desc: "",
    release_year: 0,
    movie_img_path: "",
    addedBy: "",
    overallRating: 0,
    ratings: [{ rating: 0, ratedBy: "" }],
  });
  console.log("viewOneMoviedeta", viewOneMovie);

  const { id } = useParams();
  useEffect(() => {
    getOneMovie(id);
  }, [id]);
  async function getOneMovie(id: string | undefined) {
    try {
      const response = await getOneMovieApi(id || "");
      setViewOneMovie(response.data.movieWithFormattedData);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <div className="viewOneMovie">
        <h1>{viewOneMovie.movie_name}</h1>
        <div className="bigMovieDiv">
          <img
            src={`http://localhost:3456/uploads/${viewOneMovie.movie_img_path}`}
            alt={`Pic-${viewOneMovie.movie_name}`}
          ></img>
        </div>
        <div className="grid">
          <div className="Moviedetails">
            <p>
              <span>Movie Description: </span>
              {viewOneMovie.movie_desc}
            </p>
            <p>
              <span> Release Year: </span>
              {viewOneMovie.release_year}
            </p>
            <p>
              <span> Added by:</span>Added by: {viewOneMovie.addedBy}
            </p>
            <p>
              <span> Overall Rating: </span>

              <Rating
                name="simple-controlled"
                value={viewOneMovie.overallRating}
                readOnly
              />
            </p>
          </div>
          <div className="ratingDetails">
            <h3>Rating credits </h3>
            {viewOneMovie.ratings?.map((r, i) => (
              <div key={i}>
                <p>
                  <Rating value={r.rating} readOnly></Rating>
                  by {r.ratedBy}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="closeMovie">
          <Link to="/">Close</Link>
        </div>
      </div>
    </>
  );
};
export default ViewOneMovie;
