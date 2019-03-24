import React from "react";
import { Segment } from "semantic-ui-react";
import UserActivity from './UserActivities';
import Sidebar from "./Sidebar";
import "../../userpage.css";
import axios from "../../axios_def";
import CreateActivity from './CreateActivity';
import ViewActivityModal from './ViewActivityModal';
import SortActivityModal from './SortActivityModal'

class UserPage extends React.Component {
    state = {
        activities: [],
        displayCreateModal:false,
        displayViewModal:false,
        displaySortModal:false,
        dataBaseUpdate:false,
    };

    createActivityHandler = () => {
        this.refs.createModal.open();
    };

    viewActivityHandler = () => this.refs.viewActivityModal.handleOpen();
    
    sortActivityHandler = () => this.refs.sortActivityModal.handleOpen();

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

    sortActivitiesByCategory = (category) => {
        let route = '/activities/activity/sortBy/' + category;
        axios.get(route).then(res => {
            const activities = res.data.activities;
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

                <ViewActivityModal
                    ref="viewActivityModal"
                    display={this.state.displayViewModal}
                    viewAll={this.testHandler}
                    viewMine={this.showMyActivityHandler}
                    viewInterests={this.showUserActivityHandler}
                />

                <SortActivityModal
                    ref="sortActivityModal"
                    display={this.state.displaySortModal}
                    sort={this.sortActivitiesByCategory}
                />

                <Sidebar
                    pageWrapId={"page-wrap"} 
                    outerContainerId={"App"}
                    width={ "20%" }
                    email={this.props.location.state.stateName}
                    createActivity={this.createActivityHandler}
                    viewActivity={this.viewActivityHandler}
                    sortActivity={this.sortActivityHandler}
                />

                <div id="page-wrap">
                    <Segment>
                        <h2 class="ui center aligned icon header">
                            <i class="circular users icon"></i>
                            UNI 
                        </h2>
                        {/* <h2>welcome, {this.props.location.state.stateName}!</h2>

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

                        <button
                            className='medium ui primary button'
                            onClick={() => this.sortActivitiesByCategory("sports")}
                        >
                            Sports
                        </button> */}
                        

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
