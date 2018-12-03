/**
 * 参考：https://www.jianshu.com/p/7a9fbcbb1114
 */

import axios from 'axios';
// import commonStore from './stores/commonStore';
// import authStore from './stores/authStore';

const API_ROOT = 'https://conduit.productionready.io/api';

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    //authStore.logout();
    return;
  }
  return err;
};

// const tokenPlugin = req => {
//   if (commonStore.token) {
//     req.set('authorization', `Token ${commonStore.token}`);
//   }
// };
const dataBody = res => res.data;



const Table = {
  getLastTrick:()=>{
    axios.get('url')
    .then(dataBody)
    .cache(handleErrors);
  },
  playCard:()=>{
    axios.post('url',{
      field1:'',
      field2:''
    })
    .then(dataBody)
    .cache(handleErrors);
  }
}

/**
 * getBoard(tableId)
 * 通过 table id  获得初始 board 信息。
 */
const Board = {
  getBoard: async (tableId)=>{  // 模拟数据 应该是异步的。
    const board =   {
      conn        : {public_channel:1,private_channel:2},
      event       : '国际大赛3',
      site        : '石家庄赛区',
      date        : '2018.10.1',
      board       : '1',
      west        : '张一',
      north       : '王二',
      east        : '李三',
      south       : '赵四',
      dealer      : 'N',
      vulnerable  : 'None',
      deal        : 'N:- A8654.KQ5.T.QJT6 - -',
      scoring     : "IMP"
    }
    return getData(board);
  },
  sendReady: async ()=>{
    return getData(true);
    // throw "失败" 模拟发送失败的情况。
  }
}

// 模拟异步 没有其他用途。
const getData = async (data)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(data),1000)
  })
}




/**
 * 异步模拟  这里用 promise 改造。
 */
// const AsyncObj = {
//   data:null,
//   setData : (data) =>{
//     this.data = data;
//   },
//   fetch:async (data)=>{
//     setTimeout(()=>this.setData(data),1000);
//   }
// }


export default {Board};

// 以下为参考，完成后可以删除。 ----------------------------------------------
/*
const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })

const Articles = {
  all: (page, lim = 10) =>
    requests.get(`/articles?${limit(lim, page)}`),
  byAuthor: (author, page, query) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page, lim = 10) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(lim, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
};
*/