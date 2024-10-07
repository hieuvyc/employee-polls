import React from 'react';
import {render} from '@testing-library/react';
import App from './App';
import {Provider} from "react-redux";
import {store} from "../store";
import {BrowserRouter} from "react-router-dom";

describe("App", () => {
  it("should render the App component and match the snapshot", () => {
    const component = render(
        <Provider store={store}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });
});
