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


import com.example.demo.Entity.Profile;
import com.example.demo.Service.ProfileService;

@CrossOrigin
@RestController
public class ProfileController {

	@Autowired
	private ProfileService ser;
	
//	@GetMapping("/Profile/get")
//	public List<Feed> getDetails()
//	{
//		return ser.getAllDetails();
//	}
	
	@PostMapping("/Profile/add")
	public void postDetails(@RequestBody Profile e)
	{
		ser.saveDetails(e);
//		return "Bank Details Added Successfully";
	}
	
	@GetMapping("/profile/get/{email}")
	public Optional<Profile> getDetailsById(@PathVariable String email)
	{
		return ser.getDetailsId(email);
	}
	
	@GetMapping("/profile/getall/{email}")
	public List<Profile> getDetailsById1(@PathVariable String email)
	{
		return ser.getDetailsId1(email);
	}
	
	
//	@PostMapping("/Feed/like/{postId}")
//	public void postLike(@PathVariable int postId) {
//		ser.postLike(postId);
//	}
	
}
