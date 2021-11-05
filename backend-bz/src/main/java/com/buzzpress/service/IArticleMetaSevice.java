package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Article;
import com.buzzpress.beans.ArticleMeta;

public interface IArticleMetaSevice {

    public List<ArticleMeta> fetchAllArticleMetadata();

    public List<ArticleMeta> fetchArticleMetaByArticleId(Long articleId);

    public List<ArticleMeta> fetchArticleMetaByAuthorId(Long authorId);

    public void saveMetaData(Article article, String author);
}
