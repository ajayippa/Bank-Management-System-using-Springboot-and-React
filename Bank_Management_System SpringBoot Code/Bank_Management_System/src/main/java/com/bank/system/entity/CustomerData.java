package com.bank.system.entity;

import org.springframework.stereotype.Controller;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Controller
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName="build")
@Entity
@Table
public class CustomerData {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_seq")
	@SequenceGenerator(name = "account_seq", sequenceName = "account_seq", initialValue = 1000000001, allocationSize = 1)	
	private Long accountNo;
	@ManyToOne
    @JoinColumn(name = "bankID")
    private Banks bank;
	@ManyToOne
    @JoinColumn(name = "roleID")
    private Roles role;
	private String accountType;
	private String accountName;
	private String firstName;
	private String lastName;
	private double amount;
	@Column(unique = true)
	private String loginId;
	private String password;
	private String email;
	private String dateOfBirth;
	private String mobile;
	private String gender;
	private String nationality;
	
}
