package day37exercise.app.services;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    
    @Autowired
    private AmazonS3 s3Client;

    public String upload(MultipartFile file) {
        Map<String, String> userData = new HashMap<>();
        
        userData.put("name", "fred");
        userData.put("uploadTime", (new Date().toString()));

        //Metadata of file
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        metadata.setUserMetadata(userData);

        String key = UUID.randomUUID().toString().substring(0, 8);

        //Create a put request
        try {
            PutObjectRequest put = new PutObjectRequest(
                "ridhwan-bucket", // bucket name
                "myobjects/%s".formatted(key), // myobjects/asd1s3af, myobjects/asd98dsd etc
                file.getInputStream(),
                metadata);

                //Allow public access
                put = put.withCannedAcl(CannedAccessControlList.PublicRead);

                s3Client.putObject(put);

                return key;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
