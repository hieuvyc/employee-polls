import React from 'react';
import { connect } from 'react-redux';
import PollCard from './PollCard';
import '../css/Dashboard.css';

const Dashboard = (props) => {
    const { authedUser, questions, users, loading } = props;

    const isAnswered = (question, authedUser) => {
        return (
            question.optionOne.votes.includes(authedUser) ||
            question.optionTwo.votes.includes(authedUser)
        );
    };

    const unanswered = Object.values(questions).filter(
        (question) => !isAnswered(question, authedUser)
    );

    const answered = Object.values(questions).filter(
        (question) => isAnswered(question, authedUser)
    );

    console.log('unanswered', unanswered);
    console.log('answered', answered);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-column">
                <h2>New Questions</h2>
                {unanswered.length === 0 ? (
                    <p>No new questions</p>
                ) : (
                    <ul>
                        {unanswered.map((question) => (
                            <li key={question.id}>
                                <PollCard question={question} author={users[question.author]} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="dashboard-column">
                <h2>Done</h2>
                {answered.length === 0 ? (
                    <p>No answered questions</p>
                ) : (
                    <ul>
                        {answered.map((question) => (
                            <li key={question.id}>
                                <PollCard question={question} author={users[question.author]} answered={true}/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
    authedUser,
    questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
    users,
});

export default connect(mapStateToProps)(Dashboard);
