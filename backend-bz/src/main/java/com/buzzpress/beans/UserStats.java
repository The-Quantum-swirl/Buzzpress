package com.buzzpress.beans;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

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
public class UserStats implements Serializable {
    @Id
    // @SequenceGenerator(name = "StatId_sequence", sequenceName =
    // "StatId_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UserId_sequence")
    private long statId;
    private Long userId;
    private Integer articleRead;
    private Integer articleAuthored;
    private Integer articleTargetRead;

    public UserStats(Long userId) {
        this.userId = userId;
        this.articleRead = 0;
        this.articleAuthored = 0;
        this.articleTargetRead = 5;
    }

}
