package com.example.demo.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="following")
public class Following {
	
	@Id
	@GeneratedValue
	@Column(name="fid")
	private int fid;
	
	@Column(name="Followl")
	private String followl;
	
	@Column(name="Followr")
	private String followr;
	
	
	
	public int getFid() {
		return fid;
	}
	
	public void setFid(int fid) {
		this.fid = fid;
	}
	
	public String getFollowl() {
		return followl;
	}
	
	public void setFollowl(String followl) {
		this.followl = followl;
	}
	
	public String getFollowr() {
		return followr;
	}
	
	public void setFollowr(String followr) {
		this.followr = followr;
	}
	
	
	public Following(int fid, String followl, String followr) {
		super();
		this.fid = fid;
		this.followl = followl;
		this.followr = followr;
	}
	
	public Following() {
		
	}


}
