package com.bank.system.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Transactions {

	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer transactionId;
	@ManyToOne
    @JoinColumn(name = "senderUserID")
    private CustomerData sender;
	@ManyToOne
    @JoinColumn(name = "recipientUserID")
    private CustomerData recipient;
	private String transactionType;
	private double amount;
	private String transactionDate;
}
