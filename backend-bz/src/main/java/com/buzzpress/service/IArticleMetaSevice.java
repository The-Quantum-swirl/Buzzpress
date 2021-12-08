package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Article;
import com.buzzpress.beans.ArticleMeta;

import javassist.NotFoundException;

public interface IArticleMetaSevice {

    public List<ArticleMeta> fetchAllArticleMetadata();

    public List<ArticleMeta> fetchArticleMetaByArticleId(Long articleId);

    public List<ArticleMeta> fetchArticleMetaByAuthorId(String userId) throws NotFoundException;

    public void saveMetaData(Article article, String author);

    public void handleLike(String operation, Long id, String userId) throws NotFoundException;

    public void view(Long id);
}
