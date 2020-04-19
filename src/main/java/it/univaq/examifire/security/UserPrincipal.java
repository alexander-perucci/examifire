package it.univaq.examifire.security;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.univaq.examifire.model.User;

public class UserPrincipal implements UserDetails {
	private static final long serialVersionUID = 5277716760103100221L;

	private Long id;

	private String firstname;

	private String lastname;

	private String username;

	private boolean active;

	private boolean passwordExpired;

	@JsonIgnore
	private String password;

	@JsonIgnore
	private String email;

	private Collection<? extends GrantedAuthority> authorities;

	public UserPrincipal(Long id, String firstname, String lastname, String username, boolean active,
			boolean passwordExpired, String password, String email,
			Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.username = username;
		this.active = active;
		this.passwordExpired = passwordExpired;
		this.password = password;
		this.email = email;
		this.authorities = authorities;
	}

	public static UserPrincipal create(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName())).collect(Collectors.toList());

		return new UserPrincipal(
				user.getId(),
				user.getFirstname(),
				user.getLastname(),
				user.getUsername(),
				user.isActive(),
				user.isPasswordExpired(),
				user.getPassword(),
				user.getEmail(),
				authorities);
	}

	
	public Long getId() {
		return id;
	}

	public String getFirstname() {
		return firstname;
	}

	public String getLastname() {
		return lastname;
	}
	
	public String getEmail() {
		return email;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return active;
	}

	@Override
	public boolean isAccountNonLocked() {
		return active;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return !passwordExpired;
	}

	@Override
	public boolean isEnabled() {
		return active;
	}

}