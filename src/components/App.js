import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import PollPage from './PollPage';
import PollCreationPage from './PollCreationPage';
import LeaderboardPage from './LeaderboardPage';
import NavBar from './NavBar';
import '../css/App.css';
import NotFound from "./NotFound";
import Protected from "./Protected";

const App = (props) => {
  const { authedUser, dispatch } = props;

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
      <div className="App">
            <>
              { authedUser && <NavBar /> }
                  <Routes>
                    <Route path="*" element={<LoginPage />} />
                    <Route path="/" element={<Protected><Dashboard /></Protected>} />
                    <Route path="/questions/:question_id" element={<Protected><PollPage /></Protected>} />
                    <Route path="/add" exact element={<Protected><PollCreationPage /></Protected>} />
                    <Route path="/leaderboard" exact element={<Protected><LeaderboardPage /></Protected>} />
                    <Route path="/not-found" exact element={<NotFound/>}/>
                  </Routes>
            </>
      </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);
