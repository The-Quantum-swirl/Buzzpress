package com.buzzpress.dao;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ArticleMetaDataRepository extends JpaRepository<ArticleMeta, Long> {

    public List<ArticleMeta> findAllByArticleId(Long ArticleId);

    public List<ArticleMeta> findByAuthorId(String authorId);

    @Query(value = "SELECT * FROM article_meta,article.author_name INNER JOIN article ON article_meta.article_id=article.article_id", nativeQuery = true)
    List<Object[]> listAllArticleMeta();

    @Transactional
    @Modifying
    @Query(value = "update article_meta SET likes=likes+1 where article_id=:id", nativeQuery = true)
    public void incrementLike(@Param("id") long id);

    @Transactional
    @Modifying
    @Query(value = "update article_meta SET likes=likes-1 where article_id=:id", nativeQuery = true)
    public void decrementLike(@Param("id") long id);

    @Transactional
    @Modifying
    @Query(value = "update article_meta SET views=views+1 where article_id=:id", nativeQuery = true)
    public void view(@Param("id") long id);

    
    @Query(value = "select author_name,sum(views),author_id from article_meta group by article_meta.author_id,author_name order by sum(views) Desc LIMIT 10", nativeQuery = true)
    public List<Object> top10();

    // public List<ArticleMeta> findTop10DistinctAuthorIdByOrderByViewsDescGroupByAuthorId();
}
