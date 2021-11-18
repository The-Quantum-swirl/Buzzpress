package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.model.TopUsers;

public interface IUserStatsService {
    public UserStats getUserStats(long id);

    public List<UserStats> findAllStats();

    public void incrementAuthored(Long userID);

    public List<TopUsers> getTopUsers();

	public void updateStats(Long userId);
}