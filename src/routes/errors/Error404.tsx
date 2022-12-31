import { useLocation } from "react-router-dom";

function Err404() {
  let location = useLocation();

  return (
    <>
      <h1>404 Page not found</h1>
      <h3>No match for: "{location.pathname}"</h3>
    </>
  );
}

export default Err404;
