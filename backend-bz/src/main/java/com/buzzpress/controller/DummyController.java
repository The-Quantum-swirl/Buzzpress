package com.buzzpress.controller;

import org.springframework.web.bind.annotation.RestController;

import com.buzzpress.beans.Article;
import com.buzzpress.beans.Users_;
import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IArticleService;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController

public class DummyController {
    @Autowired
    IUserService iUserService;
    @Autowired
    IArticleService iArticleService;

    @PostMapping(value = "/saveuser")
    public ResponseEntity<ResponseMessage> postMethodName(@RequestBody Users_ entity) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Data Added");
        rm.setStatusCode(200);
        iUserService.saveUserDetails(entity);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);
    }

    @PostMapping(value = "/saveArticle")
    public ResponseEntity<ResponseMessage> saveArticle(@RequestBody Article entity) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage("Article Added");
        rm.setStatusCode(200);
        iArticleService.saveArticle(entity);

        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.OK);

    }
}
