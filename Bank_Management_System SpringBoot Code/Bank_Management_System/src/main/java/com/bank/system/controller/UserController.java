package com.bank.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.system.dto.FundTransferDetails;
import com.bank.system.dto.PasswordUpdate;
import com.bank.system.entity.Transactions;
import com.bank.system.serviceInterface.UserService;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/user")
public class UserController {

	
	@Autowired
	private UserService userService;
	
	@GetMapping("/accountBalance")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<String> getAccountBalance(@RequestHeader("Authorization") String token)
	{
		return new ResponseEntity<String>(userService.getAccountBalance(token),HttpStatus.OK);
	}
	
	@PostMapping("/fundTransfer")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<String> fundTransfer(@RequestHeader("Authorization") String token, @RequestBody FundTransferDetails fundTransferDetails)
	{
		return new ResponseEntity<String>(userService.fundTransfer(fundTransferDetails, token),HttpStatus.OK);
	}
	
	@GetMapping("/getMiniStatement")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<List<Transactions>> getMiniStatemnet(@RequestHeader("Authorization") String token)
	{
		return new ResponseEntity<List<Transactions>>(userService.getMiniStatement(token),HttpStatus.OK);
	}
	
	@PostMapping("/updatePassword")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdate passwordUpdate, @RequestHeader("Authorization") String token)
	{
		return new ResponseEntity<String>(userService.updatePassword(passwordUpdate, token),HttpStatus.OK);
	}
}
