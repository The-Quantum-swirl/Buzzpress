package com.buzzpress.beans;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.buzzpress.model.AuthProvider;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "user_table", uniqueConstraints = @UniqueConstraint(name = "username_unique", columnNames = "userEmail"))

@Data
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString

public class Users_ implements Serializable {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private String userId;
    private String userName;
    @Column(unique = true)
    private String userEmail;
    private String name;
    private String userAddress;
    private String userPhoneNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private LocalDate userJoinDate;
    private HashSet<String> followers;
    private HashSet<String> following;
    private String profilePhotoUrl;
    private String imageUrl;
    @Builder.Default
    private Boolean emailVerified = false;
    @JsonIgnore
    private String password = null;
    private AuthProvider provider;

    private String providerId;

    public Users_(String userName, String userEmail, String userAddress, String userPhoneNumber,
            LocalDate dateOfBirth) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userAddress = userAddress;
        this.userPhoneNumber = userPhoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.userJoinDate = LocalDate.now();
        this.followers = new HashSet<String>();
        this.following = new HashSet<String>();

    }

    public Users_(){
        this.userJoinDate = LocalDate.now();
    }

}
