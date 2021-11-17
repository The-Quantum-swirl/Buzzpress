package com.buzzpress.controller;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.service.impl.UserStatServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class UserStatsController {

    @Autowired
    UserStatServiceImpl userStatServiceImpl;

    @Autowired
    UserStatsRepository userStatsRepository;

    @GetMapping(value = "/allUserStats")
    public List<UserStats> getAllUsersStats() {

        return userStatServiceImpl.findAllStats();
    }

    @GetMapping(value = "/userStats/{id}")
    public UserStats getUserStats(@PathVariable Long id) {

        return userStatServiceImpl.getUserStats(id);
    }

    @PutMapping(value = "/setArticleTarget/{id}/{target}")
    public Integer setArticleTarget(@PathVariable Long id, @PathVariable Integer target) {
        UserStats userS = userStatServiceImpl.getUserStats(id);
        userS.setArticleTargetRead(target);
        userStatsRepository.save(userS);
        return target;
    }

    @PutMapping(value = "/readCount/{authorId}")
    public void incrementReadCount(@PathVariable Long authorId) {
        UserStats userS = userStatServiceImpl.getUserStats(authorId);
        Integer articleRead = userS.getArticleRead();
        userS.setArticleRead(articleRead + 1);
        userStatsRepository.save(userS);
    }
}