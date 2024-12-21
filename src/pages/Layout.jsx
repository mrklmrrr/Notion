import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { initialize, logout } from "../redux/user/actions";
import { useEffect } from "react";

const navLinkClassName =
  "font-semibold text-3xl md:text-2xl decoration-none no-underline";

function Layout(props) {
  const { user, loading, logout, initialize, initialized } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const isUserExists = !!user;

  return (
    <div className="w-3/4 mt-10 ml-auto mr-auto">
      {isUserExists && (
        <div className="flex justify-between items-center md:flex-col-reverse md:gap-5 md:mb-5">
          <p> Hello, {user.email}</p>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              end="true"
              className={({ isActive }) =>
                isActive
                  ? `${navLinkClassName} text-zinc-400`
                  : navLinkClassName
              }
            >
              About
            </NavLink>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                isActive ? `${navLinkClassName}	text-zinc-400` : navLinkClassName
              }
            >
              Notes
            </NavLink>
            <NavLink
              to="/login"
              onClick={handleLogout}
              className={navLinkClassName}
            >
              Log Out
            </NavLink>
          </nav>
        </div>
      )}
      <Outlet />
      <hr className="mt-10" />
      <footer className="flex justify-between">
        <p className=" ml-3 text-zinc-400">Created by: Margarita Kulakovich</p>
        <p className=" mr-3 text-zinc-400">BSU: 2024</p>
      </footer>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.data,
  loading: state.user.loading,
  initialized: state.user.initialized,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  initialize: () => dispatch(initialize()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
