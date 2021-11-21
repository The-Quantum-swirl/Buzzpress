import { LRM_API } from "../constants/API";
import { authorId } from "../constants/UserData";
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
    .then((res) => { return res.status; })
    .catch((err) => { return err.response.status;})
}

const postImage = (fd, header) => {
    httpService.post( LRM_API + `upload-image`, fd , header)
    .then((res) => { return res.status; })
    .catch((err) => { return err.response.status;})
}
const postProfilePhoto = (imageName, userId) => {
    httpService.post( LRM_API + `postuserphoto/${imageName}/${userId}`)
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

const postLike = (articleId,userId) =>{
    httpService.put( LRM_API + `like/${articleId}/user/${userId}`)
    .then((res) => { console.log(res); });
}
const postUnlike = (articleId,userId) =>{
    httpService.put( LRM_API + `unlike/${articleId}/user/${userId}`)
    .then((res) => { console.log(res); });
}

const postReadCountIncrement = (userId) =>{
    httpService.put( LRM_API + `readCount/${userId}`)
    .then((res) => { console.log(res); })
    .catch((err) => {console.log(err)});
}
// get Urls
const getThumbUrl = (imageName) => LRM_API + "uploads/" + imageName;
const getProfileUrl = (authorId) => `/profile/${authorId}`;
const getAuthorName = (authorId) => "Anonymous";

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

const getPerformers = async () =>{
    const res = await httpService.get(LRM_API + `/topUsers`);
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

