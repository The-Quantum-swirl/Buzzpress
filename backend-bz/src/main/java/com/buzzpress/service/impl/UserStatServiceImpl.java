package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.service.IUserStatsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStatServiceImpl implements IUserStatsService {

    @Autowired
    UserStatsRepository userStatsRepository;

    @Override
    public UserStats getUserStats(long id) {
        return userStatsRepository.findByUserId(id);

        // return new UserStats();
    }

    @Override
    public List<UserStats> findAllStats() {
        return userStatsRepository.findAll();

    }

    @Override
    public void incrementAuthored(Long userId) {
        UserStats userS = userStatsRepository.getById(userId);
        Integer i = userS.getArticleAuthored();
        userS.setArticleAuthored(i + 1);
        userStatsRepository.save(userS);
    }

}
