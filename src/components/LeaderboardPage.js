import React from 'react';
import { connect } from 'react-redux';
import '../css/LeaderboardPage.css';

const LeaderboardPage = (props) => {
    const { leaderboardData } = props;

    return (
        <div className="leaderboard-container">
            <h3>Leaderboard</h3>
            <ul className="leaderboard-list">
                {leaderboardData.map((user) => (
                    <li key={user.name} className="leaderboard-item">
                        <div className="leaderboard-info">
                            <img src={user.avatarURL} alt="avatar" className="avatar" />
                            <span>{user.name}</span>
                        </div>
                        <div className="leaderboard-stats">
                            <span className="answered">Answered: {user.answered}</span>
                            <span className="created">Created: {user.created}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    const leaderboardData = Object.keys(state.users)
        .map((id) => {
            const user = state.users[id];
            return {
                name: user.name,
                avatarURL: user.avatarURL,
                answered: Object.keys(user.answers).length,
                created: user.questions.length,
            };
        })
        .sort((a, b) => b.answered + b.created - (a.answered + a.created));

    return {
        leaderboardData,
    };
};

export default connect(mapStateToProps)(LeaderboardPage);
