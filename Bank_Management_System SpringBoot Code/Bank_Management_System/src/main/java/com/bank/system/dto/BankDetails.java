package com.bank.system.dto;

import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BankDetails {

	private String bankName;
	private String ifscCode;
	private String shortCode;
}
