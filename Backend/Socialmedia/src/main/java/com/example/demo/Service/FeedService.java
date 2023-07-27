package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Feed;
import com.example.demo.Repository.FeedRepo;

@Service
public class FeedService {

	@Autowired
	private FeedRepo emp;
//
//	public List<Feed> getAllDetails()
//	{
//		Sort sort  = Sort.by(Sort.Direction.DESC, "postId");
//		return emp.findAll(sort);
//	}
//	
	public List<Feed> getAllDetails(String email)
	{
		
		return emp.findByEmailFollowing(email);
	}
	
	public Feed saveDetails(Feed e) 
	{
		return emp.save(e);
	}
	
	public void increaseCommentCountByOne(int post_id) {
		emp.increaseCommentCountByOne(post_id);
	}
	
//	public void postLike(int postId) {
//		emp.likePost(postId);
//	}
}
