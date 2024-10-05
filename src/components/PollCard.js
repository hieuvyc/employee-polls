import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PollCard = ({ poll, answered = false, author }) => {
    return (
        <div className="poll-card">
            <h3>{author.name} asks:</h3>
            <div className="poll-card-content">
                <img
                    src={author.avatarURL}
                    alt={`Avatar of ${author.name}`}
                    className="avatar"
                />
                <div className="poll-card-info">
                    <h4>Would You Rather...</h4>
                    <p>{poll.optionOne.text} or ...</p>
                    <Link to={`/questions/${poll.id}`}>
                        <button className="btn">{answered ? 'View Poll' : 'Answer Poll'}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Map state to props for the PollCard component
const mapStateToProps = (state, ownProps) => {
    const author = state.users[ownProps.poll.author];
    return {
        author,
    };
};

// Use connect to map state to props
export default connect(mapStateToProps)(PollCard);
