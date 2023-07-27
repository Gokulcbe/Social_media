package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Comment;
import com.example.demo.Repository.CommentRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CommentService {

	@Autowired
	private CommentRepo emp;
//
//	public List<Feed> getAllDetails()
//	{
//		Sort sort  = Sort.by(Sort.Direction.DESC, "postId");
//		return emp.findAll(sort);
//	}
//	
	public List<Comment> getAllDetails(int postId)
	{
		
		return emp.findByPostId(postId);
	}
	
	public Comment saveDetails(Comment e) 
	{
		return emp.save(e);
	}
	
	public void deleteDetailsById(int postId, String commentedBy)
	{
		emp.deleteByPostIdAndCommentedBy(postId, commentedBy);
	}
//	public void postLike(int postId) {
//		emp.likePost(postId);
//	}
}
