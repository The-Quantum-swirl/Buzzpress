package com.buzzpress.controller;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.service.IArticleMetaSevice;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class MetaController {
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;
    @Autowired
    ArticleMetaDataRepository articleMetaDataRepository;

    @GetMapping(value = "/articleMeta")
    public List<ArticleMeta> getAllArticlesMeta() {

        return iArticleMetaSevice.fetchAllArticleMetadata();
    }

    @GetMapping(value = "/articleMetav2")
    public List<Object[]> getAllArticlesMetav2() {
        return articleMetaDataRepository.listAllArticleMeta();
    }

    @GetMapping(value = "/articleMeta/{id}")
    public List<ArticleMeta> getArticleMetabyId(@PathVariable Long id) {
        return iArticleMetaSevice.fetchArticleMetaByArticleId(id);
    }
}
