package com.buzzpress.dao;

import java.util.List;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.model.TopUsers;

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

    // Select UID from students  group by UID order by score DESC LIMIT 10 
    // @Transactional
    // @Modifying
    @Query(value = "select new TopUsers(author_id AS authorId,author_name as name,SUM(views) AS points) from article_meta group by author_id,name order by points Desc LIMIT 10", nativeQuery = true)
    public List<TopUsers> top10();

    // public List<ArticleMeta> findTop10DistinctAuthorIdByOrderByViewsDescGroupByAuthorId();
}
