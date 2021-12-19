package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Article;

import javassist.NotFoundException;

public interface IArticleService {

    public void saveArticle(Article art);

    public List<Article> displayAllArticles();

    public List<Article> fetchArticleByArticleId(Long articleId);

    public List<Article> fetchArticleByAuthorId(long authorId) throws NotFoundException;
    public void deleteArticleById(Long articleId) throws NotFoundException;

}
