package com.bank.system.dto;

import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class UpdateUserData {

	private String accountType;
	private String accountName;
	private String firstName;
	private String lastName;
	private String loginId;
	private String email;
	private String dateOfBirth;
	private String mobile;
	private String gender;
	private String nationality;
	
}
