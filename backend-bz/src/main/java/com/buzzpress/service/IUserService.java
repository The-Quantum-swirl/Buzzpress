package com.buzzpress.service;

import java.util.List;

import com.buzzpress.beans.Users_;

import javassist.NotFoundException;

public interface IUserService {

    public Users_ getUserDetails(Long userId) throws NotFoundException;

    public String getUsernameFromUserId(Long userId) throws NotFoundException;

    public void saveUserDetails(Users_ details);

    public List<Users_> showAllUsers();
}
