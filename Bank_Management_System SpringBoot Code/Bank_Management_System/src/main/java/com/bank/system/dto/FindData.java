package com.bank.system.dto;

import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Controller
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindData {

	private String accountNo;
	private String transactionId;
}
