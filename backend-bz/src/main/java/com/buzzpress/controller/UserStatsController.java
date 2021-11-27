package com.buzzpress.controller;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.model.TopUsers;
import com.buzzpress.service.IUserStatsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class UserStatsController {

    @Autowired
    IUserStatsService iUserStatsService;

    @Autowired
    UserStatsRepository userStatsRepository;

    @GetMapping(value = "/allUserStats")
    public List<UserStats> getAllUsersStats() {

        return iUserStatsService.findAllStats();
    }

    @GetMapping(value = "/userStats/{id}")
    public UserStats getUserStats(@PathVariable String id) {
        // updating user stats for the day
        iUserStatsService.updateStats(id);

        return iUserStatsService.getUserStats(id);
    }

    @PutMapping(value = "/setArticleTarget/{id}/{target}")
    public Integer setArticleTarget(@PathVariable String id, @PathVariable Integer target) {
        // updating user stats for the day
        iUserStatsService.updateStats(id);

        UserStats userS = iUserStatsService.getUserStats(id);
        userS.setArticleTargetRead(target);
        userStatsRepository.save(userS);
        return target;
    }

    @PutMapping(value = "/readCount/{authorId}")
    public void incrementReadCount(@PathVariable String authorId) {
        // updating user stats for the day
        iUserStatsService.updateStats(authorId);

        UserStats userS = iUserStatsService.getUserStats(authorId);
        Integer articleRead = userS.getArticleRead();
        userS.setArticleRead(articleRead + 1);
        userStatsRepository.save(userS);
    }

    @GetMapping(value = "/topUsers")
    public List<TopUsers> getTopUsers() {
        return iUserStatsService.getTopUsers();
    }
}