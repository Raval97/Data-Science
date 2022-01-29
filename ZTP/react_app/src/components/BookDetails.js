import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookDetails extends Component {

    render() {
        return (
            <table id="bookDetails" className="table table-striped mx-auto w-50 text-center p-3 mb-3"
                   style={{backgroundColor: "#1e785e"}}>
                <thead className="thead-dark" style={{color: "#fff", backgroundColor: "#032044"}}>
                <tr>
                    <th scope="col" colSpan="2" style={{textAlign: "center"}}>Book Details</th>
                </tr>
                </thead>
                <tbody style={{color: "#fff"}}>
                <tr>
                    <th>ID</th>
                    <td className="text-center">{this.props.id}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <td className="text-center">{this.props.title}</td>
                </tr>
                <tr>
                    <th>Author</th>
                    <td className="text-center">{this.props.author}</td>
                </tr>
                <tr>
                    <th>Year</th>
                    <td className="text-center">{this.props.year}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

BookDetails.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number
};

export default BookDetails;
