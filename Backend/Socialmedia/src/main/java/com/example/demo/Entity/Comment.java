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
@Table(name="Comment")
public class Comment {
	
	@Id
	@GeneratedValue
	@Column(name="commentId")
	private int commentId;
	
	@Column(name="postId")
	private int postId;
	
	@Column(name="commentedBy")
	private String commentedBy;
	
	@Column(name="content")
	private String content;
	
	@Column(name="date")
	private String date;
	
//	@ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "postId")
//    private Feed feed;
	
	public int getCommentId() {
		return commentId;
	}
	
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	
	public int getPostId() {
		return postId;
	}
	
	public void setPostId(int postId) {
		this.postId = postId;
	}
	
	public String getCommentedBy() {
		return commentedBy;
	}
	
	public void setCommentedBy(String commentedBy) {
		this.commentedBy = commentedBy;
	}
	
	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public String getDate() {
		return date;
	}
	
	public void setDate(String date) {
		this.date = date;
	}

	
	public Comment(int commentId, int postId, String commentedBy, String content, String date) {
		super();
		this.commentId = commentId;
		this.postId = postId;
		this.commentedBy = commentedBy;
		this.content = content;
		this.date = date;
	}
	
	public Comment() {
		
	}


}
