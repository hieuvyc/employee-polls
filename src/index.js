import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./components/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers"
import middleware from "./middlewave"
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById('root');
const store = createStore(reducer, middleware);
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
