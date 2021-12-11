package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.exception.UserNotFoundException;

import javassist.NotFoundException;

public interface IUserService {

    public Users_ getUserDetails(String userId) throws UserNotFoundException;

    public String getUsernameFromUserId(String userId) throws UserNotFoundException;

    public void saveUserDetails(Users_ details) throws DuplicateUserException;

    public List<String> getFollowers(String userId) throws NotFoundException, UserNotFoundException;

    public List<String> getFollowing(String userId) throws NotFoundException, UserNotFoundException;

    public List<Users_> showAllUsers();

    public void FollowUser(String follower, String toFollow) throws NotFoundException;

    public void UnFollowUser(String follower, String toUnFollow) throws UserNotFoundException;

    public void postUserPhoto(String profilePhotoUrl, String authorId);

    public void deleteUser(String id) throws NotFoundException, UserNotFoundException;

    public void deleteAllUsers();
}
