import React from 'react';
import { Image, Label, Item, Icon, Card, Button, Header, Divider, Dropdown, Modal } from 'semantic-ui-react'
import { push as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default props => {

    return(
        <Menu {...props}> 
            <div id="headerGroup">
                <Image 
                    id="img"
                    src='https://react.semantic-ui.com/images/wireframe/square-image.png' 
                    size='tiny' 
                    circular 
                    centered
                />
                <Header as="h4" id="label"> {props.email} </Header>
            </div>

            <div id="buttonGroup">
        
                <Divider horizontal></Divider>
                <Button
                    onClick={props.createActivity}
                    fluid
                    className="menu-button"
                    id="menuButton"  
                >
                    <Icon name='comments outline' />
                    Create
                </Button>
                <Divider horizontal></Divider>
                
                <Button 
                    fluid
                    id="menuButton" 
                    onClick={props.viewActivity}
                >
                    <Icon name='tasks' />
                    View
                </Button>
                        
                <Divider horizontal></Divider>
                <Button 
                    fluid
                    id="menuButton" 
                >
                    <Icon name='search' />
                    Search
                </Button>
                <Divider horizontal></Divider>
                <Button 
                    fluid
                    id="menuButton" 
                    as={ Link }
                    to="/"
                >
                    <Icon name='log out' />
                    Log Out
                </Button>
            </div>
        </Menu>
    );
}