import { useEffect } from "react";
import { ILayout } from "../Interfaces/interfaces";

const Layout = (props: ILayout) => {
  useEffect(() => {
    if (props.title) {
      document.title = props.title;
    }
  }, [props.title]);
  return (
    <>
      <div className="container">{props.children}</div>
    </>
  );
};

export default Layout;
