package com.example.demo.Controller;

import java.io.File;
import java.io.IOException;
//import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Entity.Feed;
import com.example.demo.Repository.FeedRepo;
import com.example.demo.Service.FeedService;

@CrossOrigin
@RestController
public class FeedController {

	@Autowired
	private FeedService ser;
	
	@Autowired
    private FeedRepo imageRepository;
	
//	@GetMapping("/Feed/get")
//	public List<Feed> getDetails()
//	{
//		return ser.getAllDetails();
//	}
	
	@GetMapping("/Feed/get/{email}")
	public List<Feed> getDetails(@PathVariable String email)
	{
		return ser.getAllDetails(email);
	}
	
	@PostMapping("/Feed/add")
	public void postDetails(@RequestBody Feed e)
	{
		ser.saveDetails(e);
//		return "Bank Details Added Successfully";
	}
	
	@PostMapping("/Feed/update/{post_id}")
	public void postDetails(@PathVariable int post_id)
	{
		ser.increaseCommentCountByOne(post_id);
//		return "Bank Details Added Successfully";
	}
//	
//	
	
	@GetMapping("/Feed/get1/{email}")
    public ResponseEntity<List<Feed>> getImage(@PathVariable String email) {
        List<Feed> image = imageRepository.findByEmailFollowing(email);
//        if (image != null) {
//            Map<String, Object> imageData = new HashMap<>();
//            imageData.put("postId", image.getPostId());
//            imageData.put("postContent", image.getPostContent());
//            imageData.put("postDate", image.getPostDate());
//            imageData.put("likeCount", image.getLikeCount());
//            imageData.put("commentCount", image.getCommentCount());
//            imageData.put("postedBy", image.getPostedBy());
//            imageData.put("image", image.getImage());
//            return ResponseEntity.ok(imageData);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
        if (!image.isEmpty()) {
            return ResponseEntity.ok(image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	@GetMapping("/Feed/get2/{posted_by}")
    public ResponseEntity<List<Feed>> getImage2(@PathVariable String posted_by) {
        List<Feed> image = imageRepository.findByPostedBy(posted_by);
//        if (image != null) {
//            Map<String, Object> imageData = new HashMap<>();
//            imageData.put("postId", image.getPostId());
//            imageData.put("postContent", image.getPostContent());
//            imageData.put("postDate", image.getPostDate());
//            imageData.put("likeCount", image.getLikeCount());
//            imageData.put("commentCount", image.getCommentCount());
//            imageData.put("postedBy", image.getPostedBy());
//            imageData.put("image", image.getImage());
//            return ResponseEntity.ok(imageData);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
        if (!image.isEmpty()) {
            return ResponseEntity.ok(image);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
    @PostMapping("/Feed/add1")
    public void uploadImage(
            @RequestParam("postContent") String postContent,
            @RequestParam("postDate") String postDate,
            @RequestParam("likeCount") int likeCount,
            @RequestParam("commentCount") int commentCount,
            @RequestParam("postedBy") String postedBy,
            @RequestParam("imageFile") MultipartFile imageFile
    ) {
        try {
            // Save the image details to the database
            Feed imageEntity = new Feed();
            imageEntity.setPostContent(postContent);
            imageEntity.setpostDate(postDate);
            imageEntity.setLikeCount(likeCount);
            imageEntity.setCommentCount(commentCount);
            imageEntity.setPostedBy(postedBy);
            imageEntity.setImage(imageFile.getBytes());
            imageRepository.save(imageEntity);

            // Save the image file to a specific folder
            // Replace "/path/to/your/folder" with the actual folder path where you want to save the images
            // Make sure to handle file name collisions and store unique file names
//            String fileName = imageFile.getOriginalFilename();
//            imageFile.transferTo(new File("/path/to/your/folder/" + fileName));
        } catch (IOException e) {
            // Handle file upload error
            e.printStackTrace();
        }
    }
		
	
//	@PostMapping("/Feed/like/{postId}")
//	public void postLike(@PathVariable int postId) {
//		ser.postLike(postId);
//	}
	
}
