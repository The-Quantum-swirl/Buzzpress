package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.service.IUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javassist.NotFoundException;

@Service
public class IUserServiceImpl implements IUserService {

    @Autowired
    UserDataRepository userDataRepository;

    @Override
    public Users_ getUserDetails(Long userId) throws NotFoundException {
        Users_ userObj = null;
        userObj = userDataRepository.findByUserId(userId);
        return userObj;
    }

    @Override
    public void saveUserDetails(Users_ details) {
        userDataRepository.save(details);
    }

    @Override
    public List<Users_> showAllUsers() {
        return userDataRepository.findAll();
    }

    @Override
    public String getUsernameFromUserId(Long userId) throws NotFoundException {
        Users_ user = null;
        try {
            user = userDataRepository.findByUserId(userId);
            System.out.println(user);
            return user.getUserName();
        } catch (Exception e) {
            throw e;
        }

    }
}
