package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.demo.Entity.Feed;
import com.example.demo.Entity.Profile;

import jakarta.transaction.Transactional;

@Repository
public interface FeedRepo extends JpaRepository<Feed, Integer>{
//	@Query("SELECT p FROM Post p INNER JOIN p.user u INNER JOIN u.followers f WHERE f.followerUser = :followerUser")
//    List<Feed> findPostsByFollowerUser(@Param("followerUser") User followerUser);
	
	
//	@Modifying
//	@Query("UPDATE post set like_count = like_count+1 where post_id=:id")
//	public int likePost(@Param("postId")int id);
//	List<Feed> findAll(Sort sort);

//	@Query("SELECT p FROM post p JOIN following f ON p.posted_by=f.followr WHERE f.followl=:email")
//	@Query("SELECT p FROM Feed p JOIN p.following f WHERE f.followl = :email")
	@Query("SELECT p FROM Feed p JOIN Following f ON p.postedBy=f.followr OR p.postedBy=:email WHERE f.followl=:email order by postId DESC")
	List<Feed> findByEmailFollowing(@Param("email") String email);
	
//	@Query("SELECT p FROM Feed p JOIN Following f ON p.postedBy=f.followr OR p.postedBy=:email WHERE f.followl=:email order by postId DESC")
	List<Feed> findByPostedBy(@Param("posted_by") String posted_by);
	
	@Transactional
    @Modifying
    @Query("UPDATE Feed c SET c.commentCount = c.commentCount + 1 WHERE c.postId = :post_id")	
	void increaseCommentCountByOne(int post_id);
}
