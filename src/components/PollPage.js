import React from 'react';
import { connect } from 'react-redux';
import { handleSaveAnswer } from '../actions/shared';
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import '../css/PollPage.css';

const withRouter = (ComponentWithRouterProp) => {
    return (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <ComponentWithRouterProp {...props} router={{ location, navigate, params }} />;
    };
};

const PollPage = ({ authedUser, question, author, dispatch }) => {
    const navigate = useNavigate();

    if (!authedUser || !question || !author) {
        return <Navigate to="/not-found"/>;
    }

    const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
    const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
    const hasVoted = hasVotedOptionOne || hasVotedOptionTwo;

    const totalVotes =
        question.optionOne.votes.length + question.optionTwo.votes.length;

    const optionOnePercentage =
        totalVotes === 0 ? 0 : ((question.optionOne.votes.length / totalVotes) * 100).toFixed(1);
    const optionTwoPercentage =
        totalVotes === 0 ? 0 : ((question.optionTwo.votes.length / totalVotes) * 100).toFixed(1);

    const onVote = (option) => {
        dispatch(handleSaveAnswer(question.id, option));
        navigate('/');
    };

    if (!question || !authedUser) {
        return <p>This poll does not exist</p>;
    }

    return (
        <div>
            <h3>Poll by {author.name}</h3>
            <div className="poll-container">
                <img src={author.avatarURL} alt="avatar" className="avatar" />
                <h4>Would You Rather</h4>
                <div className="poll-options">
                    <button
                        onClick={() => onVote('optionOne')}
                        disabled={hasVoted}
                    >
                        {question.optionOne.text}
                        {hasVoted && (
                            <span className="vote-info">
                                {`(${question.optionOne.votes.length} votes, ${optionOnePercentage}%)`}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => onVote('optionTwo')}
                        disabled={hasVoted}
                    >
                        {question.optionTwo.text}
                        {hasVoted && (
                            <span className="vote-info">
                                {`(${question.optionTwo.votes.length} votes, ${optionTwoPercentage}%)`}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
    try {
        const { question_id } = props.router.params;
        const question = questions[question_id];
        const author = question ? users[question.author] : null;

        return {
            authedUser,
            question,
            author
        };
    } catch (e) {
        return <Navigate to="/not-found"/>;
    }
};

export default withRouter(connect(mapStateToProps)(PollPage));
