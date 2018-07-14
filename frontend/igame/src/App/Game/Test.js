import React from 'react'

const text = "<p>{'card':u'3s'}</p>"

export default class TT extends React.Component{
    state={
        val:null,
        post: null,
    }


    componentDidMount(){
        console.log(text)
        console.log(text.substring(0,3))
    }

    render(){
        return(
            <div>
                <p></p>
            </div>
        )
    }
}