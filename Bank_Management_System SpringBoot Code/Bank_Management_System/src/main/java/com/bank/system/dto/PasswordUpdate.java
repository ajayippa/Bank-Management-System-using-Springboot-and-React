package com.bank.system.dto;

import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
@Data
@AllArgsConstructor(staticName = "build")
@NoArgsConstructor
public class PasswordUpdate {

	private String password;
	private String newPassword;
	private String confirmNewPassword;
}
