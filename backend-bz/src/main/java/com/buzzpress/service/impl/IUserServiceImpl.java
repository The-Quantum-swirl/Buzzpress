package com.buzzpress.service.impl;

import java.util.List;

import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.exception.DuplicateUserException;
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
        try {
            userObj = userDataRepository.findByUserId(userId);
            if (userObj == null) {
                throw new NotFoundException("user not found");
            }
        } catch (Exception e) {
            throw e;
        }
        return userObj;
    }

    @Override
    public void saveUserDetails(Users_ details) throws DuplicateUserException {
        try {
            if (userDataRepository.findByUserEmail(details.getUserEmail()).size() != 0) {
                throw new DuplicateUserException("Please use unique Email");
            }
            userDataRepository.save(details);

        } catch (DuplicateUserException e) {
            throw e;

        } catch (Exception e) {
            throw e;
        }

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
