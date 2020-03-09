import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {

    handleSignIn = async (e) => {
        e.preventDefault();
        const user = await request.post('https://protected-savannah-71251.herokuapp.com/api/auth/signin', {
            email: this.state.signInEmail,
            password: this.state.signInPassword,
            display_name: this.state.signInEmail,
        })

        this.props.setUser(user);

        this.props.history.push('/')
    }

    handleSignUp = async (e) => {
        e.preventDefault();
        const user = await request.post('https://protected-savannah-71251.herokuapp.com/api/auth/signup', {
            email: this.state.signUpEmail,
            password: this.state.signUpPassword,
            display_name: this.state.signUpEmail,
        })

        this.props.setUser(user);

        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                {this.props.user && <h2>Hi {this.props.user.displayName}</h2>}
                <form onSubmit={ this.handleSignIn }>
                    <input defaultValue="email" onChange={(e) => this.setState({ signInEmail: e.target.value })} />
                    <input defaultValue="password" onChange={(e) => this.setState({ signInPassword: e.target.value })} />
                    <button className="sign-in">Sign In</button>
                </form>
                <form onSubmit={ this.handleSignUp }>
                    <input defaultValue="email" onChange={(e) => this.setState({ signUpEmail: e.target.value })} />
                    <input defaultValue="password" onChange={(e) => this.setState({ signUpPassword: e.target.value })} />
                    <button className="sign-up">Sign Up</button>
                </form>
            </div>
        )
    }
}