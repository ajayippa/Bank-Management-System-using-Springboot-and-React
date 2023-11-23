package com.bank.system.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class MainExceptionHandler {

	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String,String> handleInvalidException(
										MethodArgumentNotValidException reg)
	{
		Map<String,String> errorMap= new HashMap<>();
		reg.getBindingResult().getFieldErrors().forEach(error -> {
				errorMap.put("errorMessage",error.getDefaultMessage());
		});
		return errorMap;
	}
	
	@ExceptionHandler(LoginIdException.class)
	public String loginIdException(LoginIdException id)
	{
		
		return id.getMessage();
	}
	
	@ExceptionHandler(BankAlreadyExistException.class)
	public String bankAlreadyExistException(BankAlreadyExistException id)
	{
		
		return id.getMessage();
	}
	
	@ExceptionHandler(AccountNumberNotFoundException.class)
	public String accountNumberNotFoundException(AccountNumberNotFoundException id)
	{
		
		return id.getMessage();
	}
	
	@ExceptionHandler(InSufficientBalanceException.class)
	public String inSufficientBalanceException(InSufficientBalanceException id)
	{
		
		return id.getMessage();
	}
	
	@ExceptionHandler(EnteredWrongDetailsException.class)
	public String enteredWrongDetailsException(EnteredWrongDetailsException id)
	{
		
		return id.getMessage();
	}
	
	@ExceptionHandler(PasswordMisMatchException.class)
	public String passwordMisMatchException(PasswordMisMatchException id)
	{
		
		return id.getMessage();
	}
}
