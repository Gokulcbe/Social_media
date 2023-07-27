package com.example.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Feed;
import com.example.demo.Entity.Profile;
import com.example.demo.Repository.ProfileRepo;

@Service
public class ProfileService {

	@Autowired
	private ProfileRepo emp;

//	public Profile getAllDetails()
//	{
//		return emp.findAll();
//	}
	
	public Optional<Profile> getDetailsId(String email)
	{
		return emp.findById(email);
	}
//	public List<Feed> getUsersSortedByIdDescending
	public List<Profile> getDetailsId1(String email)
	{
		return emp.findByEmailStartingWith(email);
	}
	
	public Profile saveDetails(Profile e) 
	{
		return emp.save(e);
	}
	
//	public void postLike(int postId) {
//		emp.likePost(postId);
//	}
}
