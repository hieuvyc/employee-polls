author: Hieu Tran

How to start the application
- Install all project dependencies with `npm install`
- Start the development server with `npm start`

Employee Polls Project Overview:
The Employee Polls application is an internal tool designed for employees to create and participate in polls. The main goal of this project is to enhance collaboration and transparency within the company by allowing employees to interact with one another through poll-based questions. The polls consist of two proposed solutions for a specific question, and employees can vote on their preferred option. Additionally, a leaderboard is maintained to promote healthy competition, showcasing which employees have created and answered the most polls.
This project is implemented using React for the front-end and Redux for state management. It includes key functionalities such as logging in as an employee, viewing and answering polls, creating new polls, and viewing the leaderboard. Employees will be able to see which polls they have yet to answer and which ones they've already participated in.

Key Features:

1.User Authentication:
Employees can log in to the app by selecting their user from a list (pre-configured users for this project). The application requires authentication for all functionalities beyond the login screen.

2.Dashboard:
The dashboard displays two categories of polls:
Unanswered Polls: Polls that the logged-in employee has not yet participated in.
Answered Polls: Polls that the employee has already voted on.
Polls are sorted by the time they were created, with the most recent ones shown at the top.

3.Poll Details & Voting:
Clicking on any poll in the dashboard takes the user to the poll's details page, where they can view the options and cast their vote.
Once voted, the poll displays the voting results, showing the number of votes and the percentage of people who voted for each option. A user cannot change their vote once cast.

4.Poll Creation:
Employees can create new polls by entering two possible options. The poll is added to the system and will appear in the dashboard for all employees.

5.Leaderboard:
The leaderboard ranks employees based on the number of polls they have created and answered. The leaderboard encourages employees to engage with the application, as top performers are showcased.

6.Navigation:
A navigation bar is provided for users to easily move between the dashboard, poll creation page, and leaderboard.
