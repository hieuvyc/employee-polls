import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/PollCard.css';
import {formatDate} from "../utils/helpers";

const PollCard = ({ question, answered = false, author }) => {
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
                    <p>{question.optionOne.text} or ...</p>
                    <p>{formatDate(question.timestamp)}</p>
                    <Link to={`/questions/${question.id}`}>
                        <button className="btn">{answered ? 'View Poll' : 'Answer Poll'}</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const author = state.users[ownProps.question.author];
    return {
        author,
    };
};

export default connect(mapStateToProps)(PollCard);
