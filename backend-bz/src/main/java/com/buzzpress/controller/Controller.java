package com.buzzpress.controller;

import com.buzzpress.beans.Users_;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

@RestController
public class Controller {

    @Autowired
    IUserService IUserService;

    @GetMapping(value = "/user/{id}")
    public Users_ getUserDetails(@PathVariable("id") Long id) throws NotFoundException {
        System.out.println(id);
        return IUserService.getUserDetails(id);
    }

}
