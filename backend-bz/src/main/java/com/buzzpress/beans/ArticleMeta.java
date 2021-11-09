package com.buzzpress.beans;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ArticleMeta {
    @Id
    @SequenceGenerator(name = "ArticleId_sequence", sequenceName = "ArticleId_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ArticleId_sequence")
    private Long articleId;
    private String authorName;
    private String title;
    private String summary;
    private Long authorId;
    private Long views;
    private Integer readTime;
    private Integer likes;
    private String tags;

    private LocalDate publishDate;
    private String ThumbUrl;

    public ArticleMeta(Article article, String authorName) {
        this.articleId = article.getArticleId();
        this.authorName = authorName;
        this.authorId = article.getAuthorId();
        this.tags = article.getTag();
        this.title = article.getTitle();
        this.summary = article.getSummary();
        this.ThumbUrl = article.getImageLink();
        this.readTime = article.getReadTime();
        this.publishDate = LocalDate.now();
        this.views = Long.parseLong("1");
        this.likes = 0;
    }

}