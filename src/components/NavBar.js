import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import './NavBar.css';

const NavBar = (props) => {
    const { user, setAuthedUser } = props;

    const handleLogout = () => {
        setAuthedUser(null);
    };

    return (
        <nav className="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">New Poll</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
            </ul>
            <div className="user-info">
                <span>{user.name}</span>
                <img src={user.avatarURL} alt="avatar" className="avatar" />
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    const authedUser = state.authedUser;
    const user = state.users[authedUser];

    return {
        authedUser,
        user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthedUser: (id) => dispatch(setAuthedUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
