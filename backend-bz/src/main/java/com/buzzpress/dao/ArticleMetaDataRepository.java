package com.buzzpress.dao;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMetaDataRepository extends JpaRepository<ArticleMeta, Long> {

    public List<ArticleMeta> findAllByArticleId(Long ArticleId);

    List<ArticleMeta> findByTopic(String topic);

    List<ArticleMeta> findByAuthorId(Long authorId);
}
