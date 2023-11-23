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
@AllArgsConstructor(staticName="build")
@Entity
@Table
public class Reports {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer reportId;
	@ManyToOne
    @JoinColumn(name = "userID")
	private CustomerData user;
	private String ReportDate;
	private String issueDescription;
	private String status;
}
