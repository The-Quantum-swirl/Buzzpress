package com.buzzpress.controller;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.model.TopUsers;
import com.buzzpress.security.CurrentUser;
import com.buzzpress.security.UserPrincipal;
import com.buzzpress.service.IUserStatsService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
public class UserStatsController {

    @Autowired
    IUserStatsService iUserStatsService;

    @Autowired
    UserStatsRepository userStatsRepository;

    private final UserDataRepository UserDataRepository;

    @GetMapping(value = "/allUserStats")
    @PreAuthorize("hasRole('USER')")
    public List<UserStats> getAllUsersStats() {

        return iUserStatsService.findAllStats();
    }

    @GetMapping(value = "/userStats")
    @PreAuthorize("hasRole('USER')")
    public UserStats getUserStats(@CurrentUser UserPrincipal userPrincipal) {
    	String id = userPrincipal.getUserId();
    	// System.out.println(iUserStatsService.getUserStats(id));
        // updating user stats for the day
        iUserStatsService.updateStats(id);

        return iUserStatsService.getUserStats(id);
    }

    @PutMapping(value = "/setArticleTarget/{target}")
    @PreAuthorize("hasRole('USER')")
    public Integer setArticleTarget(@CurrentUser UserPrincipal userPrincipal, @PathVariable Integer target) {
    	String userId = userPrincipal.getUserId();
        // updating user stats for the day
        iUserStatsService.updateStats(userId);

        UserStats userS = iUserStatsService.getUserStats(userId);
        userS.setArticleTargetRead(target);
        userStatsRepository.save(userS);
        return target;
    }

    @PutMapping(value = "/readCount")
    @PreAuthorize("hasRole('USER')")
    public void incrementReadCount(@CurrentUser UserPrincipal userPrincipal) {
    	String authorId = userPrincipal.getUserId();
    	// updating user stats for the day
        iUserStatsService.updateStats(authorId);

        UserStats userS = iUserStatsService.getUserStats(authorId);
        Integer articleRead = userS.getArticleRead();
        userS.setArticleRead(articleRead + 1);
        userStatsRepository.save(userS);
    }

    @GetMapping(value = "/topUsers")
//     @PreAuthorize("hasRole('USER')")
    public List<TopUsers> getTopUsers() {
        return iUserStatsService.getTopUsers();
    }
}
