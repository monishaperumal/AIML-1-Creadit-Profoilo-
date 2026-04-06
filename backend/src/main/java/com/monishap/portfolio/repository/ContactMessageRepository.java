package com.monishap.portfolio.repository;

import com.monishap.portfolio.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findByEmailOrderByCreatedAtDesc(String email);
    List<ContactMessage> findByCreatedAtAfter(LocalDateTime dateTime);
}
