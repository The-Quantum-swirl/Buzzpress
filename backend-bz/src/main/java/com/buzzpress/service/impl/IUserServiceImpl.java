package com.buzzpress.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;

@Service
public class IUserServiceImpl implements IUserService {

    @Autowired
    UserDataRepository userDataRepository;

    @Override
    public Users_ getUserDetails(Long userId) throws NotFoundException {
        Users_ userObj = null;
        try {
            userObj = userDataRepository.findByUserId(userId);
            if (userObj == null) {
                throw new NotFoundException("user not found");
            }
        } catch (Exception e) {
            throw e;
        }
        return userObj;
    }

    @Override
    public void saveUserDetails(Users_ details) throws DuplicateUserException {
        try {
            if (userDataRepository.findByUserEmail(details.getUserEmail()).size() != 0) {
                throw new DuplicateUserException("Please use unique Email");
            }
            userDataRepository.save(details);

        } catch (DuplicateUserException e) {
            throw e;

        } catch (Exception e) {
            throw e;
        }

    }

    @Override
    public List<Users_> showAllUsers() {
        return userDataRepository.findAll();
    }

    @Override
    public String getUsernameFromUserId(Long userId) throws NotFoundException {
        Users_ user = null;
        try {
            user = userDataRepository.findByUserId(userId);
            System.out.println(user);
            return user.getUserName();
        } catch (Exception e) {
            throw e;
        }

    }

    @Override
    public List<Long> getFollowers(long userId) throws NotFoundException {
        HashSet<Long> followers = userDataRepository.findByUserId(userId).getFollowers();
        List<Long> followersList = new ArrayList<>(followers);
        return followersList;
    }

    @Override
    public List<Long> getFollowing(long userId) throws NotFoundException {
        HashSet<Long> following = userDataRepository.findByUserId(userId).getFollowing();
        List<Long> followingList = new ArrayList<>(following);
        return followingList;
    }

    @Override
    public void FollowUser(Long follower, long toFollow) {
        Users_ UserFollowing = userDataRepository.findByUserId(follower);
        Users_ UserBeingFollowed = userDataRepository.findByUserId(toFollow);
        UserBeingFollowed.getFollowers().add(follower);
        UserFollowing.getFollowing().add(toFollow);
        userDataRepository.save(UserBeingFollowed);
        userDataRepository.save(UserFollowing);
    }

    @Override
    public void UnFollowUser(Long follower, long toUnFollow) {
        Users_ UserFollowing = userDataRepository.findByUserId(follower);
        Users_ UserBeingUnFollowed = userDataRepository.findByUserId(toUnFollow);
        UserBeingUnFollowed.getFollowers().remove(follower);
        UserFollowing.getFollowing().remove(toUnFollow);
        userDataRepository.save(UserBeingUnFollowed);
        userDataRepository.save(UserFollowing);
    }
}
