import React from "react";
import { Router, Route, Switch, Link, NavLink,Redirect } from "react-router-dom";
import * as createHistory from "history";
import Home from "../components/Home";
import Login from "../components/Login";
import List from "../components/List";

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
export const history = createHistory.createBrowserHistory();

const AppRouter = () => (

        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/home">
                        <Home />
                </Route>
                <Route path="/" exact component={Login} />

                <Route path="/login"  >
                    <Login isLogin={true} history={history} />
                    </Route >
                    <Route path="/register"  >
                    <Login isLogin={false} history={history} />
                    </Route >
                <Route path="/queues" >
                    <List history={history} />
                    </Route >

            </Switch>

            </div>
        </Router>
);


export default AppRouter;