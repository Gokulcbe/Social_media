package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.Entity.Profile;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public interface ProfileRepo extends JpaRepository<Profile, String>{
	 // STARTING WITH
//	@Query(value="Select * from social_profile where email like ?1%",nativeQuery=true) 
//	public Optional<Profile> findByEmailStarttingwith(String email);
//	Optional<Profile> findByEmailStartingWith(String prefix);
	 @Query(value = "SELECT * FROM social_profile WHERE email LIKE %?1%", nativeQuery = true)
	    List<Profile> findByEmailStartingWith(String email);
}
