package com.buzzpress.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.buzzpress.beans.UserStats;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.exception.BadRequestException;
import com.buzzpress.model.TopUsers;
import com.buzzpress.service.IArticleMetaSevice;
import com.buzzpress.service.IUserStatsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserStatServiceImpl implements IUserStatsService {

    @Autowired
    UserStatsRepository userStatsRepository;
    @Autowired
    UserDataRepository userDataRepository;
    @Autowired
    ArticleMetaDataRepository articleMetaDataRepository;
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;

    public UserStats setNewRecord(String userId) {
    	// default values for user stats
    	// stats id = 0, userid, read = 0, authored = 0, target = 0,
    	// authored article =[ ], lastupdated = today's date
    	UserStats userStats = new UserStats(0, userId, 0, 0, 10, new HashSet<Long>(), LocalDate.now());
    	userStatsRepository.save(userStats);
    	
    	return userStats;
    }
    @Override
    public UserStats getUserStats(String id) throws BadRequestException {
    	// if entry does not exist in db make a default one
    	if (userStatsRepository.findByUserId(id) == null) {
    		// System.out.println("not found user with id: "+id);
    		return setNewRecord(id);
    	}
    	
        return userStatsRepository.findByUserId(id);
    }

    @Override
    public List<UserStats> findAllStats() {
    	return userStatsRepository.findAll();
    }

    @Override
    public void updateStats(String userId) {
        UserStats userStat = userStatsRepository.findByUserId(userId);
        if (userStat.getLastUpdatedDate() == null || LocalDate.now().isAfter(userStat.getLastUpdatedDate())) {
            userStat.setLastUpdatedDate(LocalDate.now());
            userStat.setArticleRead(0);
            userStat.setArticleAuthored(0);
            userStatsRepository.save(userStat);
        }
    }

    @Override
    public void incrementAuthored(String userId) {
        UserStats userS = userStatsRepository.findByUserId(userId);
        Integer i = userS.getArticleAuthored();
        userS.setArticleAuthored(i + 1);
        userStatsRepository.save(userS);
    }

    @Override
    public List<TopUsers> getTopUsers() {
         List<TopUsers> top = new ArrayList<TopUsers>();
        List<Object> meta =  articleMetaDataRepository.top10();
        for (int i=0; i<meta.size();i++){
            Object[] obj= (Object[]) meta.get(i);
            TopUsers topuser = new TopUsers();
            topuser.setAuthorId(String.valueOf(obj[2]));
            topuser.setAuthorName(String.valueOf(obj[0]));
            topuser.setPoints(Long.parseLong(String.valueOf(obj[1]))*10);
            top.add(topuser);
        }
        return top;
    }
}
