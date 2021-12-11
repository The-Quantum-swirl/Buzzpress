package com.buzzpress.service;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface IFileStorageService {

    public void init();

    public void saveMultipartFile(MultipartFile file);

    public Resource loadImage(String filename);

    // public Resource serveImage(String filename) throws NotFoundException;

    public void DeleteAll();

    public Stream<Path> loadAllImages();
    public String newImageFile(String filename) throws IOException;
}
