import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
// import PollPage from './PollPage';
// import PollCreationPage from './PollCreationPage';
// import LeaderboardPage from './LeaderboardPage';
import NavBar from './NavBar';
import './App.css';

const App = (props) => {
  const { authedUser, loading, dispatch } = props;

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
      <div className="App">
        {!authedUser ? (
            // If no user is authenticated, show the login page
            <Routes>
              <Route path="*" element={<LoginPage />} />
            </Routes>
        ) : (
            // If user is authenticated, show the app with routes
            <>
              <NavBar />
              {loading ? null : (
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    {/*<Route path="/questions/:question_id" element={<PollPage />} />*/}
                    {/*<Route path="/add" element={<PollCreationPage />} />*/}
                    {/*<Route path="/leaderboard" element={<LeaderboardPage />} />*/}
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
              )}
            </>
        )}
      </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
