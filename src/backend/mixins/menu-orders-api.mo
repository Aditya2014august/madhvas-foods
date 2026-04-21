import Types "../types/menu-orders";
import Common "../types/common";
import MenuOrdersLib "../lib/menu-orders";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  menuItems : List.List<Types.MenuItem>,
  orders : Map.Map<Common.OrderId, Types.Order>
) {
  // Auto-incrementing order ID counter
  var nextOrderId : Nat = 1;

  // Required transform callback for HTTP outcalls (strips non-deterministic fields)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Returns all available menu items
  public query func getMenuItems() : async [Types.MenuItem] {
    MenuOrdersLib.listMenuItems(menuItems);
  };

  // Returns menu items filtered by category
  public query func getMenuItemsByCategory(category : Types.MenuCategory) : async [Types.MenuItem] {
    MenuOrdersLib.getMenuItemsByCategory(menuItems, category);
  };

  // Places a new order, triggers SMS notification, returns the created order
  public shared func placeOrder(request : Types.PlaceOrderRequest) : async Types.OrderPublic {
    let orderId = nextOrderId;
    nextOrderId += 1;

    let orderItems = MenuOrdersLib.buildOrderItems(menuItems, request.items);
    let totalAmount = MenuOrdersLib.calculateTotal(orderItems);
    let orderNumber = MenuOrdersLib.generateOrderNumber(orderId);

    let order : Types.Order = {
      id = orderId;
      orderNumber;
      timestamp = Time.now();
      customerName = request.customerName;
      customerPhone = request.customerPhone;
      deliveryAddress = request.deliveryAddress;
      paymentMethod = request.paymentMethod;
      items = orderItems;
      totalAmount;
      var status = #Preparing;
    };

    orders.add(orderId, order);

    let publicOrder = MenuOrdersLib.toPublic(order);

    // Send SMS notification to restaurant via Twilio (fire-and-forget)
    let smsBody = MenuOrdersLib.buildSmsMessage(publicOrder);
    let twilioBody =
      "To=%2B918287286500" #
      "&From=%2B15017122661" #
      "&Body=" # encodeURIComponent(smsBody);

    ignore (async {
      try {
        ignore await OutCall.httpPostRequest(
          "https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json",
          [
            { name = "Content-Type"; value = "application/x-www-form-urlencoded" },
            { name = "Authorization"; value = "Basic YOUR_BASE64_AUTH" },
          ],
          twilioBody,
          transform,
        );
      } catch (_) {};
    });

    publicOrder;
  };

  // Retrieves a single order by its ID
  public query func getOrder(id : Common.OrderId) : async ?Types.OrderPublic {
    MenuOrdersLib.getOrder(orders, id);
  };

  // Returns the current status of an order
  public query func getOrderStatus(id : Common.OrderId) : async ?Types.OrderStatus {
    switch (orders.get(id)) {
      case (?order) ?order.status;
      case null null;
    };
  };

  // Updates an order's status (for admin/kitchen use)
  public shared func updateOrderStatus(id : Common.OrderId, newStatus : Types.OrderStatus) : async Bool {
    MenuOrdersLib.updateOrderStatus(orders, id, newStatus);
  };

  // Returns all orders matching a given status
  public query func getOrdersByStatus(status : Types.OrderStatus) : async [Types.OrderPublic] {
    MenuOrdersLib.getOrdersByStatus(orders, status);
  };

  // Percent-encode text for URL form bodies
  func encodeURIComponent(text : Text) : Text {
    var result = "";
    for (c in text.toIter()) {
      let s = Text.fromChar(c);
      result #= switch (c) {
        case ' '  "%20";
        case '!'  "%21";
        case '#'  "%23";
        case '$'  "%24";
        case '&'  "%26";
        case '\'' "%27";
        case '('  "%28";
        case ')'  "%29";
        case '*'  "%2A";
        case '+'  "%2B";
        case ','  "%2C";
        case '/'  "%2F";
        case ':'  "%3A";
        case ';'  "%3B";
        case '='  "%3D";
        case '?'  "%3F";
        case '@'  "%40";
        case '['  "%5B";
        case ']'  "%5D";
        case _    s;
      };
    };
    result;
  };
};
