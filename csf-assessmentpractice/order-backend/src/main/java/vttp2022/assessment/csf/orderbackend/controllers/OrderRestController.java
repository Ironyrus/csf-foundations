package vttp2022.assessment.csf.orderbackend.controllers;

import java.util.List;

import javax.print.attribute.standard.Media;
import javax.xml.transform.Source;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.services.OrderService;

@RestController
public class OrderRestController {
    
    @Autowired
    OrderService service;

    @PostMapping(path="/api/order", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins="*")
    // RequestBody can be POJO or String
    public ResponseEntity<String> postOrder(@RequestBody Order order) {
      
        try {
            service.createOrder(order);
        } catch (Exception e) {
            e.printStackTrace();
        }

        JsonObject jOut = Json.createObjectBuilder().add("status", "OK!").build();
        // We can send data to Angular in the form of a JsonObject
        return ResponseEntity.status(HttpStatus.OK).body(jOut.toString());
    }

    @GetMapping(path="/api/order/{email}/all", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins="*")
    public ResponseEntity<String> getAllOrders(@PathVariable("email") String email) {
        
        System.out.println(email);
        List<OrderSummary> orderSummary = service.getOrdersByEmail(email);
        
        JsonArrayBuilder builderArr = Json.createArrayBuilder();
        for (OrderSummary summary : orderSummary) {
            JsonObject builder = Json.createObjectBuilder()
                    .add("order_id", summary.getOrderId())
                    .add("name", summary.getName())
                    .add("email", summary.getEmail())
                    .add("amount", summary.getAmount())
                    .build();
            builderArr.add(builder);
        }

        JsonArray arrOut = builderArr.build();
        
        return ResponseEntity.status(HttpStatus.OK).body(arrOut.toString());
    }
    
}