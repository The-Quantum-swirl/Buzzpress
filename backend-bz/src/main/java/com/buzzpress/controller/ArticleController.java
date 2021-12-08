package com.buzzpress.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.buzzpress.beans.Article;
import com.buzzpress.exception.UserNotFoundException;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.security.CurrentUser;
import com.buzzpress.security.UserPrincipal;
import com.buzzpress.service.IArticleMetaSevice;
import com.buzzpress.service.IArticleService;
import com.buzzpress.service.IUserStatsService;
import com.buzzpress.service.impl.IUserServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

//@CrossOrigin(origins = "*")
@RestController
public class ArticleController {
    @Autowired
    IUserServiceImpl iUserService;
    @Autowired
    IArticleService iArticleService;
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;
    @Autowired
    IUserStatsService iUserStatsService;

    @PostMapping(value = "/saveArticle")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseMessage> saveArticle(@RequestBody Article entity, @CurrentUser UserPrincipal userPrincipal)
            throws NotFoundException, UserNotFoundException {
        
        entity.setAuthorId(userPrincipal.getUserId());
        String name = iUserService.getUsernameFromUserId(entity.getAuthorId());
        iArticleMetaSevice.saveMetaData(entity, name);
        iArticleService.saveArticle(entity);
        iUserStatsService.incrementAuthored(entity.getAuthorId());
        
        ResponseMessage rm = new ResponseMessage("Article Added", 200);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @GetMapping(value = "/article")
    @PreAuthorize("hasRole('USER')")
    public List<Article> getAllArticles() {

        return iArticleService.displayAllArticles();
    }

    @GetMapping(value = "/article/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Article> getArticlebyId(@PathVariable Long id) {
        iArticleMetaSevice.view(id);
        return iArticleService.fetchArticleByArticleId(id);
    }
}
