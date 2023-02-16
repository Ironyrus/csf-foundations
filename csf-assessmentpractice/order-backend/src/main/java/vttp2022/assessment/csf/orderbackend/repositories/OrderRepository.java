package vttp2022.assessment.csf.orderbackend.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import vttp2022.assessment.csf.Queries;
import vttp2022.assessment.csf.orderbackend.models.Order;

@Repository
public class OrderRepository {
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    public int postOrder(Order order) { 
        return jdbcTemplate.update(Queries.SQL_ADD_NEW_ORDER, 
                order.getName(), 
                order.getEmail(),
                order.getSize(),
                order.isThickCrust(),
                order.getSauce(),
                order.getToppings().toString(),
                order.getComments());
    }

    public List<Order> getAllOrdersByEmail(String email) {
        
        List<String> toppingsList = new ArrayList<>();
		toppingsList.add("chicken");
		toppingsList.add("seafood");
		toppingsList.add("beef");
		toppingsList.add("vegetables");
		toppingsList.add("cheese");
		toppingsList.add("arugula");
		toppingsList.add("pineapple");
        
        List<Order> Orders = new ArrayList<>();
        final SqlRowSet query = jdbcTemplate.queryForRowSet(Queries.SQL_GET_ORDERS_BY_EMAIL, email);
        while(query.next()){
            List<String> toppingsList2 = new ArrayList<>();
            // Get array of toppings ie [false, false, true... etc.]
            String toppings = query.getString("toppings");
            // Remove the "[]" from toppings ie false, false, true... etc.
            toppings = toppings.substring(1, toppings.length() - 1);
            // Save the toppings in a String[] array
            String[] toppingsArr = toppings.split(",");
            // Match the index of toppings with toppingsList, so if [true, true...] there is chicken, seafood etc.
            for (int i = 0; i < toppingsArr.length; i++) {
                if(toppingsArr[i].trim().equals("true"))
                    toppingsList2.add(toppingsList.get(i));
            }
                        
            Order tempOrder = new Order();
            tempOrder.setOrderId(query.getInt("order_id"));
            tempOrder.setName(query.getString("name"));
            tempOrder.setEmail(query.getString("email"));
            tempOrder.setSize(query.getInt("pizza_size"));
            tempOrder.setThickCrust(query.getBoolean("thick_crust"));
            tempOrder.setSauce(query.getString("sauce"));
            tempOrder.setToppings(toppingsList2); // [chicken, seafood... etc.] instead of [true, true... etc.]
            tempOrder.setComments(query.getString("comments"));
            Orders.add(tempOrder);
        }

        return Orders;
    }
}