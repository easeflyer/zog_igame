import React from 'react';
import { log } from 'util';

class Clock extends React.Component {
    state = {
        time: this.props.start || 0,
        pausetime:[0],
        display: true,
    }
    timeCounter = {
        time: null,
        display: null,
        pause:null,
    }
    componentDidMount() {
        if (this.props.start) {
            this.start()
            this.props.startEvent?this.props.startEvent():null
        }
    }
    start() {
        this.timeCounter.time = setInterval(() => {
            return this.setState((prestate, props) => {
                var { time } = prestate;
                if (this.props.wraningLine) {
                    if (this.props.anti && this.props.wraningLine >= this.state.time&&!this.timeCounter.display) {
                        this.blinks();
                    } else if (!this.props.anti && this.props.wraningLine <= this.state.time&&!this.timeCounter.display) {
                        this.blinks();
                    }
                }
                if (time >= Number(this.props.end||2000)+1 && this.props.anti) {
                    time = --prestate.time
                } else if (time <= Number(this.props.end||0)-1 && !this.props.anti) {
                    time = ++prestate.time
                } else if (time === this.props.end) {
                    this.props.endEvent(this.state.time)
                }
                if(this.props.pause){
                    this.pause()
                }
                
                return { ...prestate, time: time }
            })
        }, 1000)
      
    }
    pause(){
        this.end();
        this.blinks()
        const pauseInner=()=>{
            if(!this.props.pause){
                this.end();
                this.props.pauseEvent?this.props.pauseEvent(this.state.pausetime):null;
                this.start();
            }
            this.setState((prestate,props)=>{
                let pausetime=[...prestate.pausetime];
                if(this.timeCounter.pause){
                    return {...prestate,pausetime:++pausetime[pausetime.length],display:true}
                }else{
                   pausetime.push(0)
                    return {...prestate,pausetime:++pausetime[pausetime.length],display:true}
                }               
            })
        }
        this.timeCounter.pause=setInterval(()=>{
            return pauseInner()
        },1000)
    }
    end() {
        const timeID = Object.keys(this.timeCounter);
        timeID.forEach((item) => {            
            clearInterval(this.timeCounter[item]);
            this.timeCounter[item]=null
        }, this)
    }
    componentWillUnmount() {
        this.end()
        this.props.unmount(this.state.time,this.state.pausetime)
    }
   
    blinks() {  
        this.timeCounter.display = setInterval(() => {
            return this.setState((prestate, props) => {
                return { ...prestate, display: !prestate.display }
            })
        }, 500)
    }
    render() {
      
        const {
            anti,
            wraningLine,
            mount,
            pause,
            position,
            ui,
            size,
            start,
            startEvent,
            end,
            endEvent,
            style,
            component
        } = this.props;
        const {
            time,
            display,
        } = this.state
        
        return (
            <React.Fragment>
                {mount ?
                    <div draggable={true} style={{ ...style, visibility: display ? "visible" : "hidden" }} >
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" >
                            <g>
                                <title>background</title>
                                <rect fill="none" id="canvas_background" height="97" width="102" y="-1" x="-1" />
                                <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
                                    <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%" />
                                </g>
                            </g>
                            <g>
                                <title>Layer 1</title>
                                <g stroke="null" id="svg_32">
                                    <g stroke="null" transform="matrix(0.23071361434944695,0,0,0.23071361434944695,-27.358995633015137,-28.494021335889844) " id="svg_5">
                                        <g stroke="null" id="svg_6">
                                            <path stroke="null" id="svg_7" fill="none" d="m335.303058,180.7814c-86.434,0 -156.754,70.318 -156.754,156.752s70.32,156.752 156.754,156.752s156.752,-70.318 156.752,-156.752s-70.318,-156.752 -156.752,-156.752zm0,300.674c-79.359,0 -143.923,-64.563 -143.923,-143.922s64.564,-143.922 143.923,-143.922s143.922,64.563 143.922,143.922s-64.562,143.922 -143.922,143.922z" />
                                            <path stroke="null" id="svg_8" fill="none" d="m335.303058,217.6114c-66.126,0 -119.923,53.797 -119.923,119.922s53.797,119.922 119.923,119.922c66.125,0 119.922,-53.797 119.922,-119.922s-53.797,-119.922 -119.922,-119.922zm75.232,154.996c-1.232,0 -2.486,-0.191 -3.723,-0.594l-44.67,-14.566c-6.1,8.199 -15.859,13.523 -26.84,13.523c-18.438,0 -33.437,-15 -33.437,-33.438c0,-7.834 2.715,-15.041 7.243,-20.746l-37.572,-53.553c-3.807,-5.424 -2.494,-12.908 2.932,-16.715c5.424,-3.807 12.909,-2.494 16.715,2.932l38.658,55.1c1.777,-0.295 3.601,-0.453 5.461,-0.453c17.346,0 31.646,13.279 33.276,30.205l45.673,14.893c6.302,2.055 9.744,8.828 7.689,15.129c-1.65,5.064 -6.351,8.283 -11.405,8.283z" />
                                            <path stroke="null" id="svg_9" fill="none" d="m335.303058,328.0974c-5.203,0 -9.437,4.232 -9.437,9.436c0,5.203 4.233,9.438 9.437,9.438c5.203,0 9.435,-4.234 9.435,-9.438c0.001,-5.203 -4.232,-9.436 -9.435,-9.436z" />
                                            <path stroke="null" id="svg_10" fill="#73D0F4" d="m191.513058,153.0054c-12.267,0 -23.8,4.777 -32.474,13.451c-14.973,14.973 -17.426,37.795 -7.361,55.34l62.711,-62.711c-6.884,-3.966 -14.718,-6.08 -22.876,-6.08z" />
                                            <path stroke="null" id="svg_11" fill="#73D0F4" d="m479.092058,153.0054c-8.158,0 -15.992,2.113 -22.877,6.08l62.711,62.711c10.065,-17.545 7.611,-40.367 -7.359,-55.34c-8.674,-8.673 -20.207,-13.451 -32.475,-13.451z" />
                                            <path stroke="null" id="svg_12" fill="#eeee33" d="m335.303058,193.6114c-79.359,0 -143.923,64.563 -143.923,143.922s64.563,143.922 143.923,143.922s143.922,-64.563 143.922,-143.922s-64.562,-143.922 -143.922,-143.922zm0,263.844c-66.126,0 -119.923,-53.797 -119.923,-119.922s53.797,-119.922 119.923,-119.922c66.125,0 119.922,53.797 119.922,119.922s-53.797,119.922 -119.922,119.922z" />
                                            <path stroke="null" id="svg_13" fill="#eeee33" d="m516.055058,337.5334c0,-99.668 -81.086,-180.752 -180.752,-180.752c-99.668,0 -180.754,81.084 -180.754,180.752c0,53.789 23.625,102.154 61.033,135.295l-23.261,38.205c-3.447,5.66 -1.652,13.043 4.008,16.49c1.949,1.186 4.104,1.752 6.23,1.752c4.049,0 8,-2.051 10.26,-5.762l21.859,-35.898c28.781,19.359 63.406,30.67 100.625,30.67c37.218,0 71.842,-11.31 100.623,-30.67l21.859,35.898c2.26,3.713 6.211,5.762 10.261,5.762c2.126,0 4.28,-0.566 6.23,-1.752c5.66,-3.447 7.455,-10.83 4.009,-16.49l-23.263,-38.205c37.408,-33.141 61.033,-81.506 61.033,-135.295zm-180.752,156.752c-86.434,0 -156.754,-70.318 -156.754,-156.752s70.32,-156.752 156.754,-156.752s156.752,70.318 156.752,156.752s-70.318,156.752 -156.752,156.752z" />
                                            <path stroke="null" id="svg_15" fill="#eeee33" d="m240.959058,166.4584c2.25,-2.252 3.514,-5.303 3.514,-8.486c0,-3.182 -1.264,-6.234 -3.514,-8.484c-13.208,-13.207 -30.768,-20.483 -49.446,-20.483c-18.679,0 -36.237,7.273 -49.444,20.48c-27.264,27.266 -27.264,71.627 0,98.891c2.344,2.344 5.414,3.516 8.484,3.516c3.072,0 6.143,-1.172 8.486,-3.516l81.92,-81.918zm-81.92,-0.002c8.674,-8.674 20.207,-13.451 32.474,-13.451c8.158,0 15.992,2.113 22.876,6.08l-62.711,62.711c-10.064,-17.545 -7.611,-40.367 7.361,-55.34z" />
                                            <path stroke="null" id="svg_16" fill="#eeee33" d="m528.538058,149.4864c-13.208,-13.207 -30.768,-20.48 -49.445,-20.48c-18.678,0 -36.238,7.275 -49.445,20.482c-2.251,2.25 -3.516,5.303 -3.516,8.484c0,3.184 1.265,6.234 3.516,8.486l81.919,81.918c2.343,2.344 5.414,3.516 8.485,3.516c3.07,0 6.143,-1.172 8.485,-3.516c27.264,-27.263 27.264,-71.625 0.001,-98.89zm-9.612,72.31l-62.711,-62.711c6.885,-3.967 14.719,-6.08 22.877,-6.08c12.268,0 23.801,4.777 32.475,13.451c14.971,14.973 17.425,37.795 7.359,55.34z" />
                                        </g>
                                    </g>
                                </g>
                                <text textAnchor="middle" style={{ cursor: 'move' }} fontWeight="bold" stroke="black" transform="matrix(1.599530816078186,0,0,1.599530816078186,-26.154531851410866,-19.859458282589912) " xmlSpace="preserve" fontFamily="'Monospace', Monospace" fontSize="24" id="svg_34" y="51.312034" x="46.873909" strokeOpacity="null" strokeWidth="0" fill="#ff7f00">{time}</text>
                            </g>
                        </svg>
                    </div> : null}
            </React.Fragment>
        )
    }
}

export default Clock