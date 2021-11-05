package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.exception.DuplicateUserException;

import javassist.NotFoundException;

public interface IUserService {

    public Users_ getUserDetails(Long userId) throws NotFoundException;

    public String getUsernameFromUserId(Long userId) throws NotFoundException;

    public void saveUserDetails(Users_ details) throws DuplicateUserException;

    public List<Long> getFollowers(long userId) throws NotFoundException;

    public List<Long> getFollowing(long userId) throws NotFoundException;

    public List<Users_> showAllUsers();

    public void FollowUser(Long follower, long toFollow);

    public void UnFollowUser(Long follower, long toUnFollow);
}
