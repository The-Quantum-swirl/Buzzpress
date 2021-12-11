package com.buzzpress.controller;

import java.util.List;
import java.util.HashSet;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.security.CurrentUser;
import com.buzzpress.security.UserPrincipal;
//import com.buzzpress.model.LikeBody;
import com.buzzpress.service.IArticleMetaSevice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

//@CrossOrigin(origins = "*")
@RestController
public class MetaController {
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;
    @Autowired
    ArticleMetaDataRepository articleMetaDataRepository;

    @GetMapping(value = "/articleMeta")
    @PreAuthorize("hasRole('USER')")
    public List<ArticleMeta> getAllArticlesMeta() {

        return iArticleMetaSevice.fetchAllArticleMetadata();
    }

    @GetMapping(value = "/articleMetav2")
    @PreAuthorize("hasRole('USER')")
    public List<Object[]> getAllArticlesMetav2() {
        return articleMetaDataRepository.listAllArticleMeta();
    }

    @GetMapping(value = "/articleMeta/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<ArticleMeta> getArticleMetabyId(@PathVariable Long id) {
        return iArticleMetaSevice.fetchArticleMetaByArticleId(id);
    }
    
    @GetMapping(value = "/hasLikedArticle/{id}")
    @PreAuthorize("hasRole('USER')")
    public boolean checkArticleMetaLikebyId(@PathVariable Long id, @CurrentUser UserPrincipal userPrincipal) {
        HashSet<String> likers = iArticleMetaSevice.fetchArticleMetaByArticleId(id).get(0).getLikerUserId();
        return likers.contains(userPrincipal.getUserId());
    }
    
    @GetMapping(value = "/articleMetaByAuthor/{authorId}")
    @PreAuthorize("hasRole('USER')")
    public List<ArticleMeta> getarticle(@PathVariable String authorId) throws NotFoundException {
        return iArticleMetaSevice.fetchArticleMetaByAuthorId(authorId);
    }
    
    @GetMapping(value = "/articleMetaByAuthor")
    @PreAuthorize("hasRole('USER')")
    public List<ArticleMeta> getarticle(@CurrentUser UserPrincipal userPrincipal) throws NotFoundException {
    	return iArticleMetaSevice.fetchArticleMetaByAuthorId(userPrincipal.getUserId());
    }

    @PutMapping(value = "/like/{articleId}")
    @PreAuthorize("hasRole('USER')")
    public void like(@PathVariable Long articleId, @CurrentUser UserPrincipal userPrincipal) throws NotFoundException {
        iArticleMetaSevice.handleLike("+", articleId, userPrincipal.getUserId());
    }

    @PutMapping(value = "/unlike/{articleId}")
    @PreAuthorize("hasRole('USER')")
    public void unlike(@PathVariable Long articleId, @CurrentUser UserPrincipal userPrincipal) throws NotFoundException {
        iArticleMetaSevice.handleLike("-", articleId, userPrincipal.getUserId());
    }

}