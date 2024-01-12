interface ILayout {
  title?: string;
  children: React.ReactNode;
}
interface IUserForm {
  type: string;
  addingUser?: (u: IaddUser) => void;
  userToUpdate?: IaddUser;
  loading?: boolean;
}
interface IaddUser {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  user_password: string;
  phone_no: string;
}
interface ILogin {
  email: string;
  user_password: string;
}
interface IuserInfo {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
}
interface IUserUpdate {
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  phone_no: string;
}
interface IPasswordUpdate {
  old_password: string;
  new_password: string;
}
interface IShowError {
  action: string;
  msg: string;
}
interface IMovie {
  movie_name: string;
  movie_desc: string;
  release_year: string;
  file: File | string;
}
interface IMovietoshow {
  movie_id: string;
  user_id: string;
  movie_name: string;
  movie_desc: string;
  release_year: string;
  rating?: number;
  movie_img_path: string;
}
interface IaddRatingPayload {
  rating_value: number;
}
interface ISendOtpPayload {
  email: string;
}
interface IOtpVerify {
  otp: number;
}
interface IchangePwd {
  user_password: string;
}
export type {
  ILayout,
  IUserForm,
  IaddUser,
  ILogin,
  IShowError,
  IMovie,
  IMovietoshow,
  IuserInfo,
  IaddRatingPayload,
  IUserUpdate,
  IPasswordUpdate,
  ISendOtpPayload,
  IOtpVerify,
  IchangePwd,
};
