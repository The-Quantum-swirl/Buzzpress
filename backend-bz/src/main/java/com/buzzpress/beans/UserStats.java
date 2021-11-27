package com.buzzpress.beans;

import java.util.HashSet;
import java.time.LocalDate;

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
public class UserStats {
    @Id
    @SequenceGenerator(name = "StatId_sequence", sequenceName = "StatId_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "UserId_sequence")
    private long statId;
    private String userId;
    private Integer articleRead;
    private Integer articleAuthored;
    private Integer articleTargetRead;
    private HashSet<Long> authoredArticleId;
    private LocalDate lastUpdatedDate;

    public UserStats(String userId) {
        this.userId = userId;
        this.articleRead = 0;
        this.articleAuthored = 0;
        this.articleTargetRead = 5;
        this.authoredArticleId = new HashSet<Long>();
        this.lastUpdatedDate = LocalDate.now();
    }

}
