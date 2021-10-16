package com.buzzpress.beans;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ArticleMeta {
    @Id
    private Long articleId;
    private Long views;
    private Float rating;
    private String topic;
    private String tags;
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Article article;
    private String createdOn;
    private String author;

}