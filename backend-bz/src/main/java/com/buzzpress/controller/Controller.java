package com.buzzpress.controller;

import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import javassist.NotFoundException;

@CrossOrigin(origins = "*")
@RestController
public class Controller {

    @Autowired
    IUserService iUserService;

    @GetMapping(value = "/user/{id}")
    public Users_ getUserDetails(@PathVariable("id") Long id) throws NotFoundException {
        System.out.println(id);
        return iUserService.getUserDetails(id);
    }

    @PostMapping(value = "/saveuser")
    public ResponseEntity<ResponseMessage> postMethodName(@RequestBody Users_ entity) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Data Added");
        rm.setStatusCode(200);
        iUserService.saveUserDetails(entity);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @GetMapping(value = "/allUsers")
    public List<Users_> getAllUserDetails() {

        return iUserService.showAllUsers();
    }
}
