import Models from '../models/model'

/**
 * 游戏 Model 用来处理数据相关。
 */
class Game {
  constructor() {
    this.user = null;
  }
  /**
   * 判断登录状态。获得用户身份。
   * 如果用户已经登录，获得用户信息。
   * 如果没有登录跳转到登录 路由。
   */
  ckLogin() {
    let user = sessionStorage.getItem('user');
    if (!user) {
      user = Models.ckLogin();
      //if(!user) alert("未登录，跳转");
      sessionStorage.setItem('user', user);
    }
    this.user = user;
  }
}

export default Game;