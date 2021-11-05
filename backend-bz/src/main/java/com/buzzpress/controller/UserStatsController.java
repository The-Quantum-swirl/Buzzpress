package com.buzzpress.controller;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.service.impl.UserStatServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class UserStatsController {

    @Autowired
    UserStatServiceImpl userStatServiceImpl;

    @GetMapping(value = "/AllUserStats")
    public List<UserStats> getAllUsersStats() {

        return userStatServiceImpl.findAllStats();
    }

    @GetMapping(value = "/UserStats/{id}")
    public UserStats getUserStats(@PathVariable Long id) {

        return userStatServiceImpl.getUserStats(id);
    }
}
