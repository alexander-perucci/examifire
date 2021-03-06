package it.univaq.examifire.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import it.univaq.examifire.model.user.User;

public class UserPrincipal implements UserDetails {
	private static final long serialVersionUID = 5277716760103100221L;

	private Long id;

	private byte[] avatar;

	private String firstname;

	private String lastname;

	private boolean accountEnabled;

	private boolean passwordNonExpired;

	@JsonIgnore
	private String password;

	@JsonIgnore
	private String email;

	private Collection<? extends GrantedAuthority> authorities;

	public UserPrincipal(Long id, byte[] avatar, String firstname, String lastname, String email,
			String password, boolean accountEnabled, boolean passwordNonExpired,
			Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.avatar = avatar;
		this.firstname = firstname;
		this.lastname = lastname;
		this.accountEnabled = accountEnabled;
		this.passwordNonExpired = passwordNonExpired;
		this.password = password;
		this.email = email;
		this.authorities = authorities;
	}

	public static UserPrincipal create(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName())).collect(Collectors.toList());

		return new UserPrincipal(user.getId(), user.getAvatar(), user.getFirstname(), user.getLastname(),
				user.getEmail(), user.getPassword(), user.isAccountEnabled(),
				user.isPasswordNonExpired(), authorities);
	}

	public void update(User user) {

		this.id = user.getId();
		this.avatar = user.getAvatar();
		this.firstname = user.getFirstname();
		this.lastname = user.getLastname();
		this.email = user.getEmail();
		this.password = user.getPassword();
		this.accountEnabled = user.isAccountEnabled();
		this.passwordNonExpired = user.isPasswordNonExpired();
		this.authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName())).collect(Collectors.toList());;


	}

	public Long getId() {
		return id;
	}

	public byte[] getAvatar() {
		return avatar;
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
	public String getUsername() {
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
	public boolean isAccountNonExpired() {
		return accountEnabled;
	}

	@Override
	public boolean isAccountNonLocked() {
		return accountEnabled;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return passwordNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return accountEnabled;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (accountEnabled ? 1231 : 1237);
		result = prime * result + ((authorities == null) ? 0 : authorities.hashCode());
		result = prime * result + Arrays.hashCode(avatar);
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstname == null) ? 0 : firstname.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((lastname == null) ? 0 : lastname.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + (passwordNonExpired ? 1231 : 1237);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserPrincipal other = (UserPrincipal) obj;
		if (accountEnabled != other.accountEnabled)
			return false;
		if (authorities == null) {
			if (other.authorities != null)
				return false;
		} else if (!authorities.equals(other.authorities))
			return false;
		if (!Arrays.equals(avatar, other.avatar))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstname == null) {
			if (other.firstname != null)
				return false;
		} else if (!firstname.equals(other.firstname))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (lastname == null) {
			if (other.lastname != null)
				return false;
		} else if (!lastname.equals(other.lastname))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (passwordNonExpired != other.passwordNonExpired)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UserPrincipal [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + 
				", accountEnabled=" + accountEnabled + ", passwordNonExpired=" + passwordNonExpired
				+ ", password=" + password + ", email=" + email + ", authorities=" + authorities + "]";
	}

}
