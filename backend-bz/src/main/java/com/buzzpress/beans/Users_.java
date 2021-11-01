package com.buzzpress.beans;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "user_table", uniqueConstraints = @UniqueConstraint(name = "username_unique", columnNames = "userEmail"))

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString

public class Users_ implements Serializable {
    @Id
    @SequenceGenerator(name = "UserId_sequence", sequenceName = "UserId_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UserId_sequence")
    private Long userId;
    private String userName;

    @Column(unique = true)
    private String userEmail;
    private String userAddress;
    private String userPhoneNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    public Users_(String userName, String userEmail, String userAddress, String userPhoneNumber,
            LocalDate dateOfBirth) {
        this.userName = userName;
        this.userEmail = userEmail;
        this.userAddress = userAddress;
        this.userPhoneNumber = userPhoneNumber;
        this.dateOfBirth = dateOfBirth;
    }

}
