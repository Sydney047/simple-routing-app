import { Link } from "react-router";

function ErrorPage () {

  return (<>
    <h1>Ooops... Invalid Search!</h1>
    <h3>Check your spellings or try searching for more recent matches.. enjoy!</h3>
    <h3>
      <Link to="/">
        Click here to go back 
      </Link>
    </h3>
  </>)
}

export default ErrorPage;