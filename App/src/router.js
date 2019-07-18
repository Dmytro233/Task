import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  App,
  Registration,
  Login,
  User,
  AddTask,
  EditTask
} from "./components";
import store from "./store/store";

export default function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/registration/:id" component={Registration} />
          <Route exact path="/login/:id" component={Login} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/addTask/:id" component={AddTask} />
          <Route exact path="/editTask/:id" component={EditTask} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
