import React from 'react';
import LoginPage from './Login';
import RegisterPage from './Register';
export default class User extends React.Component{
    state = {
        page:'login'
    }
    toLoginPage = ()=>{
        this.setState({
            page:'login'
        });
    }
    toRegisterpage = ()=>{
        this.setState({
            page:'register'
        })
    }
    render() {
        switch (this.state.page) {
            case 'login':
                return <LoginPage toggleLoginState={this.props.toggleLoginState} goHome={this.props.goHome} toRegisterpage={this.toRegisterpage} />
            case 'register':
                return <RegisterPage toLoginPage={this.toLoginPage} />
            case 'findpwd':
                return <h1>findpwd</h1>
        }
        
    }
}