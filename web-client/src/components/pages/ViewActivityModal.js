import React, {Component} from 'react';
import {Modal, Header, Button} from 'semantic-ui-react';
import '../../App.css';

class ViewActivityModal extends Component {
    state = {
        open: false,
    };

    handleOpen = () => this.setState({open: true});

    handleClose = () => this.setState({open: false});

    handleAllActivities = () => {
        this.setState({open: false});
        this.props.viewAll();
    };

    handleMyActivities = () => {
        this.setState({open: false});
        this.props.viewMine();
    };

    handleMyInterests = () => {
        this.setState({open: false});
        this.props.viewInterests();
    };


    render() {
        return (
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
                basic
                size="small"
                id="viewActivityModal"
            >
                <Header icon='tasks' content='View Activities'/>
                <Modal.Content>
                    <h3>View all activities, activities you created, or activities you are interested in attending</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='blue' onClick={this.handleAllActivities}>
                        All Activities
                    </Button>
                    <Button basic color='blue' onClick={this.handleMyActivities}>
                        Created Activities
                    </Button>
                    <Button basic color='blue' onClick={this.handleMyInterests}>
                        My Interests
                    </Button>
                    <Button color='red' onClick={this.handleClose}>
                        Close
                    </Button>

                </Modal.Actions>
            </Modal>
        );
    }
}

export default ViewActivityModal