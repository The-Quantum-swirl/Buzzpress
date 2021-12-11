package com.buzzpress.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.exception.BadRequestException;
import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.exception.UserNotFoundException;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;

@Service
public class IUserServiceImpl implements IUserService {

    @Autowired
    UserDataRepository userDataRepository;

    @Override
    public Users_ getUserDetails(String userId) throws UserNotFoundException {
        Users_ userObj = userDataRepository.findByUserId(userId);
        if (userObj == null) throw new UserNotFoundException("No user found with id: "+ userId);
        
        // System.out.println(userObj.getName());
        return userObj;
    }

    @Override
    public void saveUserDetails(Users_ details) throws DuplicateUserException {
        if (userDataRepository.findByUserName(details.getUserEmail()).size() != 0) {
            throw new DuplicateUserException("Please use unique UserName");
        }
        details.setUserJoinDate(LocalDate.now());
        userDataRepository.save(details);

    }

    @Override
    public List<Users_> showAllUsers() {
        return userDataRepository.findAll();
    }

    @Override
    public String getUsernameFromUserId(String userId) throws UserNotFoundException {
        Users_ user = userDataRepository.findByUserId(userId);
        if (user == null) throw new UserNotFoundException("No user found with user id: "+ userId);
        
        // System.out.println(user);
        return user.getName();

    }

    @Override
    public List<String> getFollowers(String userId) throws NotFoundException, UserNotFoundException {
    	Users_ user = userDataRepository.findByUserId(userId);
        if (user == null) throw new UserNotFoundException("No user found with user id: "+ userId);
        
        HashSet<String> followers = user.getFollowers();
        List<String> followersList = new ArrayList<>(followers);
        return followersList;
    }

    @Override
    public List<String> getFollowing(String userId) throws NotFoundException, UserNotFoundException {
    	Users_ user = userDataRepository.findByUserId(userId);
        if (user == null) throw new UserNotFoundException("No user found with user id: "+ userId);
        
        HashSet<String> following = user.getFollowing();
        List<String> followingList = new ArrayList<>(following);
        return followingList;
    }

    @Override
    public void FollowUser(String follower, String toFollow) throws NotFoundException {
        Users_ UserFollowing = null;
        Users_ UserBeingFollowed = null;

        UserFollowing = userDataRepository.findByUserId(follower);

        if (UserFollowing == null)
            throw new NotFoundException("not found follower");
        UserBeingFollowed = userDataRepository.findByUserId(toFollow);
        // System.out.println(UserBeingFollowed);
        if (UserBeingFollowed == null)
            throw new NotFoundException("not found toFollow");
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
    public void UnFollowUser(String follower, String toUnFollow) throws UserNotFoundException {
        Users_ UserFollowing = userDataRepository.findByUserId(follower);
        Users_ UserBeingUnFollowed = userDataRepository.findByUserId(toUnFollow);
        
        if (UserFollowing == null || UserBeingUnFollowed == null) {
        	throw new UserNotFoundException("User not found with follower, toUnfollow id: "+follower+", "+toUnFollow);
        }
        
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
    public void deleteUser(String userId) throws NotFoundException, UserNotFoundException {
    	Users_ user = userDataRepository.findByUserId(userId);
        if (user == null) throw new UserNotFoundException("No user found with user id: "+ userId);
        
        userDataRepository.delete(user);
    }

    @Override
    public void deleteAllUsers() {
        userDataRepository.deleteAll();
    }

}
