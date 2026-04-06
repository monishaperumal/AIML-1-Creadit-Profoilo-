package com.monishap.portfolio.repository;

import com.monishap.portfolio.model.ContactRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactRequestRepository extends JpaRepository<ContactRequest, Long> {
    List<ContactRequest> findByEmailOrderByCreatedAtDesc(String email);
    List<ContactRequest> findByCreatedAtAfter(LocalDateTime dateTime);
}
