package day36exercise.angularspringboot.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObjectBuilder;

@Repository
public class day36repo {

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Document> getGames(Integer limit, Integer offset) {
        
        Criteria c = Criteria.where("name").exists(true);
        Query q = Query.query(c).limit(limit).skip(offset);

        List<Document> results = mongoTemplate.find(q, Document.class, "game");

        return results;
    }

}