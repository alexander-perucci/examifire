package it.univaq.examifire.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import it.univaq.examifire.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	// @Query("select u from User u where u.username = :username")
	// User findByUsername(@Param("username") String username);
	Optional<User> findByUsername(String username);
	

}
