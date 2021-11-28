package com.buzzpress.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.model.ResponseMessage;

import javassist.NotFoundException;

@RestController
public class ExceptionsController {
	@ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ResponseMessage> handleDuplicateUserException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage(ex.getMessage(), 404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_ACCEPTABLE);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseMessage> handleNotFoundException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage(ex.getMessage(), 404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }
    
}
