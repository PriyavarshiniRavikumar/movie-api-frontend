import { lazy, Suspense } from "react";
import "@picocss/pico";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import ProtectedRoute from "./services/ProtectedRoute";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const AddUserForm = lazy(() => import("./pages/AddUserForm"));
const LoginForm = lazy(() => import("./pages/LoginForm"));
const EditUser = lazy(() => import("./pages/EditUser"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const OtpValidation = lazy(() => import("./pages/OtpValidation"));
const ForgotPasswordUpdate = lazy(() => import("./pages/ForgotPasswordUpdate"));

const AddMovie = lazy(() => import("./pages/AddMovie"));
const EditMovie = lazy(() => import("./pages/EditMovie"));
const ViewOneMovie = lazy(() => import("./pages/ViewOneMovie"));

function Loading() {
  return <p>Loading ...</p>;
}
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Home />}></Route> */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/SignUp" element={<AddUserForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/users/user/update" element={<EditUser />}></Route>
            <Route
              path="/users/user/updatePassword"
              element={<UpdatePassword />}
            ></Route>
            <Route
              path="/users/send-otp-mail"
              element={<ForgotPassword />}
            ></Route>
            <Route
              path="/users/otp-validation/:user_id"
              element={<OtpValidation />}
            ></Route>
            <Route
              path="/users/forgot-passwordChange/:user_id"
              element={<ForgotPasswordUpdate />}
            ></Route>

            <Route path="addMovie" element={<AddMovie />}></Route>
            <Route path="/movies/list/:id" element={<ViewOneMovie />} />
            <Route path="/movies/update/:id" element={<EditMovie />}></Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}
export default App;
