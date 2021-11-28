package com.buzzpress.service.impl;

import java.time.LocalDate;
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
    public Users_ getUserDetails(String userId) throws NotFoundException {
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
            if (userDataRepository.findByUserName(details.getUserEmail()).size() != 0) {
                throw new DuplicateUserException("Please use unique UserName");
            }
            details.setUserJoinDate(LocalDate.now());
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
    public String getUsernameFromUserId(String userId) throws NotFoundException {
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
    public List<String> getFollowers(String userId) throws NotFoundException {
        HashSet<String> followers = userDataRepository.findByUserId(userId).getFollowers();
        List<String> followersList = new ArrayList<>(followers);
        return followersList;
    }

    @Override
    public List<String> getFollowing(String userId) throws NotFoundException {
        HashSet<String> following = userDataRepository.findByUserId(userId).getFollowing();
        List<String> followingList = new ArrayList<>(following);
        return followingList;
    }

    @Override
    public void FollowUser(String follower, String toFollow) throws NotFoundException {
        Users_ UserFollowing = null;
        Users_ UserBeingFollowed = null;

        UserFollowing = userDataRepository.findByUserId(follower);

        if (UserFollowing == null)
            throw new NotFoundException("not found user1");
        UserBeingFollowed = userDataRepository.findByUserId(toFollow);
        System.out.println(UserBeingFollowed);
        if (UserBeingFollowed == null)
            throw new NotFoundException("not found user2");
        HashSet<String> followers = UserBeingFollowed.getFollowers();
        if (followers == null) {
            followers = new HashSet<>();
        }
        followers.add(follower);
        HashSet<String> following = UserFollowing.getFollowing();
        if (following == null) {
            following = new HashSet<>();
        }
        following.add(toFollow);
        UserBeingFollowed.setFollowers(followers);
        UserFollowing.setFollowing(following);
        userDataRepository.save(UserBeingFollowed);
        userDataRepository.save(UserFollowing);
    }

    @Override
    public void UnFollowUser(String follower, String toUnFollow) {
        Users_ UserFollowing = userDataRepository.findByUserId(follower);
        Users_ UserBeingUnFollowed = userDataRepository.findByUserId(toUnFollow);
        UserBeingUnFollowed.getFollowers().remove(follower);
        UserFollowing.getFollowing().remove(toUnFollow);
        userDataRepository.save(UserBeingUnFollowed);
        userDataRepository.save(UserFollowing);
    }

    public void postUserPhoto(String profilePhotoUrl, String authorId) {
        Users_ user = userDataRepository.getById(authorId);
        user.setProfilePhotoUrl(profilePhotoUrl);
        userDataRepository.save(user);
    }

    @Override
    public void deleteUser(String id) throws NotFoundException {
        userDataRepository.delete(userDataRepository.findByUserId(id));
    }

    @Override
    public void deleteAllUsers() {
        userDataRepository.deleteAll();
    }

}
