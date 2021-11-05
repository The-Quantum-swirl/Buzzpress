package com.buzzpress;

import javax.annotation.Resource;

import com.buzzpress.dao.ArticleDataRepository;
import com.buzzpress.dao.ArticleMetaDataRepository;
import com.buzzpress.dao.UserDataRepository;
import com.buzzpress.dao.UserStatsRepository;
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
	UserStatsRepository userStatsRepository;
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
		// String author = "mukhar";
		// Long authorId = Long.parseLong("1");
		// UserStats user1Stats = new UserStats();
		// UserStats user2Stats = new UserStats();
		// Users_ user1 = new Users_(author, "M@jain.com", "Delhi", "9876767654",
		// LocalDate.parse("1997-09-25"));
		// user1.setUserStats(user1Stats);
		// userDataRepository.save(user1);
		// Users_ user2 = new Users_("Himanshu", "Him@mis.com", "Delhi", "1234323431",
		// LocalDate.parse("1997-09-25"));
		// user2.setUserStats(user2Stats);
		// userDataRepository.save(user2);

		// Long articleId = Long.parseLong("1");
		// articleDataRepository.save(new Article(articleId, Long.parseLong("1"), "What
		// Happened To Clubhouse?",
		// "Easy come easy go.", "date", 5, "the data", "heading", "tags", "image
		// links"));
		// MetaDataRepository.save(new ArticleMeta(articleId, author, authorId,
		// "[react,joint]"));
	}

}
