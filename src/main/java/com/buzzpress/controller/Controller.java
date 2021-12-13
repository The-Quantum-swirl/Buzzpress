package com.buzzpress.controller;

import java.util.List;

import javax.annotation.security.PermitAll;

import com.buzzpress.beans.UserStats;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.exception.UserNotFoundException;
import com.buzzpress.model.FollowBody;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.security.CurrentUser;
import com.buzzpress.security.UserPrincipal;
import com.buzzpress.service.impl.IUserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

//@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    IUserServiceImpl iUserServiceImpl;
    @Autowired
    UserStatsRepository userStatsRepository;

    @GetMapping(value = "/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public Users_ getUserDetails(@PathVariable String id) throws NotFoundException, UserNotFoundException {
        
        return iUserServiceImpl.getUserDetails(id);
    }
    
    @GetMapping(value = "/author")
    @PreAuthorize("hasRole('USER')")
    public Users_ getUserDetailsByToken(@CurrentUser UserPrincipal userPrincipal) throws NotFoundException, UserNotFoundException {
    	
    	return iUserServiceImpl.getUserDetails(userPrincipal.getUserId());
    }
    
    @GetMapping(value = "/compareuser/{userId}")
    @PreAuthorize("hasRole('USER')")
    public boolean compareUser(@CurrentUser UserPrincipal userPrincipal, @PathVariable String userId) throws NotFoundException {
    	return (userId.compareTo( userPrincipal.getUserId() ) == 0);
    }

    @PostMapping(value = "/saveuser")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseMessage> postMethodName(@RequestBody Users_ entity) throws DuplicateUserException {
        // System.out.println(entity);
        ResponseMessage rm = new ResponseMessage();

        rm.setMessage("Data Added");
        rm.setStatusCode(200);
        UserStats userStats = new UserStats(entity.getUserId());
        userStatsRepository.save(userStats);
        iUserServiceImpl.saveUserDetails(entity);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PermitAll
    @PostMapping(value = "/saveusers")
    public ResponseEntity<ResponseMessage> postMethodName(@RequestBody List<Users_> entity)
            throws DuplicateUserException {
        // System.out.println(entity);
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Data Added");
        rm.setStatusCode(200);
        // List<UserStats> newUsersStats = null;

        for (Users_ users_ : entity) {
            UserStats userStats = new UserStats(users_.getUserId());
            userStatsRepository.save(userStats);
            iUserServiceImpl.saveUserDetails(users_);
        }

        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @GetMapping(value = "/allUsers")
    @PreAuthorize("hasRole('USER')")
    public List<Users_> getAllUserDetails() {
        return iUserServiceImpl.showAllUsers();
    }

    @PutMapping(value = "/follow")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseMessage> Followuser(@RequestBody FollowBody followBody, @CurrentUser UserPrincipal userPrincipal) throws NotFoundException {
        followBody.setFollower(userPrincipal.getUserId());
        
    	// System.out.println("<-- Print follow body -->");
        // System.out.println(followBody);
        
        String follower = userPrincipal.getUserId();
        String toFollow = followBody.getToFollow();

        iUserServiceImpl.FollowUser(follower, toFollow);

        ResponseMessage rm = new ResponseMessage("Success", 200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PutMapping(value = "/unFollow")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseMessage> UnFollowuser(@RequestBody FollowBody followBody, @CurrentUser UserPrincipal userPrincipal) throws UserNotFoundException {
    	followBody.setFollower(userPrincipal.getUserId());
         
     	// System.out.println("<-- Print follow body -->");
        // System.out.println(followBody);
         
        String follower = userPrincipal.getUserId();  	
        String toUnFollow = followBody.getToUnFollow();
        
        iUserServiceImpl.UnFollowUser(follower, toUnFollow);
        ResponseMessage rm = new ResponseMessage("Success", 200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @DeleteMapping(value = "deleteUser/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseMessage> DeleteUser(@RequestParam String id) throws NotFoundException, UserNotFoundException {
        iUserServiceImpl.deleteUser(id);
        ResponseMessage rm = new ResponseMessage("Success", 200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @DeleteMapping(value = "deleteAllUsers")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseMessage> DeleteAllUsers() {
        iUserServiceImpl.deleteAllUsers();
        ResponseMessage rm = new ResponseMessage("Success", 200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PostMapping(value = "/postuserphoto/{profilePhotoUrl}")
    @PreAuthorize("hasRole('USER')")
    public void SetUserProfilePhoto(@PathVariable String profilePhotoUrl, @CurrentUser UserPrincipal userPrincipal) {
        iUserServiceImpl.postUserPhoto(profilePhotoUrl, userPrincipal.getUserId());
    }

}
