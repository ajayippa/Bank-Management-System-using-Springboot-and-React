package com.bank.system.config;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Roles;


@Component
public class UserInfoUserDetails implements UserDetails {

private static final long serialVersionUID = 1L;
	
	private String loginId;
	private String password;
	private List<GrantedAuthority> authorities;
	
	public UserInfoUserDetails(CustomerData customerData)
	{
		loginId=customerData.getLoginId();
		password=customerData.getPassword();
		Roles roles = customerData.getRole();
	    String roleName = (roles != null) ? roles.getRoleName() : "ROLE_User";
		authorities = Collections.singletonList(new SimpleGrantedAuthority(roleName));
		
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return loginId;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
