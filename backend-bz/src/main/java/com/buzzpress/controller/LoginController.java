package com.buzzpress.controller;

import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.exception.ResourceNotFoundException;
import com.buzzpress.security.CurrentUser;
import com.buzzpress.security.UserPrincipal;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final UserDataRepository UserDataRepository;

    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    public Users_ getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
    	System.out.println(userPrincipal.getUserEmail()+" userId:"+userPrincipal.getUserId()+" "
    			+ " atributes:"+ userPrincipal.getAttributes()+ " authorities:"+ userPrincipal.getAuthorities());
        return UserDataRepository.findById(userPrincipal.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getUserId()));
    }
}
