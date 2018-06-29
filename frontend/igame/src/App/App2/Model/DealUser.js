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
            { teamName:'无敌小可爱', leaderName:'冯正', leaderId:122, coachName:'郭霖', coachId:123,
             player:[
                { name:'张蔷', eventId:124 },
                { name:'肖杰', eventId:125 },
                { name:'李翔', eventId:126 },
                { name:'高飞', eventId:127 }
             ],
             contacts: '冯正', contactsTel: 1236233645, contactsMail: '562318@163.com'
            },
            { teamName:'全宇宙最帅', leaderName:'郭霖', coachId:123, coachName:'冯正', leaderId:122,
             player:[
                { name:'黄潇', eventId:128 },
                { name:'丁丁', eventId:129 },
                { name:'千惠', eventId:130 },
                { name:'马阳', eventId:131 }
             ],
             contacts: '郭霖', contactsTel: 635984512, contactsMail: '635984512@163.com'
            }
        ],
        friendList:[          
            { name:'冯正', eventId:122 },
            { name:'郭霖', eventId:123 },
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
