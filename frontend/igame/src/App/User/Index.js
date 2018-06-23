import React from 'react';
import LoginPage from './Login';
export default class User extends React.Component{
    state = {
        page:'login'
    }
    render() {
        switch (this.state.page) {
            case 'login':
                return <LoginPage toggleLoginState={this.props.toggleLoginState} goHome={this.props.goHome} />
            case 'register':
                return <h1>register</h1>
            case 'findpwd':
                return <h1>findpwd</h1>
        }
        
    }
}