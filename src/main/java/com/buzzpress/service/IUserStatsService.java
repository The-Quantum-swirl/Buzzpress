package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.model.TopUsers;

public interface IUserStatsService {
    public UserStats getUserStats(String id);

    public List<UserStats> findAllStats();

    public void incrementAuthored(String userId);

    public List<TopUsers> getTopUsers();

    public void updateStats(String userId);
}