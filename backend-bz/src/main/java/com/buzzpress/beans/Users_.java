package com.buzzpress.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Users_ {
    @Id
    @SequenceGenerator(name = "UserId_sequence", sequenceName = "UserId_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "UserId_sequence")
    private Long userId;
    private String userName;
    private String userEmail;
    private String userAddress;
    private String userPhoneNumber;
}
