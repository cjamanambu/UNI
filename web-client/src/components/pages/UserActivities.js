import React from 'react';
import Modal from 'react-awesome-modal';
import '../../App.css';
import axios from "../../axios_def";

class UserActivities extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            attend : false,
            full : false,
            token : this.props.token,
            activityID : this.props.activityID,
            isCreator : false
        }

        /*
            TODO: only creator can see the attendances    --waiting for backend API, My Activities
                  join button depends on activity capacity  --done
                  delete the activity
                  show activities by date
                  when create, send two request, one post one put
                    to let the creator automatically join  --yinka  --done
                  when send request, do not need whole url, just after 8000, see axios_def.js  -- yinka
                  and after creation, the activity list is [], I think it should be null -- yinka
                  delete InlineError.js and SignUpPage.js files
                  My Activities - link to new page? HOW TO just reload userPage?? --RELOAD USERPAGE.
                  time format
        */
        //TODO: how to know the creator of this activity, maybe need to change the structure of the database？
    }

    openModal() {
        const token = this.props.token;

        const helper= {
            headers: {"Authorization": '' + token,
                "Content-Type": "application/json"}
        };

        axios.get('users/user/activities/activity/owner/' + this.props.activityID,helper).then(res => {
            if( this.props.userID === res.data.owner.id){
                this.setState({
                    isCreator : true
                });
            }
        }).catch((error) => {
            console.log(error);
        });

        let attend = false;
        let attendanceCount = this.props.attendances.length;
        let index = 0;

        while ( attendanceCount > 0){
            if(this.props.attendances[index] === this.props.userID){
                attend = true;
            }

            index = index + 1;
            attendanceCount = attendanceCount - 1;
        }

        this.setState({
            visible : true,
            attend: attend
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    joinActivityHandler = () => {
        let attendanceCount = this.props.attendances.length;
        let maxAttendance = this.props.capacity;

        if(attendanceCount === maxAttendance){
            alert("the activity is full");
            //TODO: need to popup ActivityIsFull component which is under messages folder. show:true?
        }else if(attendanceCount < maxAttendance){
            const helper= {
                headers: {"Authorization": '' + this.state.token,
                    "Content-Type": "application/json"}
            };

            axios.put('/activities/activity/attend/' + this.state.activityID ,{},helper).then(res => {
                console.log(res);
                this.props.updateDB();
                this.setState({ visible : false });
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    unJoinActivityHandler = () => {
        const helper= {
            headers: {"Authorization": '' + this.state.token,
                "Content-Type": "application/json"}
        };

        axios.put('/activities/activity/unattend/' + this.state.activityID ,{},helper).then(res => {
            console.log(res);
            this.props.updateDB();
            this.setState({ visible : false });
        }).catch((error) => {
            console.log(error);
        });
    };

    deleteActivityHandler = () => {
        const helper= {
            headers: {"Authorization": '' + this.state.token,
                "Content-Type": "application/json"}
        };

        axios.delete('users/user/activities/activity/delete/' + this.state.activityID,helper).then(res => {
            console.log(res);
            this.props.updateDB();
            this.setState({ visible : false });
        }).catch((error) => {
            console.log(error);
        });
    };


    render() {

        return (
            <div className='item'>
                <div className="content">
                    <button
                        type="button"
                        id="link-button"
                        onClick={() => this.openModal()}>
                        {this.props.title}
                    </button>
                    <div className="description">
                        category: {this.props.category}
                    </div>
                    <div className="extra">
                        time: {this.props.time}
                    </div>

                    <Modal
                        visible={this.state.visible}
                        width="400"
                        height="300"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >

                        <div>
                            <div className="item">
                                <div className="content">
                                    <div className="header">
                                        TITLE: {this.props.title}
                                    </div>
                                    <div className="meta">
                                        <span className="cinema">LOCATION: {this.props.location}</span>
                                    </div>
                                    <div className="description">
                                        {this.state.isCreator && (<li>WHO: {this.props.attendances}</li>)}
                                        <li>category: {this.props.category}</li>
                                        <li>createdTime: {this.props.createdTime}</li>
                                        <li>description: {this.props.description}</li>
                                    </div>
                                    <div className="extra">
                                        <div className="ui label">MAX: {this.props.capacity}</div>
                                        <br/>
                                        <div className="ui label">
                                            <i className="globe icon"/> ACTIVITY TIME: {this.props.time}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br/>

                            {!this.state.attend && !this.state.isCreator &&(
                                <button
                                    className='small ui primary button'
                                    onClick={this.joinActivityHandler}>
                                    Join
                                </button>
                            )}

                            {this.state.attend && !this.state.isCreator &&(
                                <button
                                    className='small ui primary button'
                                    onClick={this.unJoinActivityHandler}>
                                    unJoin
                                </button>
                            )}

                            {this.state.isCreator &&(
                                <button
                                    className='small ui primary button'
                                    onClick={this.deleteActivityHandler}>
                                    delete
                                </button>
                            )}

                            <button
                                className='small ui primary button'
                                onClick={() => this.closeModal()}>
                                close
                            </button>

                        </div>

                    </Modal>
                </div>
            </div>
        );
    }
}

export default UserActivities;