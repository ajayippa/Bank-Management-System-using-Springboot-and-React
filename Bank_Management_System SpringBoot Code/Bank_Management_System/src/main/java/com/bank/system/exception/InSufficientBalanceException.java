package com.bank.system.exception;

public class InSufficientBalanceException extends RuntimeException{

	
	private static final long serialVersionUID = 1L;
	
	public InSufficientBalanceException()
	{
		super();
	}
	
	public InSufficientBalanceException(String message)
	{
		super(message);
				
	}

}
