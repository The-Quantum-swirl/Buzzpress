package com.buzzpress.exception;

public class UserNotFoundException extends Exception{
    private String msg;

    public UserNotFoundException(String msg) {
        this.msg = msg;
    }

    @Override
    public String getMessage() {
        return this.msg;
    }
}
