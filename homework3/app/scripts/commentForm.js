import React from 'react';

module.exports = React.createClass({
    getInitialState: function() {
        return {firstName: '', lastName: '', id: '', startDate: ''};
    },
    handleFirstNameChange: function(e) {
        this.setState({firstName: e.target.value});
    },
    handleLastNameChange: function(e) {
        this.setState({lastName: e.target.value});
    },
    handleIDChange: function(e) {
        this.setState({id: e.target.value});
    },
    handleStartDateChange: function(e) {
        this.setState({startDate: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var firstName = this.state.firstName.trim();
        var lastName = this.state.lastName.trim();
        var id = this.state.id.trim();
        var startDate = this.state.startDate.trim();
        if (!firstName || !lastName || !id || !startDate) {
            return;
        }
        this.props.onCommentSubmit({firstName: firstName, lastName: lastName, id: id, startDate: startDate});
        this.setState({firstName: '', lastName: '', id: '', startDate: ''});
    },
    render: function() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Your first name"
                    value={this.state.firstName}
                    onChange={this.handleFirstNameChange}
                />
                <input
                    type="text"
                    placeholder="Your last name..."
                    value={this.state.lastName}
                    onChange={this.handleLastNameChange}
                />
                <input
                    type="text"
                    placeholder="Your id"
                    value={this.state.id}
                    onChange={this.handleIDChange}
                />
                <input
                    type="text"
                    placeholder="Your start date"
                    value={this.state.startDate}
                    onChange={this.handleStartDateChange}
                />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

