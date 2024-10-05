import React from 'react';
import { connect } from 'react-redux';
import PollCard from './PollCard';

const Dashboard = (props) => {
    const { answeredPolls, unansweredPolls, loading } = props;

    // Show a loading state while the data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>New Questions</h2>
            {unansweredPolls.length === 0 ? (
                <p>No new questions</p>
            ) : (
                unansweredPolls.map((poll) => (
                    <PollCard key={poll.id} poll={poll} />
                ))
            )}
            <h2>Done</h2>
            {answeredPolls.length === 0 ? (
                <p>No answered questions</p>
            ) : (
                answeredPolls.map((poll) => (
                    <PollCard key={poll.id} poll={poll} answered />
                ))
            )}
        </div>
    );
};

// Map state to props for the Dashboard component
const mapStateToProps = (state) => {
    const { authedUser, polls, users } = state;

    // Check if polls, users, or authedUser exist, return loading state if not available
    if (!polls || !users || !authedUser) {
        return {
            answeredPolls: [],
            unansweredPolls: [],
            loading: true,
        };
    }

    // Check if authedUser has any answers
    const userAnswers = users[authedUser].answers || {};

    const answeredIds = Object.keys(userAnswers);
    const answeredPolls = answeredIds
        .filter((id) => polls[id]) // Check if poll exists before mapping
        .map((id) => polls[id]);

    const unansweredPolls = Object.keys(polls)
        .filter((id) => !answeredIds.includes(id)) // Only include polls that are not answered
        .map((id) => polls[id]);

    return {
        answeredPolls,
        unansweredPolls,
        loading: false,
    };
};

export default connect(mapStateToProps)(Dashboard);
