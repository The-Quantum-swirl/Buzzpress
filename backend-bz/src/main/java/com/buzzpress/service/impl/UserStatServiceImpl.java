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
        // userStatsRepository.findByUserId();

        return new UserStats();
    }

    @Override
    public List<UserStats> findAllStats() {
        return userStatsRepository.findAll();

    }

}
