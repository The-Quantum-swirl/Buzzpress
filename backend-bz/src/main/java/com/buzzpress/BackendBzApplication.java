package com.buzzpress;

import javax.annotation.Resource;

import com.buzzpress.service.IFileStorageService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication

public class BackendBzApplication implements CommandLineRunner {

	@Resource
	IFileStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(BackendBzApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {

		storageService.init();
	}

}
