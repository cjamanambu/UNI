import React from "react"
import {Segment, Grid, Modal, Header, Button, Icon} from "semantic-ui-react"
import '../_loginSty.scss';
import FadeTransition from "../transitions/fadeTransition.jsx";
import {Redirect} from 'react-router-dom'
import axios from "../../axios_def"

class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.showLoginBox = this.showLoginBox.bind(this);
        this.state = {
            isLoginOpen: true,
            isRegisterOpen: false
        };
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen:false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

    render()
    {
        return (
            <Segment placeholder>
                <Grid style={{height: '100vh'}} >
                    <Grid.Column width={8} color={'blue'} >
                        <div className = 'B'  >
                                <h1> UNI. </h1>
                                <div className="ui list">
                                    <div className="item" id = "a">
                                        <i className="search icon"/>
                                        <div className="content">
                                            Follow your interests
                                        </div>
                                    </div>
                                    <div className="item" id = "a">
                                        <i className="university icon"/>
                                        <div className="content">
                                            Safe and monitored environment.
                                        </div>
                                    </div>
                                    <div className="item" id = "a">
                                        <i className="users icon"/>
                                        <div className="content">
                                            Meet people.
                                        </div>
                                    </div>
                                    <div className="item" id = "a">
                                        <i className="conversation icon"/>
                                        <div className="content">
                                            Join the conversion
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div className="root-container">
                            <div className="box-controller">
                                <div
                                    className={"controller " + (this.state.isLoginOpen
                                        ? "selected-controller"
                                        : "")}
                                    onClick={this
                                        .showLoginBox
                                        .bind(this)}>
                                    Login
                                </div>
                                <div
                                    className={"controller " + (this.state.isRegisterOpen
                                        ? "selected-controller"
                                        : "")}
                                    onClick={this
                                        .showRegisterBox
                                        .bind(this)}>
                                    Register
                                </div>
                            </div>
                            <FadeTransition isOpen={this.state.isLoginOpen} duration={300}>
                                <div className="box-container">
                                    <LoginBox/>
                                </div>
                            </FadeTransition>
                            <FadeTransition isOpen={this.state.isRegisterOpen} duration={300}>
                                <div className="box-container">
                                    <RegisterBox showLogin={this.showLoginBox}/>
                                </div>
                            </FadeTransition>
                        </div>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toUserPage:false,
            email: "",
            password: "",
            invalidUser:false,
            errors: [],
            token: null,
            userId: null
        };
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
            errors: [
                ...prevState.errors, {
                    elm,
                    msg
                }
            ]
        }));
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onUsernameChange(e) {
        this.setState({email: e.target.value, invalidUser: false});
        this.clearValidationErr("email");
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value, invalidUser: false});
        this.clearValidationErr("password");
    }

    submitLogin() {
        let email = this.state.email;
        let invalidEmail=false;
        let invalidPassword=false;

        if (this.state.email === "") {
            this.showValidationErr("email", "Email cannot be empty!");
            invalidEmail = true;
        }
        if (invalidEmail === false && !email.endsWith("@myumanitoba.ca")) {
            this.showValidationErr("email", "Email must be a valid @myumaitoba.ca email");
            invalidEmail = true;
        }
        if (this.state.password === "") {
            this.showValidationErr("password", "Password cannot be empty!");
            invalidPassword = true;
        }
        if( invalidEmail !== true && invalidPassword !== true ) {
            const userInfo = {
                email: this.state.email,
                password: this.state.password
            };
            axios.post('/users/signin', userInfo).then( (res) => {
                if(res.data.success) {
                    this.setState({token: res.data.token, toUserPage: true, userId: res.data.user._id});
                }
            }).catch(error => {
                this.setState({invalidUser: true});
                console.log(error.response)
            });
        }
    }

    render() {
        let emailErr = null,
            passwordErr = null,
            invalidUserErr="";

        for (let err of this.state.errors) {
            if (err.elm === "email") {
                emailErr = err.msg;
            }
            if (err.elm === "password") {
                passwordErr = err.msg;
            }
        }

        if(this.state.toUserPage === true ){
            return (<Redirect to = {{pathname : '/user' , state: { stateName: this.state.email, token: this.state.token, userId: this.state.userId}}}/>);
        }

        else if (this.state.invalidUser === true){
            invalidUserErr = "Invalid Email address or Password." +
                "Try again";
        }

        return (
            <div className="inner-container">
                <div className="header">
                    Login
                </div>
                <div className="box">
                    <small className="danger-error">{invalidUserErr
                      }</small>
                    <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input
                            type="text"
                            name="Email"
                            className="login-input"
                            placeholder="Email"
                            onChange={this
                                .onUsernameChange
                                .bind(this)}/>
                        <small className="danger-error">{emailErr
                            ? emailErr
                            : ""}</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={this
                                .onPasswordChange
                                .bind(this)}/>
                        <small className="danger-error">{passwordErr
                            ? passwordErr
                            : ""}</small>
                    </div>
                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitLogin
                            .bind(this)}>Login</button>
                </div>
            </div>
        );
    }

}

class RegisterBox extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            email: "",
            password: "",
            errors: [],
            pwdState: null,
            successConfirmation:false
        };
    }

    showValidationErr(elm, msg) {
        this.setState((prevState) => ({
            errors: [
                ...prevState.errors, {
                    elm,
                    msg
                }
            ]
        }));
    }

    clearValidationErr(elm) {
        this.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    onEmailChange(e) {
        this.setState({email: e.target.value});
        this.clearValidationErr("email");
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
        this.clearValidationErr("password");

        this.setState({pwdState: "weak"});
        if (e.target.value.length >8 && e.target.value.length <12) {
            this.setState({pwdState: "medium"});
        } else if (e.target.value.length >= 12) {
            this.setState({pwdState: "strong"});
        }
    }

    submitRegister() {

        let email = this.state.email;
        let invalidEmail=false;
        let invalidPassword=false;
        if (this.state.email === "") {
            this.showValidationErr("email", "Email cannot be empty!");
            invalidEmail = true;
        }
        if (invalidEmail === false && !email.endsWith("@myumanitoba.ca")) {
            this.showValidationErr("email", "Email must be a valid @myumaitoba.ca email");
            invalidEmail = true;
        }
        if (this.state.password === "") {
            this.showValidationErr("password", "Password cannot be empty!");
            invalidPassword = true;
        }
        if(invalidEmail !== true && invalidPassword !== true ) {
            this.setState({successConfirmation: true});
            let username= this.state.email.split("@")[0];
            const userInfo = {
                username: username,
                email: this.state.email,
                password: this.state.password
            };
            axios.post('/users/signup', userInfo).then( (res) => {
                if(res.data.success) {
                    this.setState({showConfirmation: true});
                }
            }).catch(error => {
                this.setState({invalidUser: true});
                console.log(error.response);
            });
        }

    }
    closeCreateModal = () => {
        this.props.showLogin();
        this.setState({successConfirmation: false})
    };

    render() {

        let passwordErr = null,
            emailErr = null,
            invalidUserErr="";

        for (let err of this.state.errors) {
            if (err.elm === "password") {
                passwordErr = err.msg;
            }
            if (err.elm === "email") {
                emailErr = err.msg;
            }
        }

        let pwdWeak = false,
            pwdMedium = false,
            pwdStrong = false;

        if (this.state.pwdState === "weak") {
            pwdWeak = true;
        } else if (this.state.pwdState === "medium") {
            pwdWeak = true;
            pwdMedium = true;
        } else if (this.state.pwdState === "strong") {
            pwdWeak = true;
            pwdMedium = true;
            pwdStrong = true;
        }
        if (this.state.invalidUser === true){
            invalidUserErr = "Email";
        }

        return (
            <div className="inner-container">
                <div className="header">
                    Register
                </div>
                <div className="box">
                    <Modal onClose={this.closeCreateModal} open={this.state.successConfirmation} size='small' closeIcon id='createActivityModalConfirmation1'>
                        <Modal.Content>
                            <Modal.Description>
                                <Header>Your account has been created</Header>
                                <Header>Log in to access UNI.</Header>
                            </Modal.Description>

                            <br/>
                            <Modal.Actions>
                                <Button color='green'
                                        onClick={this.closeCreateModal}
                                >
                                    <Icon name='checkmark'/> OK
                                </Button>
                            </Modal.Actions>
                        </Modal.Content>
                    </Modal>
                    <small className="danger-error">{invalidUserErr
                    }</small>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            onChange={this
                                .onEmailChange
                                .bind(this)}/>
                        <small className="danger-error">{emailErr
                            ? emailErr
                            : ""}</small>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={this
                                .onPasswordChange
                                .bind(this)}/>
                        <small className="danger-error">{passwordErr
                            ? passwordErr
                            : ""}</small>

                        {this.state.password && <div className="password-state">
                            <div
                                className={"pwd pwd-weak " + (pwdWeak
                                    ? "show"
                                    : "")}/>
                            <div
                                className={"pwd pwd-medium " + (pwdMedium
                                    ? "show"
                                    : "")}/>
                            <div
                                className={"pwd pwd-strong " + (pwdStrong
                                    ? "show"
                                    : "")}/>
                        </div>}
                    </div>
                    <button
                        type="button"
                        className="login-btn"
                        onClick={this
                            .submitRegister
                            .bind(this)}>Register</button>
                </div>
            </div>
        );
    }
}

export default HomePage

