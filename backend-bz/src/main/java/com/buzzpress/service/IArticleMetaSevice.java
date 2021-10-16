package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;

public interface IArticleMetaSevice {

    public List<ArticleMeta> fetchAllArticleMetadata();

    public ArticleMeta fetchArticleMetadata(long articleId);
}
