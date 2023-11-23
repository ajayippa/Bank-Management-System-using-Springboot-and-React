package com.bank.system.exception;

public class BankAlreadyExistException extends RuntimeException{

private static final long serialVersionUID = 1L;
	
	public BankAlreadyExistException()
	{
		super();
	}
	public BankAlreadyExistException(String message)
	{
		super(message);
				
	}
}
