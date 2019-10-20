import React from 'react';
import PropTypes from 'prop-types';


export default class DialogDisplay extends React.Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onDialogClose: PropTypes.func,
        dialogTitle: PropTypes.string.isRequired,
        dialogContent: PropTypes.object.isRequired,
        dialogActions: PropTypes.array.isRequired
    }
    render() {
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onDialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{this.props.dialogTitle}</DialogTitle>
                    <DialogContent>
                        {this.props.dialogContent}
                    </DialogContent>
                    {this.props.dialogActions.length > 0 ?(
                        <DialogActions>
                            {this.props.dialogActions.map(action=>action)}
                        </DialogActions>
                    ):null}
                </Dialog>
            </div>
        );
    }
}