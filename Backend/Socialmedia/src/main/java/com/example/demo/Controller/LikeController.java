package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Entity.LikeEntity;
import com.example.demo.Service.LikeService;

@CrossOrigin
@RestController
public class LikeController {

	@Autowired
	private LikeService ser;
	
//	@GetMapping("/Feed/get")
//	public List<Feed> getDetails()
//	{
//		return ser.getAllDetails();
//	}
	
	@GetMapping("/Like/get/{likedBy}")
	public List<Integer> getDetails(@PathVariable String likedBy)
	{
		return ser.getAllDetails(likedBy);
	}
	
	@PostMapping("/Like/add")
	public void postDetails(@RequestBody LikeEntity e)
	{
		ser.saveDetails(e);
//		return "Bank Details Added Successfully";
	}
	
	@DeleteMapping("/Like/delete/{postIdentity}/{likedBy}")
	public void deleteDetails(@PathVariable int postIdentity, @PathVariable String likedBy)
	{
		ser.deleteDetailsById(postIdentity, likedBy);
	}
	
//	@PostMapping("/Feed/like/{postId}")
//	public void postLike(@PathVariable int postId) {
//		ser.postLike(postId);
//	}
	
}
