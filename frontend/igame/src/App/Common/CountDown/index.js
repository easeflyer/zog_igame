import React from 'react';
export default class CountDown extends React.Component {
	
	state = {
		hour:"01",
		min:0,
		sec:0,
		time:3600,
		timer:null
		
	}
	constructor(props){
		super(props);
		this.countdown = this.countdown.bind(this);
	}
	start(){
		let timeMax = 3600;
	    this.timer = setInterval(this.countdown,1000)
	}
	
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	countdown(){
		--this.state.time;
		var hour = Math.floor(this.state.time/3600)>0 ? "01" : "00";
		var min = Math.floor((this.state.time-hour*3600)/60)<10 ?('0'+ Math.floor((this.state.time-hour*3600)/60)):Math.floor((this.state.time-hour*3600)/60);
		var sec = Math.floor(this.state.time%60)<10 ? ('0' + Math.floor(this.state.time%60)):Math.floor(this.state.time%60);
		this.setState({
			hour:hour,
			min:min,
			sec:sec
		})
	}
	render(){
		return (
			<div style = {{position:'absolute',top:"26px",right:"13px",color:'#fff'}}>剩余时间{this.state.hour} : {this.state.min} : {this.state.sec}</div>
		)
	}
}
