package com.bank.system.serviceInterface;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.system.dto.BankDetails;
import com.bank.system.dto.PasswordUpdate;
import com.bank.system.dto.UpdateUserData;
import com.bank.system.dto.UserData;
import com.bank.system.entity.Banks;
import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Transactions;

@Service
public interface AdminService {

	public String saveDetails(UserData userData); //save the user Details into DataBase

	public String addNewBank(BankDetails bankDetails);  //creating new Bank
	
	public List<Transactions> getTransactionDetails();   //get All Transaction Details
	
	public List<Banks> getBankDetails();   //get All Bank Details
	
	public List<Transactions> getUserTransactionDetails(String accountNo, String transactionId);    //get Transaction Details of particular User
	
	public List<CustomerData> getAllUserDetails();      //get All User Details
	
	public List<CustomerData> getParticularUserData(String accountNo, String name);      //get a particular user data
	
	public String updateBankDetails(BankDetails bankDetails, Integer bankId);         //update Bank Details
	
	public String updateCustomerDetails(UpdateUserData userData, Long accountNo);         //update Customer Data
	
	public String updatePassword(PasswordUpdate passwordUpdate, String token);          //Password Update
}
