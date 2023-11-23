package com.bank.system.exception;

public class AccountNumberNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public AccountNumberNotFoundException()
	{
		super();
	}
	public AccountNumberNotFoundException(String message)
	{
		super(message);
				
	}

}
