package com.buzzpress.controller;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.model.LikeBody;
import com.buzzpress.service.IArticleMetaSevice;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

@CrossOrigin(origins = "*")
@RestController
public class MetaController {
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;
    @Autowired
    ArticleMetaDataRepository articleMetaDataRepository;

    @GetMapping(value = "/articleMeta")
    public List<ArticleMeta> getAllArticlesMeta() {

        return iArticleMetaSevice.fetchAllArticleMetadata();
    }

    @GetMapping(value = "/articleMetav2")
    public List<Object[]> getAllArticlesMetav2() {
        return articleMetaDataRepository.listAllArticleMeta();
    }

    @GetMapping(value = "/articleMeta/{id}")
    public List<ArticleMeta> getArticleMetabyId(@PathVariable Long id) {
        return iArticleMetaSevice.fetchArticleMetaByArticleId(id);
    }

    @GetMapping(value = "/articleMetaByAuthor/{authorId}")
    public List<ArticleMeta> getartic(@PathVariable Long authorId) throws NotFoundException {
        return iArticleMetaSevice.fetchArticleMetaByAuthorId(authorId);
    }

    @PutMapping(value = "/like/{articleId}/user/{userId}")
    public void like(@PathVariable Long articleId, @PathVariable Long userId) throws NotFoundException {
        iArticleMetaSevice.handleLike("+", articleId, userId);
    }

    @PutMapping(value = "/unlike/{articleId}/user/{userId}")
    public void unlike(@PathVariable Long articleId, @PathVariable Long userId) throws NotFoundException {
        iArticleMetaSevice.handleLike("-", articleId, userId);
    }

}