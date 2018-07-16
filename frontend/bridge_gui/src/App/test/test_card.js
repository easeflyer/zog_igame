import React from 'react';
import TweenOne from 'rc-tween-one';
import Card from '../game/Card'


class TestCard extends React.Component {
    state = {
        left:100,
        top:0,

    }
    constructor(props) {
        super(props)
        this.state.card = <Card
            index={1}
            size={80}
            card={'5D'}
        />

    }
    onclick = () => {

            this.setState({
                left: 100,
                top:110,

            })

    }
    render() {
        return (
            <div>
                <Card
                    animation={{
                        top:200,
                        left:200,
                        rotate:90,
                        delay:1,
                        duration:1800,
                    }}
                    index={1}
                    size={80}
                    card={'5S'}
                    left={100}
                    top={100}
                />
                <button onClick={this.onclick}>测试2222222222222222222222222222222</button>
            </div>
        )
    }
}


export default TestCard