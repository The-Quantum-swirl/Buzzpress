package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;

public interface IArticleMetaSevice {

    public List<ArticleMeta> fetchAllArticleMetadata();

    public List<ArticleMeta> fetchArticleMetaByArticleId(Long articleId);

    public List<ArticleMeta> fetchArticleMetaByAuthorId(Long authorId);

    public List<ArticleMeta> fetchArticleMetaByTopic(String topic);

    public void saveMetaData(Long articleId, String author, Long authorId, String topic);
}
