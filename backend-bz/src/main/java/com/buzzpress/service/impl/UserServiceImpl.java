package com.buzzpress.service.impl;

import com.buzzpress.service.UserService;
import com.buzzpress.exception.ResourceNotFoundException;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

        private final UserDataRepository UserDataRepository;

        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                Users_ user = UserDataRepository.findByUserEmail(email).orElseThrow(
                                () -> new UsernameNotFoundException("User not found with email : " + email));
                log.error("User not found with email", "INFO");
                return UserPrincipal.create(user);
        }

        public UserDetails loadUserById(String id) {
                Users_ user = UserDataRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

                return UserPrincipal.create(user);
        }
}
