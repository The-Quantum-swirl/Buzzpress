package com.buzzpress.service.impl;

import com.buzzpress.service.UserService;
import com.buzzpress.exception.ResourceNotFoundException;
import com.buzzpress.beans.User;
import com.buzzpress.dao.UserRepository;
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

        private final UserRepository userRepository;

        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                User user = userRepository.findByEmail(email).orElseThrow(
                                () -> new UsernameNotFoundException("User not found with email : " + email));

                return UserPrincipal.create(user);
        }

        public UserDetails loadUserById(String id) {
                User user = userRepository.findById(id)
                                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

                return UserPrincipal.create(user);
        }
}
