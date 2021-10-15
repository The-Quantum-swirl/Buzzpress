package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.Article;
import com.buzzpress.dao.ArticleDataRepository;
import com.buzzpress.service.IArticleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IArticleServiceImpl implements IArticleService {

    @Autowired
    ArticleDataRepository articleDataRepository;

    @Override
    public void saveArticle(Article art) {
        articleDataRepository.save(art);

    }

    @Override
    public List<Article> displayAllArticles() {
        List<Article> allArticles = articleDataRepository.findAll();
        return allArticles;
    }

}