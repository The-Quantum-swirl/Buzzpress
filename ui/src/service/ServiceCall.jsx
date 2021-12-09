import { accessToken, baseURL} from "./ServicePath";
import httpService from './Httpservice';

const resetToken = () => {
    localStorage.removeItem(accessToken());
    localStorage.removeItem('you');
    console.log('token removed');
}
const setUser = (userData) => {
    localStorage.setItem('you', JSON.stringify(userData));
}

const getAllUsers = async () => {
    const res = await httpService.get(baseURL() + "allUsers");
    return res.data;
};

const getUser = async(id) => {
    let path = id === undefined? 'author':`user/${id}`;
    // caching and returning data
    if (path === 'author' && localStorage.getItem('you')!==null){
        console.log('returning cashed data')
        return JSON.parse(localStorage.getItem('you'));
    }
    console.log('not returned cashed data');

    const res = await httpService.get(baseURL() + path)
    // cashing user data
    if (res?.data !==undefined) setUser(res.data);

    return res.data;
};
const getUserStats = async () =>{
    const res = await httpService.get(baseURL() + `userStats`);
    return res.data;
};

const postArticle = (data) => {
    httpService.post(baseURL() + `saveArticle`, data )
    .then((res) => { return res.status; })
    .catch((err) => { return err.response.status;})
}

const postImage = (fd, header) => {
    httpService.post(baseURL() + `upload-image`, fd , header)
    .then((res) => { return res.status; })
    .catch((err) => { return err.response.status;})
}
const postProfilePhoto = (imageName) => {
    httpService.post(baseURL() + `postuserphoto/${imageName}`)
}

const postFollow = (followingId) =>{
    httpService.put(baseURL() + `follow`, {
        "follower": 0,
        "toFollow": followingId,
        "toUnFollow": 0
    } ).then((res) => { console.log(res); });
}

const postUnFollow = (followingId) =>{
    httpService.put(baseURL() + `unFollow`, {
        "follower": 0,
        "toFollow": 0,
        "toUnFollow": followingId,
    } ).then((res) => { console.log(res); });
}

const postLike = (articleId) =>{
    httpService.put(baseURL() + `like/${articleId}`)
    .then((res) => { console.log(res); });
}
const postUnlike = (articleId) =>{
    httpService.put(baseURL() + `unlike/${articleId}`)
    .then((res) => { console.log(res); });
}

const postReadCountIncrement = () =>{
    httpService.put( baseURL() + `readCount`)
    .then((res) => { console.log(res); })
    .catch((err) => {console.log(err)});
}
// get Urls
const sameUser = async (userId) => {
    return await httpService.get(baseURL() + `compareuser/${userId}`)
}
const hasLiked = async (articleId) => {
    return await httpService.get(baseURL() + `hasLikedArticle/${articleId}`)
}
const getThumbUrl = (imageName) => {
    if (imageName === '')    return {data:''};
    
    const res = baseURL() + `images/${imageName}`;
    return res;
}
const getProfileUrl = (profileId) => {
    return `/profile/${profileId}`;
}

const getArticleUrl = (articleId) => {
    return `/article/${articleId}`;
}

const getArticleCards = async () =>{
    const res = await httpService.get(baseURL() + `articleMeta`);
    return res.data;
};
const getArticleCardsByAuthorId = async (id) =>{
    const res = (id === undefined ? await httpService.get(baseURL() + `articleMetaByAuthor`)
    : await httpService.get(baseURL() + `articleMetaByAuthor/${id}`) );
    
    return res.data;
};
const getArticleMetaById = async (articleId) =>{
    const res = await httpService.get(baseURL() + `articleMeta/${articleId}`);
    return res.data[0];
}; 
const getArticle = async (articleId) =>{
    const res = await httpService.get(baseURL() + `article/${articleId}`);
    return res.data[0];
}

const getPerformers = async () =>{
    const res = await httpService.get(baseURL() + `topUsers`);
    return res.data;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllUsers,
    getUser,
    getUserStats,
    getArticleCards,
    getArticleMetaById,
    getArticleCardsByAuthorId,
    getThumbUrl,
    getProfileUrl,
    getArticle,
    getPerformers,
    getArticleUrl,
    sameUser,
    hasLiked,

    postArticle,
    postImage,
    postFollow,
    postUnFollow,
    postLike,
    postUnlike,
    postReadCountIncrement,
    postProfilePhoto,

    resetToken,
}

