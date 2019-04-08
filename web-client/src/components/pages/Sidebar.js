import React, {Component} from 'react';
import {Image, Icon, Button, Header, Divider} from 'semantic-ui-react';
import {push as Menu} from 'react-burger-menu';
import {Link} from 'react-router-dom';


export default class Sidebar extends Component {

    state = {
        menuOpen: false,
    };

    closeMenu = () => this.setState({menuOpen: false});

    handleStateChange = (state) => this.setState({menuOpen: state.isOpen});

    render() {
        return (
            <Menu
                {...this.props}
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
            >
                <div id="headerGroup">
                    <Image
                        id="img"
                        src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                        size='tiny'
                        circular
                        centered
                    />
                    <Header as="h4" id="label"> {this.props.email} </Header>
                </div>

                <div id="buttonGroup">

                    <Divider horizontal/>
                    <Button
                        onClick={() => {
                            this.closeMenu();
                            this.props.createActivity()
                        }}
                        fluid
                        id="menuButton"
                    >
                        <Icon name='comments outline'/>
                        Create
                    </Button>

                    <Divider horizontal/>

                    <Button
                        onClick={() => {
                            this.closeMenu();
                            this.props.viewActivity()
                        }}
                        fluid
                        id="menuButton"
                    >
                        <Icon name='tasks'/>
                        Activities
                    </Button>

                    <Divider horizontal/>

                    <Button
                        fluid
                        id="menuButton"
                        onClick={() => {
                            this.closeMenu();
                            this.props.sortActivity()
                        }}
                    >
                        <Icon name='sort'/>
                        Sort
                    </Button>

                    <Divider horizontal/>

                    <Button
                        fluid
                        id="menuButton"
                        as={Link}
                        to="/"
                    >
                        <Icon name='log out'/>
                        Log Out
                    </Button>
                </div>
            </Menu>
        );
    };

}