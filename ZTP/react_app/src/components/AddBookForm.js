import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddBookForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            author: "",
            year: 2021,
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        })
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        event.target.reset();
        this.props.callbackFunctions.addNewBook(this.state.title, this.state.author, this.state.year)
        this.setState({author: null})
        this.setState({title: null})
    }

    render() {
        return (
            <div className="mx-auto w-50 p-3 mb-3" style={{backgroundColor: "#33aaff"}}>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input id="title" type="text" name="title" className="form-control" placeholder="Title"
                                   required="required" value={this.state.title} onChange={this.onChangeTitle}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Author</label>
                        <div className="col-sm-10">
                            <input id="author" type="text" name="author" className="form-control" placeholder="Author"
                                   required="required" value={this.state.author} onChange={this.onChangeAuthor}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Year</label>
                        <div className="col-sm-10">
                            <input id="year" className="form-control" type="number" min={0} max={2030} step={1} name="year"
                                   required="required" value={this.state.year} onChange={this.onChangeYear}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="mx-auto">
                            <button type="submit" className="btn btn-primary">Add New Book</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

AddBookForm.propTypes = {
    callbackFunctions: PropTypes.object
};

export default AddBookForm;
