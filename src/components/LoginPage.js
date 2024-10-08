import React, {useState} from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { _getUsers } from '../utils/_DATA';
import {useLocation, useNavigate} from 'react-router-dom';
import '../css/App.css';

const LoginPage = (props) => {
    const [userId, setUserId] = useState('sarahedo');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const users = await _getUsers();

        if (users[userId] && users[userId].password === password) {
            props.setAuthedUser(userId);
            navigate(state?.path || "/");
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h1>Employee Polls</h1>
            <img
                src="https://www.polly.ai/hubfs/Blog%20Images/Illustrations%20(white,%20svg)/Employee%20Feedback%202.svg"
                alt="Employee Avatars"
                className="avatar"
                style={{ width: '400px', height: '400px' }}
            />
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="User"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn" disabled={!userId || !password}>
                    Submit
                </button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthedUser: (id) => dispatch(setAuthedUser(id)),
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);
