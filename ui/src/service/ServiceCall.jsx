import { LRM_API } from "../constants/API";
import httpService from './Httpservice';

const getAllUsers = async () => {
    const res = await httpService.get(LRM_API + "api/allUsers");
    return res.data;
};
function saveUsers(params) {
    console.log("Save User Api called");
    console.log(params);
    httpService.post(LRM_API + "storeLoanData", params).then((res) => {
        console.log(res);
    });
}
const getUser = async (id) => {
    const res = await httpService.get( LRM_API + `user/${id}`);
    return res.data;
};
const getUserStats = async (id) =>{
    const res = await httpService.get( LRM_API + `userStats/${id}`);
    return res.data;
};

const postArticle = (id, data) => {
    httpService.post( LRM_API + `saveArticle/${id}`, data )
    .then((res) => { console.log(res); });
}

const postImage = (fd, header) => {
    httpService.post( LRM_API + `upload-image`, fd , header)
    .then((res) => { console.log(res); });
}

const postFollow = (followerId, followingId) =>{
    httpService.put( LRM_API + `follow`, {
        "follower": followerId,
        "toFollow": followingId,
        "toUnFollow": 0
    } ).then((res) => { console.log(res); });
}

const postUnFollow = (followerId, followingId) =>{
    httpService.put( LRM_API + `unFollow`, {
        "follower": followerId,
        "toFollow": 0,
        "toUnFollow": followingId,
    } ).then((res) => { console.log(res); });
}
// ger thumb url from image name
const getThumbUrl = (imageName) => LRM_API + "uploads/" + imageName;

const getArticleCards = async () =>{
    const res = await httpService.get(LRM_API + `/articleMeta`);
    return res.data;
};
const getArticleCardsByAuthorId = async (id) =>{
    const res = await httpService.get(LRM_API + `/articleMetaByAuthor/${id}`);
    return res.data;
};
const getArticleMetaById = async (id) =>{
    const res = await httpService.get(LRM_API + `/articleMeta/${id}`);
    return res.data[0];
}; 
const getArticle = async (articleId) =>{
    const res = await httpService.get(LRM_API + `/article/${articleId}`);
    return res.data[0];
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
    getArticle,

    saveUsers,
    postArticle,
    postImage,
    postFollow,
    postUnFollow,
}

