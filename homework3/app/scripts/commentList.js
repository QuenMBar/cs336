import React from 'react';

import Comment from './comment';

module.exports = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.firstName + " " + comment.lastName} key={comment.id}>
                    {"User ID:" + comment.id}
                    {" User Start Date:" + comment.startDate}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});