import React, {Component} from 'react';
import RowOfBook from "./RowOfBook";
import PropTypes from 'prop-types';

class BooksTable extends Component {

    render() {
        var books = this.props.books.map((book, index) => {
            return <RowOfBook key={book.id}
                              index={index+1}
                              isAdmin={this.props.isAdmin}
                              id={book.id}
                              title={book.title}
                              author={book.author}
                              year={book.year}
                              callbackFunctions={this.props.callbackFunctions}/>
        })
        let action = <th scope="col">Action</th>
        if(this.props.isAdmin)
            action = <th scope="col" colSpan="2" style={{textAlign: "center"}}>Action</th>
        return (
            <table className="table table-striped p-3" style={{backgroundColor: "#24597d"}}>
                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Year</th>
                    {action}
                </tr>
                </thead>
                {books}
            </table>
        )
    }
}

BooksTable.propTypes = {
    isAdmin: PropTypes.bool,
    books: PropTypes.arrayOf(PropTypes.object),
    callbackFunctions: PropTypes.object
};

export default BooksTable;
