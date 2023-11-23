package com.bank.system.dto;

import org.springframework.stereotype.Controller;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class UserData {
	
	private String bankName;
	private String typeOfAccount;
	private String accountName;
	private String firstName;
	private String lastName;
	private String loginId;
	@Pattern(regexp="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$" ,
	message="password should contains at least 0-9,a-z,A-Z,! @ # $ % & * ")
	private String password;
	private String confirmPassword;
	private String email;
	private String dateOfBirth;
	private String mobileNo;
	private String gender;
	private String nationality;

}
