/**
 * 这个Models 用来模拟数据提供。
 * 控制器 game.js table.js 调用 views 和 models
 * models 也就是本文件，负责提供数据。
 * 如果 Models.debug = true 提供模拟数据。否则调用 Api.js 提供真实数据。
 * 
 * 考虑 Models 直接用 models/table.js 因为计算都在里面。而且 table 本来就是模型。
 * 而 api.js 里面考虑提供模拟数据或者 后台数据。
 * 那个模型需要 接口数据，就直接在那个模型中请求。模拟数据。
 * 方式 
 * 
 * 
 */

class Models{
    static deals(){
        // E               S                W                N
        // S.H.D.C
        return ['T76543.4.K72.863 QJ98.A5.J853.QT4 A2.Q986.AQT.KJ97 K.KJT732.964.A52', 
        'Q74.K963.J7.KQJ8 AJ52.J52.A2.AT95 986.AT74.KT85.62 KT3.Q8.Q9643.743',
        '986.J5.AJT93.KT7 Q2.A732.8642.J94 K3.KT8.Q75.A8653 AJT754.Q964.K.Q2',
        'A63.A954.AT4.Q52 QT84.QJ7.K832.AT J95.K862.J97.643 K72.T3.Q65.KJ987']
    }
    /**
     * 获得明手的牌，根据规则进行判断。
     * todo:正确的牌
     */
    static openDummy(){
        return {seat:'north',cards:'K.KJT732.964.A52'}
    }
    /**
     * 获得上一墩牌，这里应该进行必要的判断。不能随便获得。
     * [东，南，西，北]
     */
    static lastTrick(){
        return [{index:1,card:'7S'},
                {index:14,card:'9S'},
                {index:28,card:'2S'},
                {index:41,card:'KS'}]
    }
    static getResult(){
        return "N3D +2 NS 600";
    }
    // 调用 api 返回用户登录状态。
    static ckLogin(){
        return false;
        return {
            userid:1,
            username:'张三丰',
            seat:'N',
        }
        // 如果 api 获得数据失败 return false;
    }
}
Models.debug = true;

export default Models