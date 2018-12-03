import React from 'react';
import MatchTag from './matchTag';
import Prepare from '../../../views/pc/Prepare';
import './match.css'
class MatchList extends React.PureComponent {
    state = {
        index: 0,
        visible: true
    }
    changeColor(index) {
        this.setState({
            index: index
        })
    }
    changeVisible() {
        this.setState({
            visible: !this.state.visible
        })
    }
    render() {
        const { match } = this.props
        return (
            <div style={{ backgroundColor: "#000c17" }}>
                <div
                    className="allMatch"
                >
                    我的比赛
                </div>
                <div
                    className="allMatch"
                    onClick={this.changeVisible.bind(this)}>
                    所有比赛
                </div>
                <div className={this.state.visible ? "listease" : "list"}>
                    {match.map((item, index) => {
                        return (
                            <MatchTag key={index} indexTrue={this.state.index === index} changeColor={this.changeColor.bind(this, index)} matchDetails={item} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default MatchList