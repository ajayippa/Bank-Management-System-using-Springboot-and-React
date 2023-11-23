package com.bank.system.serviceInterface;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.system.dto.FundTransferDetails;
import com.bank.system.dto.PasswordUpdate;
import com.bank.system.entity.Transactions;

@Service
public interface UserService {

	public String getAccountBalance(String token);  //getting the account balance of a user
	
	public String fundTransfer(FundTransferDetails fundTransferDetails, String token);  //fund Transfer to Recipient account
	
	public List<Transactions> getMiniStatement(String token);   //To get the miniStatement
	
	public String updatePassword(PasswordUpdate passwordUpdate, String token);    //Password Update
}
