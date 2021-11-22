package com.buzzpress.beans;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.buzzpress.model.AuthProvider;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user_table1")
public class User {

    @Id
    private String id;

    private String name;

    private String email;

    private String imageUrl;

    private Boolean emailVerified = false;

    @JsonIgnore
    private String password = null;

    private AuthProvider provider;

    private String providerId;
}
