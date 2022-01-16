import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    handleOnChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        );
    }

    handleOnSubmit(e) {
        this.props.getToken(this.state.username, this.state.password);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <input type="text"
                           name="username"
                           placeholder="username"
                           value={this.state.login}
                           onChange={(e) => this.handleOnChange(e)}
                    />
                    <input type="password"
                           name="password"
                           placeholder="password"
                           value={this.state.password}
                           onChange={(e) => this.handleOnChange(e)}
                    />
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}

export default LoginForm;
