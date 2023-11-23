package com.bank.system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.bank.system.entity.CustomerData;

import jakarta.transaction.Transactional;

public interface CustomerDataRepository extends JpaRepository<CustomerData, Long> {

	CustomerData findByLoginId(String username);

	CustomerData findByAccountNo(long recipientAccountNumber);
	
	@Query("SELECT c FROM CustomerData c WHERE c.role.roleName != 'ROLE_ADMIN'")
	List<CustomerData> findAllUserDetails();

	List<CustomerData> findByAccountNameOrFirstNameOrLastName(String name, String name2, String name3);

	@Modifying
	@Transactional
	@Query("update CustomerData c set c.accountName=:accountName, c.accountType=:accountType,c.dateOfBirth=:dateOfBirth, c.email=:email, c.firstName=:firstName, c.gender=:gender, c.lastName=:lastName, c.loginId=:loginId, c.mobile=:mobile, c.nationality=:nationality where c.accountNo=:accountNo")
	void updateCustomerDetails(Long accountNo, String accountName, String accountType,
			String dateOfBirth, String email, String firstName, String gender, String lastName, String loginId,
			String mobile, String nationality);

	@Modifying
	@Transactional
	@Query("update CustomerData c set c.password=:newPassword where c.loginId=:accountNo")
	void updatePassword(String accountNo, String newPassword);

}
