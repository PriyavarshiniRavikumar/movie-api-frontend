import { Link } from "react-router-dom";
import Layout from "../components/Layout";
const NotFoundPage = () => {
  return (
    <Layout title="Not-found">
      <div className="container Not-found">
        <h1>Page not found</h1>
        <Link to="/">Go back to home?</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
