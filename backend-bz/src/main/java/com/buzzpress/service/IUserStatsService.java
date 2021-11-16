package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.UserStats;

public interface IUserStatsService {
    public UserStats getUserStats(long id);

    public List<UserStats> findAllStats();

    public void incrementAuthored(Long userID);
}