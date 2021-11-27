import { baseURL } from "./ServicePath";
import { authorId } from "../constants/UserData";
import httpService from './Httpservice';

const getAllUsers = async () => {
    const res = await httpService.get(baseURL + "api/allUsers");
    return res.data;
};
function saveUsers(params) {
    console.log("Save User Api called");
    console.log(params);
    httpService.post(baseURL + "storeLoanData", params).then((res) => {
        console.log(res);
    });
}

const getUser = async (id) => {
    const res = await httpService.get(baseURL + `user/${id}`);
    return res.data;
};
const getUserStats = async (id) =>{
    const res = await httpService.get(baseURL + `userStats/${id}`);
    return res.data;
};

const postArticle = (id, data) => {
    httpService.post(baseURL + `saveArticle/${id}`, data )
    .then((res) => { return res.status; })
    .catch((err) => { return err.response.status;})
}

const postImage = (fd, header) => {
    httpService.post(baseURL + `upload-image`, fd , header)
    .then((res) => { return res.status; })
    .catch((err) => { return err.response.status;})
}
const postProfilePhoto = (imageName, userId) => {
    httpService.post(baseURL + `postuserphoto/${imageName}/${userId}`)
}

const postFollow = (followerId, followingId) =>{
    httpService.put(baseURL + `follow`, {
        "follower": followerId,
        "toFollow": followingId,
        "toUnFollow": 0
    } ).then((res) => { console.log(res); });
}

const postUnFollow = (followerId, followingId) =>{
    httpService.put(baseURL + `unFollow`, {
        "follower": followerId,
        "toFollow": 0,
        "toUnFollow": followingId,
    } ).then((res) => { console.log(res); });
}

const postLike = (articleId,userId) =>{
    httpService.put(baseURL + `like/${articleId}/user/${userId}`)
    .then((res) => { console.log(res); });
}
const postUnlike = (articleId,userId) =>{
    httpService.put(baseURL + `unlike/${articleId}/user/${userId}`)
    .then((res) => { console.log(res); });
}

const postReadCountIncrement = (userId) =>{
    httpService.put( baseURL + `readCount/${userId}`)
    .then((res) => { console.log(res); })
    .catch((err) => {console.log(err)});
}
// get Urls
const getThumbUrl = (imageName) => baseURL + "uploads/" + imageName;
const getProfileUrl = (authorId) => `/profile/${authorId}`;
const getAuthorName = (authorId) => "Anonymous";

const getArticleCards = async () =>{
    const res = await httpService.get(baseURL + `/articleMeta`);
    return res.data;
};
const getArticleCardsByAuthorId = async (id) =>{
    const res = await httpService.get(baseURL + `/articleMetaByAuthor/${id}`);
    return res.data;
};
const getArticleMetaById = async (id) =>{
    const res = await httpService.get(baseURL + `/articleMeta/${id}`);
    return res.data[0];
}; 
const getArticle = async (articleId) =>{
    const res = await httpService.get(baseURL + `/article/${articleId}`);
    return res.data[0];
}

const getPerformers = async () =>{
    const res = await httpService.get(baseURL + `/topUsers`);
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
    getAuthorName,

    saveUsers,
    postArticle,
    postImage,
    postFollow,
    postUnFollow,
    postLike,
    postUnlike,
    postReadCountIncrement,
    postProfilePhoto,
}

