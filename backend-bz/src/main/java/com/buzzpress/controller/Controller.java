package com.buzzpress.controller;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;

import com.buzzpress.beans.UserStats;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.model.FollowBody;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    IUserService iUserService;
    @Autowired
    UserStatsRepository userStatsRepository;

    @GetMapping(value = "/user/{id}")
    public Users_ getUserDetails(@PathVariable String id) throws NotFoundException {
        System.out.println(id);
        return iUserService.getUserDetails(id);
    }

    @PostMapping(value = "/saveuser")
    public ResponseEntity<ResponseMessage> postMethodName(@RequestBody Users_ entity) throws DuplicateUserException {
        System.out.println(entity);
        ResponseMessage rm = new ResponseMessage();

        rm.setMessage("Data Added");
        rm.setStatusCode(200);
        UserStats userStats = new UserStats(entity.getUserId());
        userStatsRepository.save(userStats);
        iUserService.saveUserDetails(entity);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PermitAll
    @PostMapping(value = "/saveusers")
    public ResponseEntity<ResponseMessage> postMethodName(@RequestBody List<Users_> entity)
            throws DuplicateUserException {
        System.out.println(entity);
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Data Added");
        rm.setStatusCode(200);
        // List<UserStats> newUsersStats = null;

        for (Users_ users_ : entity) {
            UserStats userStats = new UserStats(users_.getUserId());
            userStatsRepository.save(userStats);
            iUserService.saveUserDetails(users_);
        }

        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @GetMapping(value = "/allUsers")
    public List<Users_> getAllUserDetails() {

        return iUserService.showAllUsers();
    }

    @PutMapping(value = "/follow")
    public ResponseEntity<ResponseMessage> Followuser(@RequestBody FollowBody followBody) throws NotFoundException {
        System.out.println("Print follow bosdyy");
        System.out.println(followBody);
        String follower = followBody.getFollower();
        String toFollow = followBody.getToFollow();
        System.out.println(follower);

        iUserService.FollowUser(follower, toFollow);

        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Success");
        rm.setStatusCode(200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PutMapping(value = "/unFollow")
    public ResponseEntity<ResponseMessage> UnFollowuser(@RequestBody FollowBody followBody) {
        System.out.println(followBody);
        String follower = followBody.getFollower();
        String toUnFollow = followBody.getToUnFollow();
        iUserService.UnFollowUser(follower, toUnFollow);
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Success");
        rm.setStatusCode(200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @DeleteMapping(value = "deleteUser/{id}")
    public ResponseEntity<ResponseMessage> DeleteUser(@RequestParam String id) throws NotFoundException {
        iUserService.deleteUser(id);
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Success");
        rm.setStatusCode(200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @DeleteMapping(value = "deleteAllUsers")
    public ResponseEntity<ResponseMessage> DeleteAllUsers() {
        iUserService.deleteAllUsers();
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Success");
        rm.setStatusCode(200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PostMapping(value = "/postuserphoto/{profilePhotoUrl}/{authorId}")
    public void SetUserProfilePhoto(@PathVariable String profilePhotoUrl, @PathVariable String authorId) {
        iUserService.postUserPhoto(profilePhotoUrl, authorId);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ResponseMessage> handleDuplicateUserException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage(ex.getMessage());
        rm.setStatusCode(406);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseMessage> handleNotFoundException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage(ex.getMessage());
        rm.setStatusCode(404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }
}
