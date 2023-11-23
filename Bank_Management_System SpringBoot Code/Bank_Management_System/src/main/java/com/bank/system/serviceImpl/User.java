package com.bank.system.serviceImpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.system.dto.FundTransferDetails;
import com.bank.system.dto.PasswordUpdate;
import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Transactions;
import com.bank.system.exception.AccountNumberNotFoundException;
import com.bank.system.exception.InSufficientBalanceException;
import com.bank.system.exception.PasswordMisMatchException;
import com.bank.system.repository.CustomerDataRepository;
import com.bank.system.repository.TransactionsRepository;
import com.bank.system.serviceInterface.UserService;

@Service
public class User implements UserService{

	@Autowired
	private CustomerDataRepository customerRepo;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private TransactionsRepository transactionRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public String getAccountBalance(String token)
	{
		token = token.substring(7);
		String userName = jwtService.extractUsername(token);
		CustomerData data = customerRepo.findByLoginId(userName);
		String amount = String.valueOf(data.getAmount());
		return amount;
	}
	
	public String fundTransfer(FundTransferDetails fundTransferDetails, String token)
	{
		System.out.println(fundTransferDetails.getAmount()+" "+fundTransferDetails.getDescription()+" "+fundTransferDetails.getRecipientAccountNumber());
		System.out.println(Double.parseDouble(fundTransferDetails.getAmount())+" "+Long.parseLong(fundTransferDetails.getRecipientAccountNumber()));
		Long recipientAccountNumber = Long.parseLong(fundTransferDetails.getRecipientAccountNumber());
		CustomerData recipientData = customerRepo.findByAccountNo(recipientAccountNumber);
		if(recipientData != null)
		{
			token = token.substring(7);
			String userName = jwtService.extractUsername(token);
			CustomerData senderData = customerRepo.findByLoginId(userName);
			if(senderData.getAmount()<Double.parseDouble(fundTransferDetails.getAmount()))
			{
				throw new InSufficientBalanceException("Balance Insufficient");
			}
			else
			{
				senderData.setAmount(senderData.getAmount()-Double.parseDouble(fundTransferDetails.getAmount()));
				recipientData.setAmount(recipientData.getAmount()+Double.parseDouble(fundTransferDetails.getAmount()));
				
				LocalDateTime transactionDate = LocalDateTime.now();

			    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
			    
				Transactions transaction = new Transactions();
			    transaction.setSender(senderData);
			    transaction.setRecipient(recipientData);
			    transaction.setTransactionType("Debit"); // Assuming the sender is the one initiating the transfer
			    transaction.setAmount(Double.parseDouble(fundTransferDetails.getAmount()));
			    transaction.setTransactionDate(transactionDate.format(formatter));

			    transactionRepository.save(transaction);
			}
		}
		else
		{
			throw new AccountNumberNotFoundException("Account Number Not Found");
		}
		return "success";
	}
	
	public List<Transactions> getMiniStatement(String token) {
	    // Extract username from token
	    token = token.substring(7);
	    String userName = jwtService.extractUsername(token);

	    // Find the customer based on the username
	    CustomerData customer = customerRepo.findByLoginId(userName);

	    // Retrieve transactions where the customer is the sender or recipient
	    List<Transactions> transactions = transactionRepository.findBySenderOrRecipient(customer, customer);

	    // Filter transactions to show only credited or debited amounts for the customer
	    List<Transactions> miniStatement = new ArrayList<>();

	    // Filter transactions and set transaction type to "Debit" for sender
	    transactions.stream()
	            .filter(transaction -> transaction.getSender().equals(customer))
	            .peek(transaction -> transaction.setTransactionType("Debit"))
	            .forEach(miniStatement::add);

	    // Filter transactions and set transaction type to "Credit" for recipient
	    transactions.stream()
	            .filter(transaction -> transaction.getRecipient().equals(customer))
	            .peek(transaction -> transaction.setTransactionType("Credit"))
	            .forEach(miniStatement::add);

	    // You can further customize the mini statement based on your needs

	    return miniStatement;
	}
	
	public String updatePassword(PasswordUpdate passwordUpdate, String token)
	{
		token = token.substring(7);
		String userName = jwtService.extractUsername(token);
		CustomerData data = customerRepo.findByLoginId(userName);
		if(passwordEncoder.matches(passwordUpdate.getPassword(), data.getPassword()))
		{
		customerRepo.updatePassword(userName, passwordEncoder.encode(passwordUpdate.getNewPassword()));
		}
		else
		{
			throw new PasswordMisMatchException("You Have entered wrong password");
		}
		return "success";
	}
}
