import { Link } from "react-router-dom";

const AddRating = () => {
  return (
    <>
      <form>
        <label htmlFor="rating_value">Add Rating</label>
        <input
          type="number"
          name="rating_value"
          id="rating_value"
          placeholder="Enter your rating value between 1 and 5"
          min={1}
          max={5}
        ></input>
        <Link to="/">Back</Link>
        <button type="submit">Add Rating</button>
      </form>
    </>
  );
};
export default AddRating;
