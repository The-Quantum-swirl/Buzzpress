package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.service.IArticleMetaSevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IArticleMetaServiceImpl implements IArticleMetaSevice {
    @Autowired
    ArticleMetaDataRepository articleMetaDataRepository;

    @Override
    public List<ArticleMeta> fetchAllArticleMetadata() {
        List<ArticleMeta> ArticleMeta = articleMetaDataRepository.findAll();
        return ArticleMeta;
    }

    @Override
    public List<ArticleMeta> fetchArticleMetaByArticleId(Long articleId) {
        List<ArticleMeta> articleMeta = articleMetaDataRepository.findAllByArticleId(articleId);
        return articleMeta;
    }

    @Override
    public List<ArticleMeta> fetchArticleMetaByAuthorId(Long authorId) {
        List<ArticleMeta> articleMeta = articleMetaDataRepository.findByAuthorId(authorId);
        return articleMeta;
    }

    @Override
    public List<ArticleMeta> fetchArticleMetaByTopic(String topic) {
        List<ArticleMeta> articleMeta = articleMetaDataRepository.findByTopic(topic);
        return articleMeta;
    }

    @Override
    public void saveMetaData(Long articleId, String author, Long authorId, String topic) {
        ArticleMeta metaData = new ArticleMeta(articleId, author, authorId, topic);
        articleMetaDataRepository.save(metaData);
    }

}
