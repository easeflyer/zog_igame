import React from 'react';
import User from './user';
import MatchList from './matchList'
class SideList extends React.Component {
    render() {
        const user = {
            name: "张三",
            face: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
            rank: "大师",
            status: "ok"
        }
        const match = [
            {
                name: "世锦赛"
            }, {
                name: "世锦赛"
            },
            {
                name: "世锦赛"
            },
            {
                name: "世锦赛"
            },
        ]
        const minHeight=window.screen.availHeight
        return (
            <div className="list" style={{minHeight:minHeight}}>
                <User user={user} />
                <MatchList match={match}/>
            </div>
        )
    }
}
export default SideList