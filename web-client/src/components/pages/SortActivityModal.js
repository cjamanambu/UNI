import React, { Component} from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';
import '../../App.css';

class SortActivityModal extends Component{
    state = {
        open: false,
    };

    handleOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    render(){
        return(
            <Modal 
                open={this.state.open}
                onClose={this.handleClose}
                basic
                size="small"
                id="viewActivityModal"
            >
                 <Header icon='sort' content='Sort Activities' />
                    <Modal.Content>
                        <h3>Sort activities by their categories: Sports, Politics, Art, Music, and Study</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            basic
                            color='blue' 
                            animated='vertical'
                            onClick={() => {
                                this.props.sort("sports");
                                this.handleClose()
                            }}
                        >
                            <Button.Content hidden>Sports</Button.Content>
                            <Button.Content visible>
                                <Icon name='basketball ball' />
                            </Button.Content>
                        </Button>
                        <Button 
                            basic
                            color='blue' 
                            animated='vertical'
                            onClick={() => {
                                this.props.sort("politics");
                                this.handleClose()
                            }}
                        >
                            <Button.Content hidden>Politics</Button.Content>
                            <Button.Content visible>
                                <Icon name='transgender' />
                            </Button.Content>
                        </Button>
                        <Button 
                            basic
                            color='blue' 
                            animated='vertical'
                            onClick={() => {
                                this.props.sort("art");
                                this.handleClose()
                            }}
                        >
                            <Button.Content hidden>Art</Button.Content>
                            <Button.Content visible>
                                <Icon name='picture' />
                            </Button.Content>
                        </Button>
                        <Button 
                            basic
                            color='blue' 
                            animated='vertical'
                            onClick={() => {
                                this.props.sort("music");
                                this.handleClose()
                            }}
                        >
                            <Button.Content hidden>Music</Button.Content>
                            <Button.Content visible>
                                <Icon name='music' />
                            </Button.Content>
                        </Button>
                        <Button 
                            basic
                            color='blue' 
                            animated='vertical'
                            onClick={() => {
                                this.props.sort("study");
                                this.handleClose()
                            }}
                        >
                            <Button.Content hidden>Study</Button.Content>
                            <Button.Content visible>
                                <Icon name='book' />
                            </Button.Content>
                        </Button>

                        <Button color='red' onClick={this.handleClose}>
                            Close
                        </Button>
                        
                    </Modal.Actions>
            </Modal>
        );
    }
}

export default SortActivityModal