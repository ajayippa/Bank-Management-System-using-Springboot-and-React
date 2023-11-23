package com.bank.system.entity;

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
public class Roles {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer roleId;
	private String roleName;
}
