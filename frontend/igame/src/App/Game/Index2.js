import React from 'react'
import { List, WingBlank, Radio, Button} from 'antd-mobile';

const RadioItem = Radio.RadioItem;
const direction = [{value:'N',label:'N'},{value:'E',label:'E'},{value:'S',label:'S'},{value:'W',label:'W'}]
export default class Direct extends React.Component{
	state={
		open:null,
		close:null
	}

	openChange(val){
		this.setState({
			open:val
		})
		console.log(this.state)
	}
	closeChange(val){
		this.setState({
			close:val
		})
		console.log(this.state)
	}

	toIndex=()=>{
		
	}

	render(){
		const {open, close} = this.state
		return(
			<WingBlank >
				<List renderHeader={() => '开室'}>
					{direction.map(i => (
					<RadioItem className="my-radio" key={i.value} checked={open === i.value} onChange={() => this.openChange(i.value)}>
						{i.label}
					</RadioItem>
					))}
				</List>
				<List renderHeader={() => '闭室'}>
					{direction.map(i => (
					<RadioItem className="my-radio" key={i.value} checked={close === i.value} onChange={() => this.closeChange(i.value)}>
						{i.label}
					</RadioItem>
					))}
				</List>
				<Button onClick={this.toIndex}>确认</Button>
			</WingBlank>
		)
	}
}