package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entity.Following;

import jakarta.transaction.Transactional;

public interface FollowerRepo extends JpaRepository<Following, Integer>{
	@Query("SELECT u FROM Following u WHERE u.followl = :followl")
    List<Following> findByUsername(@Param("followl") String followl);
	
	@Query("SELECT u FROM Following u WHERE u.followr = :followr")
    List<Following> findByUsername1(@Param("followr") String followr);
	
	@Query("SELECT u FROM Following u WHERE u.followl = :followl AND u.followr = :followr")
    List<Following> findByUsername2(@Param("followl") String followl, @Param("followr") String followr);

//	@Query("DELETE FROM following u WHERE u.followl = :followl AND u.followr = :followr")
//	void deleteByUser(@Param("followl") String followl, @Param("followr") String followr);

//	void deleteByFollowlAndFollowr(String followl, String followr);
	
	 @Transactional
	void deleteByFollowlAndFollowr(String followl, String followr);
}
