import { Link } from "@remix-run/react";

const Navbar = () => {
  const logoutHandler = async () => {
    try {
      const res = await fetch(
        "https://mealdelightapi-cvh3b3ggcrcxg9ht.eastus-01.azurewebsites.net/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Meal Delights
          </Link>
        </div>
        <div className="flex-none">
          <ul className="flex space-x-10 pr-5">
            <li>
              <Link to="/register">Create an Account</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <button className="btn btn-secondary" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
