package com.buzzpress.dao;

import java.util.List;

import com.buzzpress.beans.Users_;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDataRepository extends JpaRepository<Users_, Long> {

    public Users_ findByUserId(Long userId);

    public List<Users_> findByUserName(String userName);

}