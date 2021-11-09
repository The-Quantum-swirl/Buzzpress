package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.Article;
import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.service.IArticleMetaSevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;

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
    public List<ArticleMeta> fetchArticleMetaByAuthorId(Long authorId) throws NotFoundException {
        List<ArticleMeta> articleMeta = articleMetaDataRepository.findByAuthorId(authorId);
        if (articleMeta.size() == 0) {
            throw new NotFoundException("Author not found");
        }
        return articleMeta;
    }

    @Override
    public void saveMetaData(Article article, String author) {

        ArticleMeta metaData = new ArticleMeta(article, author);
        articleMetaDataRepository.save(metaData);
    }

    @Override
    public void handleLike(String operation, Long id) {
        switch (operation) {
        case "+":
            System.out.println("PLus");
            articleMetaDataRepository.incrementLike(id);
            break;
        case "-":
            System.out.println("minus");
            articleMetaDataRepository.decrementLike(id);
            break;
        default:
            break;
        }
    }

    public void view(Long id) {
        articleMetaDataRepository.view(id);
    }
}
