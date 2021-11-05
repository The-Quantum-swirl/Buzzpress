import React from 'react'
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
    const res = await httpService.get(
        LRM_API + `api/user/${id}`
    );
    return res.data;
};

export default {
    saveUsers,
    getAllUsers,
    getUser

}

