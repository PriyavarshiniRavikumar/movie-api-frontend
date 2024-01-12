import axios from "axios";
import {
  ILogin,
  IMovie,
  IaddUser,
  IaddRatingPayload,
  IUserUpdate,
  IPasswordUpdate,
  ISendOtpPayload,
  IOtpVerify,
  IchangePwd,
} from "../Interfaces/interfaces";

import { jwtDecode } from "jwt-decode";
const axiosInstance = axios.create({
  baseURL: "http://localhost:3456",
  //   timeout: 1000,
});

const setHeaders = () => {
  const token = localStorage.getItem("token");
  let headers = {};
  if (token) {
    let decodedToken = jwtDecode(token);
    let currentDate = new Date();
    if (decodedToken.exp && decodedToken.exp < currentDate.getTime() / 1000) {
      console.log("Token expired.");
      localStorage.clear();
      location.reload();
    } else {
      headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return headers;
    }
  }
};

//User Routes
export const addUser = (payload: IaddUser) => {
  return axiosInstance.post("/signup", payload);
};
export const loginUserapi = (payload: ILogin) => {
  return axiosInstance.post("/login", payload);
};
export const sendOtpApi = (payload: ISendOtpPayload) => {
  return axiosInstance.post("/users/send-otp-mail", payload);
};
export const verifyOTPApi = (payload: IOtpVerify, user_id: string) => {
  return axiosInstance.post(`/users/otp-validation/${user_id}`, payload);
};
export const changePwdApi = (payload: IchangePwd, user_id: string) => {
  return axiosInstance.patch(
    `/users/forgot-passwordChange/${user_id}`,
    payload
  );
};
export const viewUserInfo = () => {
  return axiosInstance.get("/users/userInfo", setHeaders());
};
export const UpdateUser = (payload: IUserUpdate) => {
  return axiosInstance.patch("/users/user/updateUser", payload, setHeaders());
};

export const updatePasswordApi = (payload: IPasswordUpdate) => {
  return axiosInstance.patch(
    "/users/user/updatePassword",
    payload,
    setHeaders()
  );
};

//Movie Routes

export const getMovies = (
  page: number,
  itemsPerPage: number,
  search: string,
  sortMovie: string
) => {
  return axiosInstance.get(
    `movies/list/?search=${search}&sortMovie=${sortMovie}`,
    {
      ...setHeaders(),
      params: {
        page,
        itemsPerPage,
      },
    }
  );
};
export const addMovieApi = (payload: FormData) => {
  return axiosInstance.post("/movies", payload, setHeaders());
};
export const getOneMovieApi = (movie_id: string) => {
  return axiosInstance.get(`/movies/list/${movie_id}`, setHeaders());
};
export const getOneMovieToUpdate = (movie_id: string) => {
  return axiosInstance.get(`/movies/update/${movie_id}`, setHeaders());
};
export const updateMovieApi = (payload: IMovie, movie_id: string) => {
  return axiosInstance.post(
    `/movies/update/${movie_id}`,
    payload,
    setHeaders()
  );
};
export const deleteMovieApi = (movie_id: string) => {
  return axiosInstance.delete(`/movies/delete/${movie_id}`, setHeaders());
};
//Add Rating
export const addRatingApi = (payload: IaddRatingPayload, movieId: string) => {
  return axiosInstance.post(`/movies/${movieId}/rating`, payload, setHeaders());
};
