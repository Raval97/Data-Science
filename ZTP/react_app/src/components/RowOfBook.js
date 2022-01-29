import React, {Component} from 'react';
import PropTypes from 'prop-types';

class RowOfBook extends Component {

    render() {
        let deleteAction
        if(this.props.isAdmin)
            deleteAction = (
                <td>
                    <button type="submit" className="btn btn-primary"
                            onClick={() => {
                                if (window.confirm("Are you sure you wish to delete: \"" + this.props.title + "\"?"))
                                    this.props.callbackFunctions.deleteBook(this.props.id) } }>Delete</button>
                </td>
            )
        return (
            <tbody id="books" style={{color: "#fff"}}>
                <tr>
                    <th scope="row"> {this.props.index} </th>
                    <td> {this.props.title} </td>
                    <td> {this.props.author} </td>
                    <td> {this.props.year} </td>
                    <td>
                        <button type="submit" className="btn btn-primary"
                                onClick={() => this.props.callbackFunctions.showBook(this.props.id)}>Show</button>
                    </td>
                    {deleteAction}
                </tr>
            </tbody>
        )
    }
}

RowOfBook.propTypes = {
    index: PropTypes.number,
    isAdmin: PropTypes.bool,
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    callbackFunctions: PropTypes.object
};

export default RowOfBook;
