package com.buzzpress.dao;

import java.util.List;

import com.buzzpress.beans.Users_;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDataRepository extends JpaRepository<Users_, String> {

    public Users_ findByUserId(String userId);

    public List<Users_> findByUserName(String userName);

    public List<Users_> findByUserEmail(String userEmail);

}
