import Types "types/menu-orders";
import Common "types/common";
import List "mo:core/List";
import Map "mo:core/Map";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import MenuOrdersApi "mixins/menu-orders-api";
import MenuOrdersLib "lib/menu-orders";

actor {
  // Object storage infrastructure (required for ExternalBlob / image uploads)
  include MixinObjectStorage();

  // Menu state
  let menuItems = List.empty<Types.MenuItem>();

  // Orders state
  let orders = Map.empty<Common.OrderId, Types.Order>();

  // Seed menu items at canister initialization
  MenuOrdersLib.seedMenuItems(menuItems);

  // Menu + Order API (nextOrderId managed internally by the mixin)
  include MenuOrdersApi(menuItems, orders);
};
