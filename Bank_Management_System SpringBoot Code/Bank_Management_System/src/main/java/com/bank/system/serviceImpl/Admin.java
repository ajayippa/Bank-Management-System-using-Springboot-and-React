package com.bank.system.serviceImpl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bank.system.dto.BankDetails;
import com.bank.system.dto.PasswordUpdate;
import com.bank.system.dto.UpdateUserData;
import com.bank.system.dto.UserData;
import com.bank.system.entity.Banks;
import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Roles;
import com.bank.system.entity.Transactions;
import com.bank.system.exception.BankAlreadyExistException;
import com.bank.system.exception.EnteredWrongDetailsException;
import com.bank.system.exception.LoginIdException;
import com.bank.system.exception.PasswordMisMatchException;
import com.bank.system.repository.BanksRepository;
import com.bank.system.repository.CustomerDataRepository;
import com.bank.system.repository.RolesRepository;
import com.bank.system.repository.TransactionsRepository;
import com.bank.system.serviceInterface.AdminService;

@Service
public class Admin implements AdminService{

	@Autowired
	private CustomerDataRepository customerRepo;
	
	@Autowired
	private RolesRepository roleRepo;
	
	@Autowired
	private BanksRepository bankRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Autowired
	private TransactionsRepository transRepo;
	
	@Autowired
	private JwtService jwtService;
	
	
	public String saveDetails(UserData userData)
	{
		CustomerData data = customerRepo.findByLoginId(userData.getLoginId());
		
		if(data != null)
		{
			throw new LoginIdException("LoginId Already Exist");
		}
		else {
			Roles role = roleRepo.findByRoleId(2);
			Banks bank = bankRepo.findByBankName(userData.getBankName());
			CustomerData data1 = CustomerData.build(null, bank, role, userData.getTypeOfAccount(), 
					userData.getAccountName(), userData.getFirstName(), userData.getLastName(), 1000.00, 
						userData.getLoginId(), passwordEncoder.encode(userData.getPassword()), userData.getEmail(), 
							userData.getDateOfBirth(), userData.getMobileNo(), userData.getGender(), 
								userData.getNationality());
			customerRepo.save(data1);
		}
		return "success";
	}

	@Override
	public String addNewBank(BankDetails bankDetails) {
		// TODO Auto-generated method stub
		Banks data = bankRepo.findByBankName(bankDetails.getBankName());
		System.out.println(bankDetails.getBankName()+" "+bankDetails.getIfscCode()+" "+bankDetails.getShortCode());

		if(data != null)
		{
			throw new BankAlreadyExistException("Bank Already Exist");
		}
		else 
		{
			System.out.println(bankDetails.getBankName()+" "+bankDetails.getIfscCode()+" "+bankDetails.getShortCode());
			Banks bank = Banks.build(null, bankDetails.getBankName(), bankDetails.getIfscCode(), bankDetails.getShortCode());
			bankRepo.save(bank);
		}
		return "success";
	}
	
	
	public List<Transactions> getTransactionDetails()
	{
		List<Transactions> transactionDetails= transRepo.findAll();
		return transactionDetails;
	}
	
	public List<Transactions> getUserTransactionDetails(String accountNo, String transactionId)
	{
		Set<Transactions> transactions = new HashSet<Transactions>();
		if (accountNo != null && !accountNo.isEmpty()) {
			Long accountNumber = Long.parseLong(accountNo);
			CustomerData data = customerRepo.findByAccountNo(accountNumber);
			if (data != null) {
	            transactions.addAll(transRepo.findBySenderOrRecipient(data, data));
	        }
		}
		if (transactionId != null && !transactionId.isEmpty()) 
		{	
			List<Transactions> transactionById = transRepo.findByTransactionId(Integer.parseInt(transactionId));
	        transactions.addAll(transactionById);
		}
		if(transactions.size()==0)
		{
			throw new EnteredWrongDetailsException("You have Entered Wrong Details");
		}
		return new ArrayList<Transactions>(transactions);
	}
	
	
	public List<Banks> getBankDetails()
	{
		List<Banks> bankDetails = bankRepo.findAll();
		return bankDetails;
	}
	
	public List<CustomerData> getAllUserDetails()
	{
		List<CustomerData> data = customerRepo.findAllUserDetails();
		return data;
	}
	
	public List<CustomerData> getParticularUserData(String accountNo, String name)
	{
		Set<CustomerData> userDetails = new HashSet<CustomerData>();
		if (accountNo != null && !accountNo.isEmpty()) {
			Long accountNumber = Long.parseLong(accountNo);
			CustomerData data = customerRepo.findByAccountNo(accountNumber);
			if (data != null) {
	            userDetails.add(data);
	        }
		}
		if (name != null && !name.isEmpty()) 
		{
			List<CustomerData> data = customerRepo.findByAccountNameOrFirstNameOrLastName(name, name, name);
			userDetails.addAll(data);
		}
		if(userDetails.size()==0)
		{
			throw new EnteredWrongDetailsException("You have Entered Wrong Details");
		}
		return new ArrayList<CustomerData>(userDetails);
	}
	
	public String updateBankDetails(BankDetails bankDetails, Integer bankId)
	{
		bankRepo.updateBankDetails(bankId, bankDetails.getBankName(), bankDetails.getIfscCode(), bankDetails.getShortCode());
		return "success";
	}
	
	public String updateCustomerDetails(UpdateUserData userData, Long accountNo)
	{
		customerRepo.updateCustomerDetails(accountNo,userData.getAccountName(),userData.getAccountType(),userData.getDateOfBirth(),userData.getEmail(),userData.getFirstName(),userData.getGender(),userData.getLastName(),userData.getLoginId(),userData.getMobile(),userData.getNationality());
		return "success";
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
