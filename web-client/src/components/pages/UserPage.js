import React from "react";
import { Segment } from "semantic-ui-react";
import UserActivity from './UserActivities';
import Sidebar from "./Sidebar";
import "../../userpage.css";
import axios from "../../axios_def";
import CreateActivity from './CreateActivity';

class UserPage extends React.Component {
    state = {
        activities: [],
        displayCreateModal:false,
        dataBaseUpdate:false
    };

    createActivityHandler = () => {
        this.refs.createModal.open();

    };

    updateDB = () => {
        this.setState({dataBaseUpdate:true});
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.dataBaseUpdate !== this.state.dataBaseUpdate){

            axios.get('/activities').then(res => {
                const activities = res.data.activities;
                this.setState({ activities });
            }).catch((error) => {
                console.log(error);
            });
            this.setState({dataBaseUpdate:false});
        }
    };

    showUserActivityHandler = () => {

        const token = this.props.location.state.token;

        const helper= {
            headers: {"Authorization": '' + token,
                "Content-Type": "application/json"}
        };

        axios.get('/users/user/activities/attending',helper).then(res => {
            const activities = res.data.activities;
            this.setState({ activities });
        }).catch((error) => {
            console.log(error);
        });
    };

    showMyActivityHandler = () => {
        const token = this.props.location.state.token;

        const helper= {
            headers: {"Authorization": '' + token,
                "Content-Type": "application/json"}
        };

        axios.get('/users/user/myActivities',helper).then(res => {
            const activities = res.data.my_activities;
            this.setState({ activities });
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        axios.get('/activities').then(res => {
            const activities = res.data.activities;
            this.setState({ activities });
        }).catch((error) => {
            console.log(error);
        });
    };

    testHandler = () => {
        window.location.reload();
    };


    render()
    {
        return (
            <div id="App">

                <CreateActivity
                    ref ="createModal"
                    token = {this.props.location.state.token}
                    display={this.state.displayCreateModal}
                    updateDB = {this.updateDB}
                />

                <Sidebar
                    pageWrapId={"page-wrap"} 
                    outerContainerId={"App"}
                    width={ "20%" }
                    email={this.props.location.state.stateName}
                    createActivity={this.createActivityHandler}
                />

                <div id="page-wrap">
                    <Segment>
                        <h2>welcome, {this.props.location.state.stateName}!</h2>

                        <button
                            className='medium ui primary button'
                            onClick={this.createActivityHandler}>
                            Create Activity
                        </button>

                        <button
                            className='medium ui primary button'
                            onClick={this.testHandler}>
                            all activities
                        </button>

                        <button
                            className='medium ui primary button'
                            onClick={this.showUserActivityHandler}>
                            Interested(Attending) Activities
                        </button>

                        <button
                            className='medium ui primary button'
                            onClick={this.showMyActivityHandler}>
                            My(creator) Activities
                        </button>

                        <div className='ui items'>
                            {
                                this.state.activities.map(
                                    activity => <UserActivity
                                                    key={activity._id}
                                                    activityID={activity._id}
                                                    time={activity.activity_datetime}
                                                    attendances={activity.attendance_list}
                                                    category={activity.category}
                                                    createdTime={activity.datetime_created}
                                                    description={activity.description}
                                                    capacity={activity.max_attendance}
                                                    title={activity.title}
                                                    location={activity.location}
                                                    userID = {this.props.location.state.userId}
                                                    token = {this.props.location.state.token}
                                                    updateDB = {this.updateDB}
                                    />
                                )
                            }
                        </div>
                    </Segment>
                </div>
            </div>
        )
    }
}

export default UserPage
