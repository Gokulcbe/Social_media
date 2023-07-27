package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="post")
public class Feed {
	
	@Id
	@GeneratedValue
	@Column(name="postId")
	private int postId;
	
	@Column(name="postContent")
	private String postContent;
	
	@Column(name="postDate")
	private String postDate;
	
	@Column(name="likeCount")
	private int likeCount;
	
	@Column(name="commentCount")
	private int commentCount;
	
	@Column(name="postedBy")
	private String postedBy;
	
	@Lob
	@Column(name="image")
    private byte[] image;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followr")
    private Following following;
	
	public int getPostId() {
		return postId;
	}
	
	public void setPostId(int postId) {
		this.postId = postId;
	}
	
	public String getPostContent() {
		return postContent;
	}
	
	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}
	
	public String getPostDate() {
		return postDate;
	}
	
	public void setpostDate(String postDate) {
		this.postDate = postDate;
	}
	
	public int getLikeCount() {
		return likeCount;
	}
	
	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}
	
	public int getCommentCount() {
		return commentCount;
	}
	
	public void setCommentCount(int commentCount) {
		this.commentCount = commentCount;
	}
	
	public String getPostedBy() {
		return postedBy;
	}
	
	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}
	
	public byte[] getImage() {
		return image;
	}
	
	public void setImage(byte[] image) {
		this.image = image;
	}
	
	
	public Feed(int postId, String postContent, String postDate, int likeCount, int commentCount, String postedBy, byte[] image) {
		super();
		this.postId = postId;
		this.postContent = postContent;
		this.postDate = postDate;
		this.likeCount = likeCount;
		this.commentCount = commentCount;
		this.postedBy = postedBy;
		this.image = image;

	}
	
	public Feed() {
		
	}


}
