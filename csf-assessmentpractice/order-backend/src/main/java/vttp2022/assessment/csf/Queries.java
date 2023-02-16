package vttp2022.assessment.csf;

public class Queries {
    public static String SQL_ADD_NEW_ORDER = "insert into orders (name, email, pizza_size, thick_crust, sauce, toppings, comments) values (?, ?, ?, ?, ?, ?, ?)";

    public static String SQL_GET_ORDERS_BY_EMAIL = "select * from orders where email = ?";
}
