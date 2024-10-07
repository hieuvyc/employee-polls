import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';
import { useNavigate } from 'react-router-dom';
import '../css/PollCreationPage.css';

const PollCreationPage = (props) => {
    const [optionOne, setOptionOne] = useState('');
    const [optionTwo, setOptionTwo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSaveQuestion(optionOne, optionTwo);
        navigate('/');
    };

    return (
        <div className="poll-creation-container">
            <h3>Create New Poll</h3>
            <h4>Would You Rather...</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={optionOne}
                    onChange={(e) => setOptionOne(e.target.value)}
                    placeholder="Option One"
                />
                <input
                    type="text"
                    value={optionTwo}
                    onChange={(e) => setOptionTwo(e.target.value)}
                    placeholder="Option Two"
                />
                <button type="submit" disabled={!optionOne || !optionTwo}>Submit</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    handleSaveQuestion: (optionOne, optionTwo) => dispatch(handleSaveQuestion(optionOne, optionTwo)),
});

export default connect(null, mapDispatchToProps)(PollCreationPage);
