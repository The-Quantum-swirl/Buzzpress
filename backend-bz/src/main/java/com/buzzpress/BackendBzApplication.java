package com.buzzpress;

import javax.annotation.Resource;

import com.buzzpress.beans.Article;
import com.buzzpress.beans.ArticleMeta;
import com.buzzpress.beans.Users_;
import com.buzzpress.dao.ArticleDataRepository;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.service.IArticleMetaSevice;
import com.buzzpress.service.IArticleService;
import com.buzzpress.service.IFileStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class BackendBzApplication implements CommandLineRunner {

	@Resource
	IFileStorageService storageService;

	@Autowired
	UserDataRepository userDataRepository;
	@Autowired
	ArticleDataRepository articleDataRepository;
	@Autowired
	ArticleMetaDataRepository MetaDataRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendBzApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {

		storageService.init();
		String author = "mukhar";
		Long authorId = Long.parseLong("1");
		Users_ user1 = new Users_(Long.parseLong("1"), author, "M@jain.com", "Delhi", "9876767654");
		userDataRepository.save(user1);
		userDataRepository.save(new Users_(Long.parseLong("2"), "Himanshu", "Him@mis.com", "Delhi", "1234323431"));
		Long articleId = Long.parseLong("1");
		articleDataRepository.save(new Article(articleId, Long.parseLong("1"), "What Happened To Clubhouse?",
				"Easy come easy go.", "date", 5, "the data", "heading", "tags", "image links"));
		MetaDataRepository.save(new ArticleMeta(articleId, author, authorId, "[react,joint]"));
	}

}
