package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="LikeEntity")
public class LikeEntity {
	
	@Id
	@GeneratedValue
	@Column(name="likeId")
	private int likeId;
	
	@Column(name="postIdentity")
	private int postIdentity;
	
	@Column(name="likedBy")
	private String likedBy;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    private Feed feed;
	
	public int getLikeId() {
		return likeId;
	}
	
	public void setLikeId(int likeId) {
		this.likeId = likeId;
	}
	
	public int getPostId() {
		return postIdentity;
	}
	
	public void setPostId(int postIdentity) {
		this.postIdentity = postIdentity;
	}
	
	public String getLikedBy() {
		return likedBy;
	}
	
	public void setLikedBy(String likedBy) {
		this.likedBy = likedBy;
	}

	
	public LikeEntity(int likeId, int postIdentity, String likedBy) {
		super();
		this.likeId = likeId;
		this.postIdentity = postIdentity;
		this.likedBy = likedBy;

	}
	
	public LikeEntity() {
		
	}


}
