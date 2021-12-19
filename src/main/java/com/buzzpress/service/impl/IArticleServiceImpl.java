package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.Article;
import com.buzzpress.dao.ArticleDataRepository;
import com.buzzpress.service.IArticleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;

@Service
public class IArticleServiceImpl implements IArticleService {

    @Autowired
    ArticleDataRepository articleDataRepository;

    @Override
    public void saveArticle(Article art) {
        articleDataRepository.saveAndFlush(art);

    }

    @Override
    public List<Article> displayAllArticles() {
        List<Article> allArticles = articleDataRepository.findAll();
        return allArticles;
    }

    @Override
    public List<Article> fetchArticleByArticleId(Long articleId) {
        List<Article> allArticles = articleDataRepository.findByArticleId(articleId);
        return allArticles;
    }

    @Override
    public List<Article> fetchArticleByAuthorId(long authorId) throws NotFoundException {
        List<Article> allArticles = null;
        try {
            allArticles = articleDataRepository.findByAuthorId(authorId);
        } catch (Exception e) {
            throw e;
        }
        return allArticles;
    }

    @Override
    public void deleteArticleById(Long articleId) throws NotFoundException {
        articleDataRepository.deleteById(articleId);
    }

}