package com.buzzpress.controller;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IUserService;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import javassist.NotFoundException;

@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    IUserService iUserService;
    @Autowired
    UserStatsRepository userStatsRepository;

    @GetMapping(value = "/user/{id}")
    public Users_ getUserDetails(@PathVariable("id") Long id) throws NotFoundException {
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

    @GetMapping(value = "/allUsers")
    public List<Users_> getAllUserDetails() {

        return iUserService.showAllUsers();
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
