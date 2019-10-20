import React from 'react';
import PropTypes from 'prop-types';

export default class DialogAction extends React.Component {
    static propTypes = {
        dialogActionFunc: PropTypes.func.isRequired,
        dialogActionTitle: PropTypes.string.isRequired
    }

    _handleActionClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.dialogActionFunc();
    }

    render(){
        return (
            <div>
                <Button onClick={this._handleActionClick} color="primary">
                    {this.props.dialogActionTitle}
                </Button>
            </div>
        )
    }
}
