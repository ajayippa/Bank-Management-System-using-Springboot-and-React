package com.bank.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.system.dto.BankDetails;
import com.bank.system.dto.PasswordUpdate;
import com.bank.system.dto.UpdateUserData;
import com.bank.system.dto.UserData;
import com.bank.system.entity.Banks;
import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Transactions;
import com.bank.system.serviceInterface.AdminService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "${frontend.url}")
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;
	
	
	@PostMapping("/userDetails")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<String> saveDetails(@RequestBody @Valid UserData userData)
	{
		return new ResponseEntity<String>(adminService.saveDetails(userData),HttpStatus.OK);
	}
	
	@PostMapping("/addNewBank")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<String> addNewBank(@RequestBody BankDetails bankDetails)
	{
		return new ResponseEntity<String>(adminService.addNewBank(bankDetails),HttpStatus.OK);
	}
	
	@GetMapping("/getAllTransactions")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<Transactions>> getAllTransactions()
	{
		return new ResponseEntity<List<Transactions>>(adminService.getTransactionDetails(),HttpStatus.OK);
	}
	
	@GetMapping("/getUserTransactions")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<Transactions>> getUserTransactions(@RequestParam(required = false) String accountNo,@RequestParam(required = false) String transactionId)
	{
		return new ResponseEntity<List<Transactions>>(adminService.getUserTransactionDetails(accountNo, transactionId),HttpStatus.OK);
	}
	
	@GetMapping("/getAllBankDetails")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<Banks>> getAllBanks()
	{
		return new ResponseEntity<List<Banks>>(adminService.getBankDetails(),HttpStatus.OK);
	}
	
	@GetMapping("/getAllUserDetails")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<CustomerData>> getAllUserDetails()
	{
		return new ResponseEntity<List<CustomerData>>(adminService.getAllUserDetails(),HttpStatus.OK);
	}
	
	@GetMapping("/getParticularUserDetails")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<CustomerData>> getParticularUserData(@RequestParam(required = false) String accountNo,@RequestParam(required = false) String userName)
	{
		return new ResponseEntity<List<CustomerData>>(adminService.getParticularUserData(accountNo, userName),HttpStatus.OK);
	}
	
	@PutMapping("/updateBankDetails/{bankId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<String> updateBankDetails(@RequestBody BankDetails bankDetails, @PathVariable Integer bankId)
	{
		return new ResponseEntity<String>(adminService.updateBankDetails(bankDetails, bankId),HttpStatus.OK);
	}
	
	@PutMapping("/updateCustomerDetails/{accountNo}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<String> updateCustomerDetails(@RequestBody UpdateUserData userData, @PathVariable Long accountNo)
	{
		return new ResponseEntity<String>(adminService.updateCustomerDetails(userData, accountNo), HttpStatus.OK);
	}
	
	@PostMapping("/updatePassword")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdate passwordUpdate, @RequestHeader("Authorization") String token)
	{
		return new ResponseEntity<String>(adminService.updatePassword(passwordUpdate, token),HttpStatus.OK);
	}
	
}
