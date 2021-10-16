package com.buzzpress.beans;

import javax.persistence.Column;
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

public class Article {
	@Id
	@SequenceGenerator(name = "ArticleId_sequence", sequenceName = "ArticleId_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ArticleId_sequence")
	private Long articleId;
	private Long authorId;
	private String heading;
	private String subHeading;
	// @Lob
	@Column(columnDefinition = "TEXT")
	private String description;
	private String textType;
	private String topic;
}
