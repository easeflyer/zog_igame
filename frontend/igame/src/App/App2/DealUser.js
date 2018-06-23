class UserItem {
    constructor(item){
        this.userInfo = {};
        this.userInfo.name = item.name;
        this.userInfo.eventId = item.eventId;
        this.userInfo.tel = item.tel;
        this.userInfo.email = item.email;
        this.userInfo.teamList = item.teamList;
        this.userInfo.friendList = item.friendList;
	}
}

export default class UserLists {
    constructor(){
	    this.allUserLists = [
		    new UserItem(UserLists.userLists)
		];
		this.list = this.allUserLists;
    }
}


UserLists.userLists=
    {
        name: 'panpan',
        eventId: 123,
        tel: 12345678,
        email: '652336842@163.com',
        teamList:[
            { teamName:'无敌小可爱', leaderName:'冯正', coachName:'郭霖', playerName:'张蔷', playerName:'肖杰', playerName:'李翔', playerName:'高飞'},
            { teamName:'全宇宙最帅', leaderName:'冯正', coachName:'郭霖', playerName:'黄潇', playerName:'丁丁', playerName:'千惠', playerName:'马阳'}
        ],
        friendList:[
            { name:'张蔷', eventId:124 },
            { name:'肖杰', eventId:125 },
            { name:'李翔', eventId:126 },
            { name:'高飞', eventId:127 },
            { name:'黄潇', eventId:128 },
            { name:'丁丁', eventId:129 },
            { name:'千惠', eventId:130 },
            { name:'马阳', eventId:131 }
        ]
    }
