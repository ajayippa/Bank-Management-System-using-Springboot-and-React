package com.bank.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.system.dto.SignInData;
import com.bank.system.serviceImpl.JwtService;


@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/sign")
public class SignIn {
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome this endpoint is not secure";
	}
	
	@PostMapping("/authenticate")
	public String authenticateAndGetToken(@RequestBody SignInData signInData)
	{
		System.out.println("working");
		Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signInData.getLoginId(), signInData.getPassword()));
		if(authentication.isAuthenticated())
		{
			return jwtService.generateToken(signInData.getLoginId());
		}
		else {
			throw new UsernameNotFoundException("invalid user request !");
		}
		
	}

}
