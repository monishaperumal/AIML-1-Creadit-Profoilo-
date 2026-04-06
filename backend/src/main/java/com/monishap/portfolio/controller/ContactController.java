package com.monishap.portfolio.controller;

import com.monishap.portfolio.dto.ApiResponse;
import com.monishap.portfolio.model.ContactMessage;
import com.monishap.portfolio.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contact")
@Validated
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ContactMessage>> submitContact(@Valid @RequestBody ContactMessage contactMessage) {
        ContactMessage saved = contactService.saveContactMessage(contactMessage);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("success", "Contact message received successfully", saved));
    }
}
