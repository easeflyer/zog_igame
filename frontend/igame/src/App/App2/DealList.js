class ListItem {
    constructor(item){
		this.key = ++ListItem.key;
	    this.info = {};
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
ListItem.key = 0;

export default class List {
    constructor(){
	    this.allList = [
		    new ListItem(List.eventList[0]),
		    new ListItem(List.eventList[1]),
		    new ListItem(List.eventList[2]),
		    new ListItem(List.eventList[3]),
		    new ListItem(List.eventList[4]),
		    new ListItem(List.eventList[5])
		];
		this.list = this.allList;
		this.word = '';//搜索关键字
    }
    
    //搜索
	searchlist(word){
	    this.word = word;
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
    {  
        eventName : '石家庄宏鸿杯桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {  
        eventName : '石家庄桥协城际桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {  
        eventName : '北京市桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },{  
        eventName : '石家庄宏鸿杯桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {  
        eventName : '石家庄桥协城际桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {  
        eventName : '北京市桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },{  
        eventName : '石家庄宏鸿杯桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {  
        eventName : '石家庄桥协城际桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
    {  
        eventName : '北京市桥牌赛', 
        eventTime: '2018/09/20 - 2018/09/30',
        organizer:'石家庄桥牌协会',
        sponsors:'石家庄宏鸿集团',
        referee:'张江川',
        arbitration:'马强',
        signingTime: '2018/07/05 - 2018/07/20',
        descrip: 'Double round robin, 12 per game board, arranged in a cumulative VP'
    },
];