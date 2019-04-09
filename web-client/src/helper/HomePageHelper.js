export class HomePageHelper {

    static validateEmail(email) {
        let invalidEmail = false,
            toreturn = "";

        if (email === "") {
            toreturn = "Email field cannot be empty!";
            invalidEmail = true;
        }
        if (invalidEmail === false && !email.endsWith("@myumanitoba.ca")) {
            toreturn = "Email must be a valid @myumaitoba.ca email";
        }
        return toreturn;
    }

    static validatePassword(password) {
        let toreturn = "";
        if (password === "") {
            toreturn = "Password field cannot be empty!";
        }
        return toreturn;
    }

    static clearValidationErr(state, elm) {
        state.setState((prevState) => {
            let newArr = [];
            for (let err of prevState.errors) {
                if (elm !== err.elm) {
                    newArr.push(err);
                }
            }
            return {errors: newArr};
        });
    }

    static showValidationErr(state, elm, msg) {
        state.setState((prevState) => ({
            errors: [
                ...prevState.errors, {
                    elm,
                    msg
                }
            ]
        }));
    }

}