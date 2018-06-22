class ListItem {
    constructor(item){
		this.key = ++ListItem.key;
        this.info = {};
        this.info.thumb = item.thumb;
	    this.info.eventName = item.eventName;
		this.info.eventTime = item.eventTime;
		this.info.organizer = item.organizer;
		this.info.sponsors = item.sponsors;
		this.info.referee = item.referee;
		this.info.arbitration = item.arbitration;
		this.info.signingTime = item.signingTime;
		this.info.descrip = item.descrip;
	}
}

export default class List {
    constructor(){
        ListItem.key = 0;
	    this.allList = [
		    new ListItem(List.eventList[0]),
		    new ListItem(List.eventList[1]),
		    new ListItem(List.eventList[2]),
		    new ListItem(List.eventList[3]),
            new ListItem(List.eventList[4])
		];
		this.list = this.allList;
		this.word = '';//搜索关键字
    }
    
    //搜索
	searchlist(word){
        this.word = word;
        this.list = this.allList;
        //在list中搜索
        if(!this.word){
            this.list=this.allList;
        }
	    this.list = this.list.filter(item => {
		    return item.info.eventName.indexOf(word)!=-1 
        });
        return this;
    } 
}

// 模拟数据库
List.eventList = [
    {   thumb: 'http://pic2.ooopic.com/10/55/23/14b1OOOPIC34.jpg',
        eventName : '石家庄宏鸿杯桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {   thumb: 'http://pic2.ooopic.com/10/52/30/34b1OOOPIC21.jpg',
        eventName : '石家庄桥协城际桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {   thumb: 'http://pic32.nipic.com/20130829/13536465_000509793000_2.jpg',
        eventName : '北京市桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'北京桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {   thumb:'http://pic31.nipic.com/20130705/13181524_151216468000_2.jpg',
        eventName : '杭州千岛湖桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'杭州桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {   thumb:'http://img.hb.aicdn.com/a6f3a898884233b5f9ae0d8f6ea58019ad618f8012d94-A4GGwI_fw658',
        eventName : '重庆三家坝桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    }
];