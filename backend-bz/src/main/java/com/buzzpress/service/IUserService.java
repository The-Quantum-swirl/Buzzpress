package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.exception.DuplicateUserException;

import javassist.NotFoundException;

public interface IUserService {

    public Users_ getUserDetails(String userId) throws NotFoundException;

    public String getUsernameFromUserId(String userId) throws NotFoundException;

    public void saveUserDetails(Users_ details) throws DuplicateUserException;

    public List<String> getFollowers(String userId) throws NotFoundException;

    public List<String> getFollowing(String userId) throws NotFoundException;

    public List<Users_> showAllUsers();

    public void FollowUser(String follower, String toFollow) throws NotFoundException;

    public void UnFollowUser(String follower, String toUnFollow);

    public void postUserPhoto(String profilePhotoUrl, String authorId);

    public void deleteUser(String id) throws NotFoundException;

    public void deleteAllUsers();
}
