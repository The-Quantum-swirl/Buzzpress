package com.buzzpress.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.stream.Stream;

import com.buzzpress.service.IFileStorageService;

import org.slf4j.Logger;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileStorageServiceImpl implements IFileStorageService {
    private final Path root = Paths.get("src/main/resources/images");

    @Override
    public void init() {
        try {
            if (!Files.exists(root)) {
                Files.createDirectory(root);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not make upload directory");
        }

    }

    @Override
    public void saveMultipartFile(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Error saving file" + e.getMessage());
        }

    }

    @Override
    public Resource loadImage(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }
    
    @Override
    public String newImageFile(String filename) throws IOException {
    	String imageurl="";
    	Path file = root.resolve(filename);
        log.info("File path is :"+file);
    	File file1=new File(file.toUri());
        String[] ext = filename.split(".");
        // System.out.println(ext);
        String extension="png";
        // String extension = ext[ext.length - 1   ];
        FileInputStream fileinput=new FileInputStream(file1);
        byte[] bytes=new byte[(int)file1.length()];
        fileinput.read(bytes);
        String Encode=Base64.getEncoder().encodeToString(bytes);
        imageurl="data:image/"+extension+";base64,"+Encode;
        fileinput.close();
    	return imageurl;
    }
    @Override
    public void DeleteAll() {
        // TODO Auto-generated method stub
        FileSystemUtils.deleteRecursively(root.toFile());

    }

    @Override
    public Stream<Path> loadAllImages() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

}
