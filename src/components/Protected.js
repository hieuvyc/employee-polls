import { Navigate } from "react-router";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const Protected = ({ children, loggedIn }) => {
    const location = useLocation();

    return loggedIn ? children : (
        // Navigate to the login page and pass the current path in the state
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
};

const mapStateToProps = ({ authedUser }) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Protected);
