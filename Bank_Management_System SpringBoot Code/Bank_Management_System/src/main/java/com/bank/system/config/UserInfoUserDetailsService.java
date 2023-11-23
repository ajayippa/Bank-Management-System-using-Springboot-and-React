package com.bank.system.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.bank.system.entity.CustomerData;
import com.bank.system.repository.CustomerDataRepository;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

	@Autowired
	private CustomerDataRepository customerRepo;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		
		CustomerData data = customerRepo.findByLoginId(username);
		if (data == null) {
		    throw new UsernameNotFoundException("User not found: " + username);
		}
		return new UserInfoUserDetails(data);
	}

}
