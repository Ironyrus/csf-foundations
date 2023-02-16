package day37exercise.app.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import day37exercise.app.services.S3Service;
import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
public class FileUploadController {
    
    @Autowired
    S3Service service;

    @PostMapping(path = "/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins="*")
    public ResponseEntity<String> getFile(
            @RequestPart MultipartFile file
            // , @RequestPart String name
            // , @RequestPart String email
            ){
                System.out.println("*** uploadFile success ***");
                System.out.println(file.getOriginalFilename());
                System.out.println(file.getContentType());
                System.out.println(file.getSize());
                String key = "file upload failed!";
                JsonObject jOut;

            try {
                key = service.upload(file);
                jOut = Json.createObjectBuilder().add("status", "success").add("key", key).add("url", "https://ridhwan-bucket.sgp1.digitaloceanspaces.com" + "/myobjects/" + key).build();
                return ResponseEntity.ok().body(jOut.toString());
            } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
                jOut = Json.createObjectBuilder().add("status", "error").build();
                return ResponseEntity.ok().body(jOut.toString());
            }
    }
    
    @PostMapping(path="uploadBigOcean", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadDigOcean(@RequestPart MultipartFile file, 
                                                @RequestPart String name,
                                                @RequestPart String email){
            
            String key = "error";
            try {
                key = service.upload(file);
            } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
                return ResponseEntity.ok().body("https://ridhwan-bucket.sgp1.digitaloceanspaces.com" + "/myobjects/" + key);
            }
                                                    
            return ResponseEntity.ok().body("https://ridhwan-bucket.sgp1.digitaloceanspaces.com" + "/myobjects/" + key);

    }

    @PostMapping(path = "/test", consumes=MediaType.MULTIPART_FORM_DATA_VALUE, produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getImage(@RequestPart MultipartFile myImage ){
        
        System.out.println(myImage.getOriginalFilename());
        System.out.println(myImage.getContentType());
        
        JsonObject jOut = Json.createObjectBuilder()
            .add("filename", myImage.getOriginalFilename())
            .add("contenttype", myImage.getContentType())
            .build();

        String key = "image upload failed!";
            try {
                key = service.upload(myImage);
                jOut = Json.createObjectBuilder().add("status", "success").add("key", key).add("url", "https://ridhwan-bucket.sgp1.digitaloceanspaces.com" + "/myobjects/" + key).build();
                return ResponseEntity.ok().body(jOut.toString());
            } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
                jOut = Json.createObjectBuilder().add("status", "error").build();
                return ResponseEntity.ok().body(jOut.toString());
            }

        

    }
}