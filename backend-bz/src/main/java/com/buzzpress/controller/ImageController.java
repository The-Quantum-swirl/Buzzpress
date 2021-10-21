package com.buzzpress.controller;

import javax.servlet.http.HttpServletRequest;

import com.buzzpress.model.ResponseMessage;
import com.buzzpress.service.IFileStorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javassist.NotFoundException;

@CrossOrigin("*")
@RestController
public class ImageController {

    @Autowired
    IFileStorageService fileStorageService;

    @PostMapping(value = "/upload-image")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            fileStorageService.saveMultipartFile(file);
            String Message = "Image upload Successful";
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(Message, 200));
        } catch (Exception e) {
            String message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message, 400));
        }

    }

    // use if we want to download image
    @GetMapping("/image/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = fileStorageService.loadImage(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    // To return url not to be used
    @GetMapping("/imageUrl/{filename:.+}")
    public String getFileUrl(@PathVariable String filename) {
        return "http://localhost:8080/uploads/" + filename;
    }

    // use this api for image fetching
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable("filename") String filename) throws RuntimeException {
        Resource image = fileStorageService.loadImage(filename);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ResponseMessage> handleNotFoundException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage(ex.getMessage());
        rm.setStatusCode(404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseMessage> handleRuntimeException(HttpServletRequest request, Exception ex) {
        ResponseMessage rm = new ResponseMessage();
        rm.setMessage(ex.getMessage());
        rm.setStatusCode(404);
        return new ResponseEntity<ResponseMessage>(rm, HttpStatus.NOT_FOUND);
    }
}
