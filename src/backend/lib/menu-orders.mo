import Types "../types/menu-orders";
import Common "../types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";

module {
  // Convert mutable Order to public shared OrderPublic
  public func toPublic(order : Types.Order) : Types.OrderPublic {
    {
      id = order.id;
      orderNumber = order.orderNumber;
      timestamp = order.timestamp;
      customerName = order.customerName;
      customerPhone = order.customerPhone;
      deliveryAddress = order.deliveryAddress;
      paymentMethod = order.paymentMethod;
      items = order.items;
      totalAmount = order.totalAmount;
      status = order.status;
    };
  };

  // Get all menu items as array
  public func listMenuItems(
    menuItems : List.List<Types.MenuItem>
  ) : [Types.MenuItem] {
    menuItems.toArray();
  };

  // Get menu items filtered by category
  public func getMenuItemsByCategory(
    menuItems : List.List<Types.MenuItem>,
    category : Types.MenuCategory
  ) : [Types.MenuItem] {
    menuItems.filter(func(item) { item.category == category }).toArray();
  };

  // Get a single menu item by id
  public func getMenuItem(
    menuItems : List.List<Types.MenuItem>,
    id : Common.MenuItemId
  ) : ?Types.MenuItem {
    menuItems.find(func(item) { item.id == id });
  };

  // Build order items from request, looking up names and prices
  public func buildOrderItems(
    menuItems : List.List<Types.MenuItem>,
    requestItems : [(Common.MenuItemId, Nat)]
  ) : [Types.OrderItem] {
    requestItems.filterMap(func((itemId, quantity) : (Common.MenuItemId, Nat)) : ?Types.OrderItem {
      switch (menuItems.find(func(m) { m.id == itemId })) {
        case (?menuItem) {
          ?{
            itemId;
            quantity;
            name = menuItem.name;
            price = menuItem.price;
          };
        };
        case null null;
      };
    });
  };

  // Calculate total amount for order items
  public func calculateTotal(items : [Types.OrderItem]) : Nat {
    items.foldLeft<Types.OrderItem, Nat>(
      0,
      func(acc, item) { acc + item.price * item.quantity }
    );
  };

  // Generate a human-readable order number
  public func generateOrderNumber(orderId : Common.OrderId) : Text {
    "MF-" # (1000 + orderId).toText();
  };

  // Build SMS message content for new order
  public func buildSmsMessage(order : Types.OrderPublic) : Text {
    let itemNames = order.items.foldLeft(
      "",
      func(acc, item) {
        if (acc == "") item.name
        else acc # ", " # item.name;
      }
    );
    "New Order! #" # order.orderNumber #
      " from " # order.customerName #
      ". Items: " # itemNames #
      ". Total: Rs." # order.totalAmount.toText() #
      ". Address: " # order.deliveryAddress;
  };

  // Get an order by id
  public func getOrder(
    orders : Map.Map<Common.OrderId, Types.Order>,
    id : Common.OrderId
  ) : ?Types.OrderPublic {
    switch (orders.get(id)) {
      case (?order) ?toPublic(order);
      case null null;
    };
  };

  // Get orders filtered by status
  public func getOrdersByStatus(
    orders : Map.Map<Common.OrderId, Types.Order>,
    status : Types.OrderStatus
  ) : [Types.OrderPublic] {
    let results = List.empty<Types.OrderPublic>();
    orders.forEach(func(_, order) {
      if (order.status == status) {
        results.add(toPublic(order));
      };
    });
    results.toArray();
  };

  // Update an order's status
  public func updateOrderStatus(
    orders : Map.Map<Common.OrderId, Types.Order>,
    id : Common.OrderId,
    newStatus : Types.OrderStatus
  ) : Bool {
    switch (orders.get(id)) {
      case (?order) {
        order.status := newStatus;
        true;
      };
      case null false;
    };
  };

  // Pre-populate menu with distinct items per category using Unsplash URLs encoded as ExternalBlob
  public func seedMenuItems(menuItems : List.List<Types.MenuItem>) {
    // Only seed if empty
    if (not menuItems.isEmpty()) return;

    // ExternalBlob = Blob; encode the Unsplash URL as UTF-8 bytes as the blob reference
    let items : [(Common.MenuItemId, Text, Types.MenuCategory, Text, Nat, Text)] = [
      // Pizza — distinct Unsplash photos
      (1, "Margherita Pizza",    #Pizza,     "Classic tomato sauce with fresh mozzarella and basil leaves",            249, "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80"),
      (2, "Pepperoni Pizza",     #Pizza,     "Loaded with spicy pepperoni slices on rich tomato sauce",                299, "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80"),
      (3, "BBQ Chicken Pizza",   #Pizza,     "Smoky BBQ sauce, grilled chicken and caramelized onions",               329, "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80"),
      // Burger
      (4, "Classic Beef Burger", #Burger,    "Juicy beef patty with lettuce, tomato and special sauce",               199, "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"),
      (5, "Veggie Delight Burger",#Burger,   "Crispy vegetable patty with fresh toppings and mayo",                  169, "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&q=80"),
      (6, "Spicy Crunch Burger",  #Burger,   "Fiery chicken patty with jalapenos and sriracha sauce",                219, "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80"),
      // Momos
      (7, "Steamed Chicken Momos",#Momos,    "Tender chicken filled dumplings steamed to perfection",                149, "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80"),
      (8, "Pan Fried Veg Momos",  #Momos,    "Crispy pan-fried vegetable momos with spicy chilli sauce",             129, "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80"),
      (9, "Tandoori Momos",       #Momos,    "Marinated momos grilled in tandoor with mint chutney",                 169, "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&q=80"),
      // Maggi
      (10, "Classic Maggi",       #Maggi,    "Original Maggi noodles with authentic masala seasoning",               79, "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80"),
      (11, "Cheese Maggi",        #Maggi,    "Creamy Maggi noodles loaded with melted cheese",                       99, "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80"),
      (12, "Masala Maggi",        #Maggi,    "Spicy Maggi tossed with vegetables and extra masala",                  89, "https://images.unsplash.com/photo-1602253057119-44d745d9b860?w=600&q=80"),
      // Sandwiches
      (13, "Club Sandwich",       #Sandwiches,"Triple-layered sandwich with chicken, egg and veggies",               179, "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80"),
      (14, "Grilled Paneer Sandwich",#Sandwiches,"Spiced paneer grilled with capsicum in toasted bread",             159, "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=600&q=80"),
      (15, "BLT Sandwich",        #Sandwiches,"Bacon, crisp lettuce and juicy tomato on sourdough bread",            189, "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80"),
      // Beverages
      (16, "Mango Lassi",         #Beverages, "Thick and creamy yogurt blended with fresh Alphonso mango",           89, "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&q=80"),
      (17, "Cold Coffee",         #Beverages, "Chilled espresso blended with milk and vanilla ice cream",            99, "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80"),
      (18, "Masala Chai",         #Beverages, "Aromatic Indian tea brewed with ginger, cardamom and spices",         49, "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80"),
      (19, "Fresh Lime Soda",     #Beverages, "Zesty lime juice with soda water and a hint of mint",                 59, "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=80"),
    ];

    for ((id, name, category, description, price, url) in items.vals()) {
      menuItems.add({
        id;
        name;
        category;
        description;
        price;
        image = url.encodeUtf8();
        available = true;
      });
    };
  };
};
