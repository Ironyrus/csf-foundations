package day36exercise.angularspringboot;

//ng build to ensure angular can work with spring boot without needing cors

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import day36exercise.angularspringboot.repositories.day36repo;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;


@RestController
// @RequestMapping(path="/home")
public class day36RestController {
    
    @Autowired
    day36repo repo;

    @GetMapping(path="/home")
    public ResponseEntity<String> getHome(@RequestParam("limit") int limit, @RequestParam("offset") int offset){
        // Getting full list of games
        List<Document> games = repo.getGames(limit, offset);
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        JsonObjectBuilder builder = Json.createObjectBuilder();

        for(Document game: games){
            JsonObject jObj = builder.add("game_id", game.getInteger("gid"))
                                     .add("name", game.getString("name")).build();
            arrBuilder.add(jObj);
        }
        JsonArray jOut = arrBuilder.build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(jOut.toString());
    }

}
