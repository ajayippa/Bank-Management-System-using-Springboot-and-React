package com.bank.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Transactions;

public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {

	List<Transactions> findBySenderOrRecipient(CustomerData customer, CustomerData customer2);
	
	List<Transactions> findByTransactionId(Integer transactionId);

}
