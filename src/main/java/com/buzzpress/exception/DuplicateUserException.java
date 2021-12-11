package com.buzzpress.exception;

public class DuplicateUserException extends Exception {
    private String msg;

    public DuplicateUserException(String msg) {
        this.msg = msg;
    }

    @Override
    public String getMessage() {
        return this.msg;
    }
}
