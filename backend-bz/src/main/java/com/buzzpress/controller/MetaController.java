package com.buzzpress.controller;

import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.service.IArticleMetaSevice;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetaController {
    @Autowired
    IArticleMetaSevice iArticleMetaSevice;

    @GetMapping(value = "/articleMeta")
    public List<ArticleMeta> getAllArticlesMeta() {

        return iArticleMetaSevice.fetchAllArticleMetadata();
    }

    @GetMapping(value = "/articleMeta/{id}")
    public List<ArticleMeta> getArticleMetabyId(@PathVariable Long id) {
        return iArticleMetaSevice.fetchArticleMetaByArticleId(id);
    }
}