package com.buzzpress.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.buzzpress.beans.Article;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IArticleMetaSevice;
import com.buzzpress.service.IArticleService;
import com.buzzpress.service.IUserService;
import com.buzzpress.service.IUserStatsService;
import com.buzzpress.service.impl.UserStatServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    IUserService iUserService;
    @Autowired
    IArticleService iArticleService;
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;
    @Autowired
    IUserStatsService iUserStatsService;

    @PostMapping(value = "/saveArticle/{authorId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ResponseMessage> saveArticle(@RequestBody Article entity, @PathVariable String authorId)
            throws NotFoundException {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Article Added");
        rm.setStatusCode(200);
        entity.setAuthorId(authorId);
        String username = iUserService.getUsernameFromUserId(authorId);
        System.out.println(username);
        iArticleMetaSevice.saveMetaData(entity, username);
        iArticleService.saveArticle(entity);
        iUserStatsService.incrementAuthored(authorId);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseMessage> handleNotFoundException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage(ex.getMessage());
        rm.setStatusCode(404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/article")
    @PreAuthorize("hasRole('USER')")
    public List<Article> getAllArticles() {

        return iArticleService.displayAllArticles();
    }

    // @GetMapping(value = "/customArticle")
    // public Object getCustomArticle() {
    // Object hi = new Object();
    // return hi;
    // }

    @GetMapping(value = "/article/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Article> getArticlebyId(@PathVariable Long id) {
        iArticleMetaSevice.view(id);
        return iArticleService.fetchArticleByArticleId(id);
    }
}
