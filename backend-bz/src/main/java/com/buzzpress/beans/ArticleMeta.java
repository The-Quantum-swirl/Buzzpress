package com.buzzpress.beans;

import javax.persistence.Entity;
import javax.persistence.Id;

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
    private String authorName;
    private Long authorId;
    private Long views;
    private Integer likes;
    private String tags;
    private String publishDate;
    private String ThumbnailUrl;

    public ArticleMeta(Long articleId, String author, Long authorId, String topic) {
        setArticleId(articleId);
        setAuthorName(author);
        setAuthorId(authorId);
        setTags(topic);
    }
}