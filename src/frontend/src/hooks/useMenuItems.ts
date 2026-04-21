import { useMemo, useState } from "react";
import type { Category, MenuItem } from "../types";

const MENU_ITEMS: MenuItem[] = [
  // Pizza
  {
    id: "pizza-001",
    name: "Margherita Classic",
    description:
      "San Marzano tomatoes, fresh mozzarella, hand-torn basil, extra virgin olive oil on our signature thin crust",
    price: 299,
    category: "Pizza",
    image: "/assets/generated/pizza-margherita.dim_800x600.jpg",
    isVeg: true,
    isPopular: true,
    rating: 4.8,
    prepTime: "20-25 min",
  },
  {
    id: "pizza-002",
    name: "BBQ Chicken Inferno",
    description:
      "Smoky BBQ sauce, grilled chicken, caramelized onions, jalapeños, red bell peppers, smoked mozzarella",
    price: 399,
    category: "Pizza",
    image: "/assets/generated/pizza-bbq-chicken.dim_800x600.jpg",
    isVeg: false,
    isPopular: true,
    rating: 4.9,
    prepTime: "25-30 min",
  },
  // Burger
  {
    id: "burger-001",
    name: "Classic Double Stack",
    description:
      "Two flame-grilled beef patties, cheddar cheese, iceberg lettuce, tomato, pickles, signature Madhvas sauce",
    price: 249,
    category: "Burger",
    image: "/assets/generated/burger-classic.dim_800x600.jpg",
    isVeg: false,
    isPopular: true,
    rating: 4.7,
    prepTime: "15-20 min",
  },
  {
    id: "burger-002",
    name: "Crispy Chicken Crunch",
    description:
      "Golden fried chicken fillet, creamy coleslaw, pickled cucumbers, chipotle mayo, soft brioche bun",
    price: 229,
    category: "Burger",
    image: "/assets/generated/burger-crispy-chicken.dim_800x600.jpg",
    isVeg: false,
    rating: 4.6,
    prepTime: "15-20 min",
  },
  // Momos
  {
    id: "momos-001",
    name: "Pan-Fried Momos",
    description:
      "Crispy pan-fried dumplings stuffed with spiced vegetables, served with signature red chili sauce",
    price: 149,
    category: "Momos",
    image: "/assets/generated/momos-fried.dim_800x600.jpg",
    isVeg: true,
    isPopular: true,
    rating: 4.7,
    prepTime: "15-20 min",
  },
  {
    id: "momos-002",
    name: "Classic Steam Momos",
    description:
      "Tender steamed dumplings with juicy vegetable filling, served with mint chutney and red tomato sauce",
    price: 129,
    category: "Momos",
    image: "/assets/generated/momos-steamed.dim_800x600.jpg",
    isVeg: true,
    rating: 4.5,
    prepTime: "12-15 min",
  },
  // Maggi
  {
    id: "maggi-001",
    name: "Masala Maggi Special",
    description:
      "Perfectly cooked noodles with diced vegetables, butter, signature masala, topped with a runny egg and fresh herbs",
    price: 89,
    category: "Maggi",
    image: "/assets/generated/maggi-masala.dim_800x600.jpg",
    isVeg: false,
    isPopular: true,
    rating: 4.6,
    prepTime: "10-12 min",
  },
  {
    id: "maggi-002",
    name: "Cheesy Maggi Bomb",
    description:
      "Creamy cheese sauce noodles with mixed peppers, corn, jalapeños, topped with generous melted cheddar",
    price: 109,
    category: "Maggi",
    image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400",
    isVeg: true,
    rating: 4.4,
    prepTime: "10-12 min",
  },
  // Sandwiches
  {
    id: "sandwich-001",
    name: "Grilled Chicken Club",
    description:
      "Herb-marinated grilled chicken, crispy bacon, avocado, fresh greens, tomato, on toasted ciabatta with garlic aioli",
    price: 199,
    category: "Sandwiches",
    image: "/assets/generated/sandwich-grilled.dim_800x600.jpg",
    isVeg: false,
    isPopular: true,
    rating: 4.7,
    prepTime: "12-15 min",
  },
  {
    id: "sandwich-002",
    name: "Paneer Tikka Sub",
    description:
      "Tandoori-spiced paneer, grilled peppers, onion, mint chutney, cheese spread on a warm toasted sub roll",
    price: 169,
    category: "Sandwiches",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    isVeg: true,
    rating: 4.5,
    prepTime: "12-15 min",
  },
  // Beverages
  {
    id: "bev-001",
    name: "Fresh Lime Soda",
    description:
      "Freshly squeezed lime juice with chilled soda, mint leaves, and a pinch of black salt. Sweet or salted",
    price: 79,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=400",
    isVeg: true,
    isPopular: true,
    rating: 4.6,
    prepTime: "5 min",
  },
  {
    id: "bev-002",
    name: "Mango Lassi",
    description:
      "Thick creamy yogurt blended with Alphonso mango pulp, saffron, and cardamom. Chilled to perfection",
    price: 99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400",
    isVeg: true,
    rating: 4.8,
    prepTime: "5 min",
  },
];

export function useMenuItems(category?: Category) {
  const filtered = useMemo(() => {
    if (!category) return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === category);
  }, [category]);

  return { data: filtered, isLoading: false, error: null };
}

export function usePopularItems() {
  const popular = useMemo(
    () => MENU_ITEMS.filter((item) => item.isPopular),
    [],
  );
  return { data: popular, isLoading: false };
}

export function useMenuItem(id: string) {
  const item = useMemo(() => MENU_ITEMS.find((m) => m.id === id), [id]);
  return { data: item, isLoading: false };
}

export function useSearchMenuItems(query: string) {
  const [activeQuery] = useState(query);
  const results = useMemo(() => {
    if (!activeQuery.trim()) return [];
    const q = activeQuery.toLowerCase();
    return MENU_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q),
    );
  }, [activeQuery]);
  return { data: results };
}

export { MENU_ITEMS };
