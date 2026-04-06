package com.monishap.portfolio.service;

import com.monishap.portfolio.model.ContactMessage;
import com.monishap.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        if (contactMessage.getName() == null || contactMessage.getName().isEmpty()) {
            throw new IllegalArgumentException("Name cannot be empty");
        }
        if (contactMessage.getEmail() == null || contactMessage.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        return repository.save(contactMessage);
    }

    public ContactMessage getContactMessage(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contact message not found with id: " + id));
    }
}
