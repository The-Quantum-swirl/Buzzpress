package com.buzzpress.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.buzzpress.exception.DuplicateUserException;
import com.buzzpress.exception.UserNotFoundException;
import com.buzzpress.model.ResponseMessage;

import javassist.NotFoundException;

@ControllerAdvice
public class ExceptionsController extends ResponseEntityExceptionHandler{
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
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ResponseMessage> handleUserNotFoundException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage(ex.getMessage(), 404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseMessage> handleRuntimeException(HttpServletRequest request, Exception ex) {
    	ResponseMessage rm = new ResponseMessage(ex.getMessage(), 404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }
}
