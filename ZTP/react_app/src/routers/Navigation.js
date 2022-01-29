import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "../containers/LoginPage";
import Dashboard from "../containers/Dashboard";
import PropTypes from 'prop-types';

class Navigation extends Component {

    render() {
        return (
            <Router>
                <Route path="/login" exact render={(props) => <LoginPage
                    user={this.props.user}
                    failedAuthorization={this.props.failedAuthorization}
                    successLogout={this.props.successLogout}
                    authorizationFunctions={this.props.authorizationFunctions}
                />}/>
                <Route path="/dashboard" exact render={(props) => <Dashboard
                    user={this.props.user}
                    authorizationFunctions={this.props.authorizationFunctions}
                />}/>
            </Router>
        );
    }
}

Navigation.propTypes = {
    user: PropTypes.object,
    failedAuthorization: PropTypes.bool,
    successLogout: PropTypes.bool,
    authorizationFunctions: PropTypes.object
};

export default Navigation;
