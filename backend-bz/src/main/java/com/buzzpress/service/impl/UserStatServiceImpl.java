package com.buzzpress.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.beans.UserStats;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.dao.UserStatsRepository;
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

    @Override
    public UserStats getUserStats(String id) {
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
        List<ArticleMeta> meta = articleMetaDataRepository.findTop10ByOrderByViewsDesc();

        meta.forEach(s -> {
            TopUsers topuser = new TopUsers();
            topuser.setAuthorID(s.getAuthorId());
            topuser.setName(s.getAuthorName());
            topuser.setPoints(s.getViews() * 10);
            top.add(topuser);
        });
        return top;
    }

}
