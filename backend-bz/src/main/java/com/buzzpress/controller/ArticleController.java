package com.buzzpress.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.buzzpress.beans.Article;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IArticleMetaSevice;
import com.buzzpress.service.IArticleService;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javassist.NotFoundException;

@RestController

public class ArticleController {
    @Autowired
    IUserService iUserService;
    @Autowired
    IArticleService iArticleService;
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;

    @PostMapping(value = "/saveArticle/{authorId}")
    public ResponseEntity<ResponseMessage> saveArticle(@RequestBody Article entity, @PathVariable Long authorId)
            throws NotFoundException {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Article Added");
        rm.setStatusCode(200);
        iArticleService.saveArticle(entity);
        iArticleMetaSevice.saveMetaData(entity.getArticleId(), iUserService.getUsernameFromUserId(authorId), authorId,
                entity.getTag());
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
    public List<Article> getAllArticles() {

        return iArticleService.displayAllArticles();
    }

    @GetMapping(value = "/customArticle")
    public Object getCustomArticle() {
        Object hi = new Object();
        return hi;
    }

    @GetMapping(value = "/article/{id}")
    public List<Article> getArticlebyId(@PathVariable Long id) {

        return iArticleService.fetchArticleByArticleId(id);
    }
}
