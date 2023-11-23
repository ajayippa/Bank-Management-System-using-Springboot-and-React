package com.bank.system.exception;

public class EnteredWrongDetailsException extends RuntimeException{

private static final long serialVersionUID = 1L;
	
	public EnteredWrongDetailsException()
	{
		super();
	}
	public EnteredWrongDetailsException(String message)
	{
		super(message);
				
	}
}
