package com.buzzpress.dao;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMetaDataRepository extends JpaRepository<ArticleMeta, Long> {

    public List<ArticleMeta> findAllByArticleId(Long ArticleId);

    List<ArticleMeta> findByAuthorId(Long authorId);

    @Query(value = "SELECT * FROM article_meta,article.author_name INNER JOIN article ON article_meta.article_id=article.article_id", nativeQuery = true)
    List<Object[]> listAllArticleMeta();
}
