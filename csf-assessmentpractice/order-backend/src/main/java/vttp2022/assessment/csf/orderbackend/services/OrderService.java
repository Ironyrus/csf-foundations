package vttp2022.assessment.csf.orderbackend.services;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp2022.assessment.csf.orderbackend.models.Order;
import vttp2022.assessment.csf.orderbackend.models.OrderSummary;
import vttp2022.assessment.csf.orderbackend.repositories.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private PricingService priceSvc;

	@Autowired
	private OrderRepository repo;

	// POST /api/order
	// Create a new order by inserting into orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public void createOrder(Order order) {
		int result = repo.postOrder(order);

		System.out.println("Post result: " + result);
	}

	// GET /api/order/<email>/all
	// Get a list of orders for email from orders table in pizzafactory database
	// IMPORTANT: Do not change the method's signature
	public List<OrderSummary> getOrdersByEmail(String email) {
		// Use priceSvc to calculate the total cost of an order
		List<Order> orders = repo.getAllOrdersByEmail(email);
		List<OrderSummary> orderSummary = new ArrayList<>();
			
		for (Order order : orders) {
			// There is more than one topping, each topping has its own price
			Float tempAmt = 0.0f;
			for (String topping : order.getToppings()) {
				tempAmt += priceSvc.topping(topping);
			}

			// To check whether the customer ordered thin crust or thick crust
			Float isCrust = 0.0f;
			if(order.isThickCrust()){
				isCrust = priceSvc.thickCrust();
			} else {
				isCrust = priceSvc.thinCrust();
			}

			// Calculating the price of the order using PriceService
			float amount = priceSvc.sauce(order.getSauce()) + priceSvc.size(order.getSize()) + isCrust + tempAmt;
			
			// Each order has its own summary
			orderSummary.add(new OrderSummary(order.getOrderId(), order.getName(), order.getEmail(), amount));
		}
		return orderSummary;
	}
}
