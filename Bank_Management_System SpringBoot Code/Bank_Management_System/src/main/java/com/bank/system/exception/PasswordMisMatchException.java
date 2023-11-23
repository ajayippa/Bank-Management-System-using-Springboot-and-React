package com.bank.system.exception;

public class PasswordMisMatchException extends RuntimeException{

private static final long serialVersionUID = 1L;
	
	public PasswordMisMatchException()
	{
		super();
	}
	
	public PasswordMisMatchException(String message)
	{
		super(message);
				
	}
}
