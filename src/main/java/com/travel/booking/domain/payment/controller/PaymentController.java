package com.travel.booking.domain.payment.controller;

import com.travel.booking.domain.payment.dto.PaymentDto;
import com.travel.booking.domain.payment.dto.PaymentResDto;
import com.travel.booking.domain.user.entity.UserEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class PaymentController {

    @PostMapping("/toss")
    public ResponseEntity requestPayment(@AuthenticationPrincipal UserEntity principal, @RequestBody @Valid PaymentDto paymentReqDTO) {
        PaymentResDto paymentResDTO = paymentService.requestPayment(paymentReqDTO.toEntity(),  principal.getUsername()).toPaymentResDto();
        paymentResDTO.setSuccessUrl(paymentReqDTO.getSuccessUrl() == null ? paymentsConfig.getSuccessUrl() : paymentReqDTO.getSuccessUrl());
        paymentResDTO.setFailUrl(paymentReqDTO.getFailUrl() == null ? paymentsConfig.getFailUrl() : paymentReqDTO.getFailUrl());

        return ResponseEntity.ok().body(new SingleResponse<>(paymentResDTO));
    }
}
