package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Article;

public interface IArticleService {

    public void saveArticle(Article art);

    public List<Article> displayAllArticles();

}
