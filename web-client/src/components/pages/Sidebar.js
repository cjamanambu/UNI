import React from 'react';
import { Image, Label, Item, Icon, Card, Button, Header, Divider, Dropdown, Modal, Input } from 'semantic-ui-react'
import { push as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

const countryOptions = [
    { key: 'sports', value: 'sports', text: 'Sports' },
    { key: 'politics', value: 'politics', text: 'Politics' },
    { key: 'study', value: 'study', text: 'Study' },
    { key: 'art', value: 'art', text: 'Art' },
    { key: 'music', value: 'music', text: 'Music' },
  ]

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
                    id="menuButton"  
                >
                    <Icon name='comments outline' />
                    Create
                </Button>

                <Divider horizontal></Divider>
                
                <Button 
                    onClick={props.viewActivity}
                    fluid
                    id="menuButton" 
                >
                    <Icon name='tasks' />
                    Activities
                </Button>
    
                <Divider horizontal></Divider>
    
                <Button 
                    fluid
                    id="menuButton"
                    onClick={props.sortActivity}
                >
                    <Icon name='sort' />
                    Sort
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