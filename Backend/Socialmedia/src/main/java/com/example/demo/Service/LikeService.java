package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.LikeEntity;
import com.example.demo.Repository.LikeRepo;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class LikeService {

	@Autowired
	private LikeRepo emp;
//
//	public List<Feed> getAllDetails()
//	{
//		Sort sort  = Sort.by(Sort.Direction.DESC, "postId");
//		return emp.findAll(sort);
//	}
//	
	public List<Integer> getAllDetails(String liked_by)
	{
		
		return emp.findByLikedBy(liked_by);
	}
	
	public LikeEntity saveDetails(LikeEntity e) 
	{
		return emp.save(e);
	}
	
	public void deleteDetailsById(int postIdentity, String likedBy)
	{
		emp.deleteByPostIdentityAndLikedBy(postIdentity, likedBy);
	}
//	public void postLike(int postId) {
//		emp.likePost(postId);
//	}
}
