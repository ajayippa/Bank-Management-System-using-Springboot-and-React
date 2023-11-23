package com.bank.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.system.entity.Roles;

public interface RolesRepository extends JpaRepository<Roles, Integer> {

	Roles findByRoleId(int i);

}
