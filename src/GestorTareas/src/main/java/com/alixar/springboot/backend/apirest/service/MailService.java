package com.alixar.springboot.backend.apirest.service;

import com.alixar.springboot.backend.apirest.models.Mail;

public interface MailService {

	Mail sendSimpleMail(Mail mail);

}
