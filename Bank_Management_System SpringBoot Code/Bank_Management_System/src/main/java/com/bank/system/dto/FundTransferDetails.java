package com.bank.system.dto;

import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FundTransferDetails {

	private String recipientAccountNumber;
	private String amount;
	private String description;
}
