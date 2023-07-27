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


import com.example.demo.Entity.Comment;
import com.example.demo.Service.CommentService;

@CrossOrigin
@RestController
public class CommentController {

	@Autowired
	private CommentService ser;
	
//	@GetMapping("/Feed/get")
//	public List<Feed> getDetails()
//	{
//		return ser.getAllDetails();
//	}
	
//	@GetMapping("/Comment/get/{likedBy}")
//	public List<Integer> getDetails(@PathVariable String commentby)
//	{
//		return ser.getAllDetails(likedBy);
//	}
	
	@GetMapping("/Comment/get/{postId}")
	public List<Comment> getDetails(@PathVariable int postId)
	{
		return ser.getAllDetails(postId);
	}
	
	@PostMapping("/Comment/add")
	public void postDetails(@RequestBody Comment e)
	{
		ser.saveDetails(e);
//		return "Bank Details Added Successfully";
	}
	
	@DeleteMapping("/Comment/delete/{postIdentity}/{commentedBy}")
	public void deleteDetails(@PathVariable int postIdentity, @PathVariable String commentedBy)
	{
		ser.deleteDetailsById(postIdentity, commentedBy);
	}
	
//	@PostMapping("/Feed/like/{postId}")
//	public void postLike(@PathVariable int postId) {
//		ser.postLike(postId);
//	}
	
}
