package com.buzzpress.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.buzzpress.beans.Article;

import org.springframework.stereotype.Repository;

@Repository
public interface ArticleDataRepository extends JpaRepository<Article, Long> {

    public List<Article> findByArticleId(Long articleId);

    public List<Article> findByAuthorId(Long authorId);

}
