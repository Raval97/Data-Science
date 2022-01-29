import React, {Component} from "react";
import Navigation from "../routers/Navigation";
import * as axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            successLogout: false,
            failedAuthorization: false
        };
    }

    logIn(login, password) {
        let targetUrl = 'http://localhost:8080/SimpleLibrarySpring/html/login.html'
        let body = "username="+login+"&password="+password
        let headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        axios.post(targetUrl, body, {
            headers: headers
        }).then((response) => {
            let loggedUser ={
                username: login,
                password: password,
                role: response.data.role_user
            }
            this.setState({user: loggedUser})
            this.setState({failedAuthorization: false})
            this.setState({successLogout: false})
        }, (error) => {
            this.setState({failedAuthorization: true})
            this.setState({successLogout: false})
        })
    }

    logOut() {
        this.setState({user: null})
        this.setState({successLogout: true})
    }

    render() {
        return (
            <Navigation
                user={this.state.user}
                failedAuthorization={this.state.failedAuthorization}
                successLogout={this.state.successLogout}
                authorizationFunctions={{
                    logIn: this.logIn.bind(this),
                    logOut: this.logOut.bind(this)
                }}
            />
        );
    }
}

export default App;
