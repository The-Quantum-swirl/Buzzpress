package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Article;
import com.buzzpress.beans.ArticleMeta;

public interface IArticleService {

    public void saveArticle(Article art);

    public List<Article> displayAllArticles();

    public List<ArticleMeta> fetchAllArticleMetadata();

    public ArticleMeta fetchArticleMetadata(long articleId);
}
