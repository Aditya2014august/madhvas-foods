import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type MenuCategory = {
    #Pizza;
    #Burger;
    #Momos;
    #Maggi;
    #Sandwiches;
    #Beverages;
  };

  public type MenuItem = {
    id : Common.MenuItemId;
    name : Text;
    category : MenuCategory;
    description : Text;
    price : Nat;
    image : Storage.ExternalBlob;
    available : Bool;
  };

  public type OrderStatus = {
    #Preparing;
    #Baking;
    #Ready;
    #OutForDelivery;
    #Delivered;
  };

  public type OrderItem = {
    itemId : Common.MenuItemId;
    quantity : Nat;
    name : Text;
    price : Nat;
  };

  public type PlaceOrderRequest = {
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    paymentMethod : Text;
    items : [(Common.MenuItemId, Nat)];
  };

  public type Order = {
    id : Common.OrderId;
    orderNumber : Text;
    timestamp : Common.Timestamp;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    paymentMethod : Text;
    items : [OrderItem];
    totalAmount : Nat;
    var status : OrderStatus;
  };

  public type OrderPublic = {
    id : Common.OrderId;
    orderNumber : Text;
    timestamp : Common.Timestamp;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    paymentMethod : Text;
    items : [OrderItem];
    totalAmount : Nat;
    status : OrderStatus;
  };
};
