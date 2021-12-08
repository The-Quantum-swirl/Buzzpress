package com.buzzpress.security.oauth2;

import java.util.Optional;

import com.buzzpress.beans.UserStats;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.dao.UserStatsRepository;
import com.buzzpress.exception.OAuth2AuthenticationProcessingException;
import com.buzzpress.model.AuthProvider;
import com.buzzpress.security.UserPrincipal;
import com.buzzpress.security.oauth2.user.OAuth2UserInfo;
import com.buzzpress.security.oauth2.user.OAuth2UserInfoFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserDataRepository UserDataRepository;
    @Autowired
    UserStatsRepository userStatsRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the
            // OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        System.out.print(oAuth2User);
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
                oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getUserEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<Users_> userOptional = UserDataRepository.findByUserEmail(oAuth2UserInfo.getUserEmail());
        Users_ user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!user.getProvider()
                    .equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException(
                        "Looks like you're signed up with " + user.getProvider() + " account. Please use your "
                                + user.getProvider() + " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private Users_ registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        Users_ user = new Users_();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setUserEmail(oAuth2UserInfo.getUserEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        Users_ response = UserDataRepository.save(user);
        // fallback for adding data to the userStats table till the join mapping is
        // clear
        Optional<Users_> user_fromDb = UserDataRepository.findByUserEmail(user.getUserEmail());
        System.out.println(user_fromDb.get());
        UserStats userStats = new UserStats(user_fromDb.get().getUserId());
        userStatsRepository.save(userStats);
        return response;
    }

    private Users_ updateExistingUser(Users_ existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return UserDataRepository.save(existingUser);
    }

}
