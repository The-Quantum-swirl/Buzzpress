package com.buzzpress.beans;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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

public class Article {
	@Id
	@SequenceGenerator(name = "ArticleId_sequence", sequenceName = "ArticleId_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ArticleId_sequence")
	private Long articleId;
	@JsonIgnore
	@ManyToOne
	private Users_ users_;
	private String authorId;
	private String title;
	private String summary;
	private String publishDate;
	private Integer readTime;
	@Column(columnDefinition = "TEXT")
	private String description;
	@Column(columnDefinition = "TEXT")
	private String textType;
	private String tag;
	private String imageLink;
	// @JsonIgnore
	// @OneToOne(cascade = CascadeType.ALL, mappedBy = "articleMeta")
	// private ArticleMeta articleMeta;
}
