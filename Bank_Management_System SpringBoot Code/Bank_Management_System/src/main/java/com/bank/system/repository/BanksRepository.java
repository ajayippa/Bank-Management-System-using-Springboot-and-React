package com.bank.system.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.bank.system.entity.Banks;

import jakarta.transaction.Transactional;

public interface BanksRepository extends JpaRepository<Banks, Integer> {

	Banks findByBankName(String bankName);

	@Modifying
	@Transactional
	@Query("update Banks b set b.bankName=:bankName, b.ifscCode=:ifscCode, b.shortCode=:shortCode where b.bankId=:bankId")
	void updateBankDetails(Integer bankId, String bankName, String ifscCode, String shortCode);

}
