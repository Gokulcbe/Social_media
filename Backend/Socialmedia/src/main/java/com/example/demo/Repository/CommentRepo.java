package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.Comment;


@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer>{
//	@Query("SELECT p.postIdentity FROM Comment p JOIN Feed f ON p.postIdentity=f.postId WHERE p.CommentedBy=:CommentedBy")
//	List<Integer> findByLikedBy(@Param("CommentedBy") String CommentedBy);
	
	@Modifying
	@Query("DELETE FROM Comment p WHERE p.postId=:postId AND p.commentedBy=:commentedBy")
	void deleteByPostIdAndCommentedBy(@Param("postId") int postId, @Param("commentedBy") String commentedBy);

	List<Comment> findByPostId(int postId);
	
//	@Query("SELECT p.postIdentity FROM LikeEntity p WHERE p.likedBy=:liked_by")
//	List<LikeEntity> findBypost(@Param("liked_by") String liked_by);
}
