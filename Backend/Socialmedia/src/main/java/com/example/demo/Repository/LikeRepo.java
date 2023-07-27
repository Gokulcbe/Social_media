package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.Feed;
import com.example.demo.Entity.LikeEntity;

@Repository
public interface LikeRepo extends JpaRepository<LikeEntity, Integer>{
	@Query("SELECT p.postIdentity FROM LikeEntity p JOIN Feed f ON p.postIdentity=f.postId WHERE p.likedBy=:liked_by")
	List<Integer> findByLikedBy(@Param("liked_by") String liked_by);
	
	@Modifying
	@Query("DELETE FROM LikeEntity p WHERE p.postIdentity=:postIdentity AND p.likedBy=:likedBy")
	void deleteByPostIdentityAndLikedBy(@Param("postIdentity") int postIdentity, @Param("likedBy") String likedBy);
	
//	@Query("SELECT p.postIdentity FROM LikeEntity p WHERE p.likedBy=:liked_by")
//	List<LikeEntity> findBypost(@Param("liked_by") String liked_by);
}
