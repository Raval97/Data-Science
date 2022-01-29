import React, {Component} from "react";
import LogOutButton from "../components/LogOutButton";
import BooksTable from "../components/BooksTable";
import AddBookForm from "../components/AddBookForm";
import BookDetails from "../components/BookDetails";
import {Redirect} from 'react-router'
import {encode as base64_encode} from "base-64";
import * as axios from "axios";
import PropTypes from "prop-types";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            books: [],
            selectedBook: null,
            bookDetailsId: 0
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password));
        fetch("http://localhost:8080/SimpleLibrarySpring/dashboard",
            {
                method: 'GET',
                headers: headers,
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        books: result.books
                    });
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    showBook(id) {
        if (this.state.bookDetailsId === id)
            this.setState({bookDetailsId: 0});
        else {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password));
            fetch("http://localhost:8080/SimpleLibrarySpring/dashboard/" + id,
                {
                    method: 'GET',
                    headers: headers,
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            selectedBook: result.book
                        });
                        this.setState({
                            bookDetailsId: id
                        });
                    },
                    (error) => {
                        console.error(error)
                    }
                )
        }
    }

    deleteBook(id) {
        axios.delete("http://localhost:8080/SimpleLibrarySpring/dashboard/" + id, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
            }
        })
            .then((result) => {
                this.getData()
            }, (error) => {
                console.log(error);
            });
    }

    addNewBook(title, author, year) {
        axios.post("http://localhost:8080/SimpleLibrarySpring/dashboard", {
            title: title,
            author: author,
            year: year
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64_encode(this.props.user.username + ":" + this.props.user.password)
            }
        })
            .then((result) => {
                this.getData()
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        if (this.props.user === null)
            return <Redirect to='/login'/>;
        let isAdmin = this.props.user.role === "ROLE_ADMIN"
        let addBookForm = isAdmin ? <AddBookForm callbackFunctions={{addNewBook: this.addNewBook.bind(this)}}/> : ""
        let bookDetails
        if (this.state.bookDetailsId !== 0)
            bookDetails = (
                <BookDetails
                    id={this.state.selectedBook.id}
                    title={this.state.selectedBook.title}
                    author={this.state.selectedBook.author}
                    year={this.state.selectedBook.year}
                />
            )
        return (
            <div className="mx-auto w-75 mt-3 p-3" style={{backgroundColor: "#49a1d5"}}>
                <LogOutButton callbackFunctions={this.props.authorizationFunctions}/>
                {addBookForm}
                <BooksTable
                    isAdmin={isAdmin}
                    books={this.state.books}
                    callbackFunctions={{
                        showBook: this.showBook.bind(this),
                        deleteBook: this.deleteBook.bind(this)
                    }}/>
                {bookDetails}
            </div>
        )
    }
}

Dashboard.propTypes = {
    user: PropTypes.object,
    authorizationFunctions: PropTypes.object
};

export default Dashboard;
