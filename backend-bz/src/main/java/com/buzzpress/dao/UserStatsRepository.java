package com.buzzpress.dao;

import com.buzzpress.beans.UserStats;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatsRepository extends JpaRepository<UserStats, Long> {

	UserStats findByUserId(long id);

}
