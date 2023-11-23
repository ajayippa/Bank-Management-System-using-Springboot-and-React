package com.bank.system.exception;

public class LoginIdException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public LoginIdException()
	{
		super();
	}
	public LoginIdException(String message)
	{
		super(message);
				
	}
}
