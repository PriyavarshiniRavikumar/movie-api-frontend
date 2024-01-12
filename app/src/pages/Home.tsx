import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
//interfaces
import { IMovietoshow, IShowError, IaddUser } from "../Interfaces/interfaces";

//services
import { getMovies, viewUserInfo } from "../services/api";

//components
//import Loading from "../components/Loading";
import MovieCard from "../components/MovieCard";
import UserModal from "./UserModal";
import logo from "../assets/placeholder.jpg";
//import christmas from "../assets/santa-dance-christmas-music.gif";
//import movieGif from "../assets/movieGif.gif";
import movieReel from "../assets/movienew.webp";
import Modal from "../components/Modal";

// Home Component starts here

const Home = () => {
  const navigate = useNavigate();

  //To Show Movies
  const [movies, setMovies] = useState<IMovietoshow[]>([]);

  // To show Loading
  const [isLoading, setIsLoading] = useState(false);

  //To show error and success Modal
  const [showModal, setShowModal] = useState(false);
  const [showModalMsg, setShowModalMsg] = useState<IShowError>({
    action: "",
    msg: "",
  });

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  //To show user Info in modal
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserModalMsg, setShowUserModalMsg] = useState<IaddUser>({
    first_name: "",
    last_name: "",
    email: "",
    user_name: "",
    user_password: "",
    phone_no: "",
  });
  const toggleUserModal = () => {
    setShowUserModal((prevShowUserModal) => !prevShowUserModal);
  };
  const bringback = () => {
    setShowUserModal(false);
  };

  //ToEdit User

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1 page initially
  const itemsPerPage = 3;

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // To Search
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // let searchValue=value;

    setSearch(value);
  };

  //To Sort
  const [sortMovie, setSortMovie] = useState("");

  const handleSortAsc = () => {
    setSortMovie("ASC");
  };
  const handleSortDesc = () => {
    setSortMovie("DESC");
  };
  //Get All Movies
  async function getMoviesFromAPI() {
    setIsLoading(true);

    try {
      const response = await getMovies(
        currentPage,
        itemsPerPage,
        search,
        sortMovie
      );
      setMovies(response.data.movies);
      //console.log(response);

      const totalItems = response.data.totalItems;
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(calculatedTotalPages || 1); // Ensure at least 1 page
    } catch (error) {
      if (error instanceof Error) {
        setShowModal(true);
        console.log(error.message);
        setShowModalMsg({
          action: "Unable to show movies or Login error",
          msg: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getMoviesFromAPI();
  }, [currentPage, itemsPerPage, search, sortMovie]);

  // Show User Info
  async function handleUserModal() {
    try {
      const response = await viewUserInfo();

      if (response) {
        toggleUserModal();
        setShowUserModalMsg({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          user_name: response.data.user_name,
          user_password: response.data.user_password,
          phone_no: response.data.phone_no,
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toggleUserModal();
        setShowModalMsg({
          action: "Failed",
          msg: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  //To Logout
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Layout title="Home">
        {isLoading ? (
          <p>Loading Movies..</p>
        ) : (
          <article className="container Home" data-theme="dark">
            <div className="HomeName grid">
              <div>
                <div className="iMDB">
                  <p>IMDb</p>
                </div>
              </div>

              <div className="userUtils">
                <div className="AddMovieIcon">
                  <Link to="/addMovie">Add a movie</Link>
                </div>
                <button className="infoBtn" onClick={() => handleUserModal()}>
                  <img src={logo} alt="info" className="icon" />
                </button>
                <div className="logout">
                  <button onClick={logout} className="logoutBtn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className="SearchDiv grid">
              <img src={movieReel} alt="movieReel"></img>

              <label htmlFor="search" className="search">
                <input
                  type="text"
                  className="searchBar"
                  value={search}
                  onChange={(e) => handleSearch(e)}
                ></input>
                <button className="searchBtn">🔍</button>
              </label>
              <div className="sortBtns">
                <button className="ASCBtn" onClick={handleSortAsc}>
                  A-Z ⬇️
                </button>
                <button className="DESCBtn" onClick={handleSortDesc}>
                  Z-A ⬆️
                </button>
              </div>
            </div>
            <div className="showMovies grid">
              {movies.map((m, i) => (
                <div key={i} className="moviecards">
                  <MovieCard movie={m}></MovieCard>
                </div>
              ))}
            </div>
            <div className="signInfooter">
              <Link to="/login"> Login</Link>
              <span></span>
              <p>Token Expired?</p>
            </div>
            <Stack spacing={2}>
              <Pagination
                className="pagination"
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                disabled={isLoading} // Disable while loading
                hideNextButton={currentPage === totalPages}
                hidePrevButton={currentPage === 1}
              />
            </Stack>
          </article>
        )}
      </Layout>
      {showUserModal && (
        <UserModal
          userMsg={showUserModalMsg}
          closeModal={toggleUserModal}
          navigateToHome={bringback}
        />
      )}
      {showModal && <Modal errorMsg={showModalMsg} closeModal={toggleModal} />}
    </>
  );
};

export default Home;
