package com.bank.system.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor(staticName="build")
@Entity
@Table
public class Banks {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer bankId;
	@Column(unique = true)
	private String bankName;
	@Column(unique = true)
	private String ifscCode;
	@Column(unique = true)
	private String shortCode;
	
}
