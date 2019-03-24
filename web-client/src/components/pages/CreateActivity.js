import React from 'react';
import {Modal,Form,Button, Header,Icon} from "semantic-ui-react";
import '../../App.css'
import {DateTimeInput} from 'semantic-ui-calendar-react';
import axios from "../../axios_def";
//TODO reload activities

const Categories = [
    {
        key: '',
        text: '',
        value: '',
    },
    {
        key: 'SPORTS',
        text: 'SPORTS',
        value: 'SPORTS',
    },
    {
        key: 'STUDY',
        text: 'STUDY',
        value: 'STUDY',

    },
    {
        key: 'ART',
        text: 'ART',
        value: 'ART',

    },
    {
        key: 'POLITICS',
        text: 'POLITICS',
        value: 'POLITICS',

    },
    {
        key: 'MUSIC',
        text: 'MUSIC',
        value: 'MUSIC',

    },
];
const numberOfPeople = [
    {
        key: '1',
        text: '1',
        value: '1',
    },
    {
        key: '2',
        text: '2',
        value: '2',
    },
    {
        key: '3',
        text: '3',
        value: '3',
    },
    {
        key: '4',
        text: '4',
        value: '4',
    },
    {
        key: '5',
        text: '5',
        value: '5',
    },
    {
        key: '6',
        text: '6',
        value: '6',
    },
    {
        key: '7',
        text: '7',
        value: '7',
    },
    {
        key: '8',
        text: '8',
        value: '8',
    },
    {
        key: '9',
        text: '9',
        value: '9',
    },
    {
        key: '10',
        text: '10',
        value: '10',
    },
    ];

class CreateActivity extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            attendance_list:[],
            activity_dateTime: '',
            max_attendance:'',
            category:'',
            title:'',
            description:'',
            location:'',
            formError:false,
            titleError:false,
            categoryError:false,
            descriptionError:false,
            max_attendanceError:false,
            locationError:false,
            activity_dateTimeError: false,
            show:false,
            showConfirmation:false

        };
    }

    open = () => {
        this.setState({ show: true });
        this.setState({titleError: false});
        this.setState({descriptionError: false});
        this.setState({categoryError: false});
        this.setState({locationError: false});
        this.setState({max_attendanceError: false});
        this.setState({activity_dateTimeError: false});
    };

    submitNewActivity (){
        const token = this.props.token;
        let helper= {
            headers: {"Authorization": ''+token,
                "Content-Type": "application/json"}
        };
        const userInfo = {
            attendance_list:[],
            category:this.state.category,
            activity_datetime: this.state.activity_dateTime,
            max_attendance:this.state.max_attendance,
            description: this.state.description,
            title: this.state.title,
            location: this.state.location
        };

        let activityId="";

        axios.post('/activities/activity/create', userInfo,helper).then( (res) => {
            activityId= res.data.activity.id;
            axios.put('/activities/activity/attend/' + activityId ,{},helper).then(res1 => {
            }).catch((error) => {
                console.log(error);
            });
        }).catch(error => {
            console.log(error.response)
        });


    }
    submitForm() {

        let error = false;
        if (this.state.title === '') {
            this.setState({titleError: true});
            error = true
        }
        else {
            this.setState({titleError: false});
            error = false
        }
        if (this.state.description === '') {
            this.setState({descriptionError: true});
            error = true
        }
        else {
            this.setState({descriptionError: false});
            error = false
        }
        if (this.state.category === '') {
            this.setState({categoryError: true});
            error = true
        }
        else {
            this.setState({categoryError: false});
            error = false
        }
        if (this.state.location === '') {
            this.setState({locationError: true});
            error = true
        }
        else {
            this.setState({locationError: false});
            error = false
        }
        if (this.state.max_attendance === '') {
            this.setState({max_attendanceError: true});
            error = true
        }
        else {
            this.setState({max_attendanceError: false});
            error = false
        }
        if (this.state.activity_dateTime === '') {
            this.setState({activity_dateTimeError: true});
            error = true
        }
        else {
            this.setState({activity_dateTimeError: false});
            error = false
        }
        if (error) {
            this.setState({formError: true});
        }
        else {
            this.submitNewActivity();
            this.submitCloseModal()
        }
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };

    submitCloseModal = () => {
        if(this.state.formError === false){
            this.setState({show: false});
            this.setState({showConfirmation:true});
        }
    };

    closeModal = () => {
        this.setState({show: false})
    };

    closeConfirmationModal = () => {
        this.props.updateDB();
        this.setState({showConfirmation: false})
    };

    render() {
        return (
            <div>
                <Modal onClose={this.closeConfirmationModal} open = {this.state.showConfirmation} size='small' id='createActivityModalConfirmation' closeIcon>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>You have added a new activity</Header>
                        </Modal.Description>
                        <br/>
                        <Modal.Actions>
                            <Button color='green'
                            onClick={this.closeConfirmationModal}
                            >
                                <Icon name='checkmark' /> OK
                            </Button>
                        </Modal.Actions>
                    </Modal.Content>
                </Modal>
                <Modal closeIcon  onClose ={this.closeModal} open = {this.state.show} size='large' id='createActivityModal'>
                    <Modal.Header>Create An Activity</Modal.Header>
                    <Form disabled={false}>
                        <Form.Field required>
                            <label>Category</label>
                            <Form.Dropdown
                                name="category"
                                placeholder='Category'
                                fluid
                                selection
                                options={Categories}
                                onChange={this.handleChange}
                                error={this.state.categoryError}
                                value={this.state.category}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Name of activity</label>
                            <Form.Input placeholder='Name of activity'
                                        name="title"
                                        required
                                        error={this.state.titleError}
                                        onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Location</label>
                            <Form.Input placeholder='Location'
                                        name="location"
                                        error={this.state.locationError}
                                        onChange={this.handleChange}
                                        required/>
                        </Form.Field>
                        <Form.Field required>
                            <label>Description</label>
                            <Form.TextArea placeholder='Description'
                                           name="description"
                                           onChange={this.handleChange}
                                           error={this.state.descriptionError}
                                           required
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Number of attendees needed </label>
                            <Form.Dropdown
                                placeholder='Number of attendees needed '
                                fluid
                                search
                                selection
                                required
                                options={numberOfPeople}
                                error={this.state.max_attendanceError}
                                name="max_attendance"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Data and Time</label>
                            <DateTimeInput
                                name="activity_dateTime"
                                placeholder="Date Time"
                                required={true}
                                minDate={new Date()}
                                dateTimeFormat={'YYYY-MM-DD, h:mm:ss'}
                                error={this.state.activity_dateTimeError}
                                value={this.state.activity_dateTime}
                                iconPosition="left"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Button
                                onClick={this.submitForm.bind(this)}>
                                Create
                            </Form.Button>
                        </Form.Field>
                    </Form>

                </Modal>
            </div>
    );
    }
}
export default CreateActivity;