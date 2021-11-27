package com.buzzpress.service.impl;

import java.util.HashSet;
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
    public void handleLike(String operation, Long id, String userId) throws NotFoundException {

        List<ArticleMeta> articleMetaList = articleMetaDataRepository.findAllByArticleId(id);
        if (articleMetaList == null)
            throw new NotFoundException("No Article found");

        // found the article here
        ArticleMeta articleMeta = articleMetaList.get(0);
        // hashset of all the people who liked
        HashSet<String> likers = articleMeta.getLikerUserId();

        if (likers == null)
            likers = new HashSet<String>();

        if (operation == "+") {
            System.out.println("Plus");
            // already like exists here for this user
            if (likers.contains(userId))
                return;

            // added like
            likers.add(userId);
            articleMetaDataRepository.incrementLike(id);

        } else if (operation == "-") {
            System.out.println("minus");
            // can't remove like if liker doesnot already exists
            if (likers.contains(userId) == false)
                return;

            likers.remove(userId);
            articleMetaDataRepository.decrementLike(id);
        }

        articleMeta.setLikerUserId(likers);
        articleMetaDataRepository.save(articleMeta);

    }

    public void view(Long id) {
        articleMetaDataRepository.view(id);
    }
}
