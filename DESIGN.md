# Design Brief: Madhvas Foods

## Direction
Warm, energetic, trustworthy food delivery platform. Inspired by Dominos/Swiggy — polished UI with food-forward photography. Modern sans-serif typography, vibrant orange primary, neutral supporting tones. Mobile-first, card-based layout with clear hierarchy.

## Tone
Friendly + professional. Appetite-appealing (warm tones), action-oriented (clear CTAs), trustworthy (clean structure).

## Palette
| Token | OKLCH | Purpose |
|-------|-------|---------|
| Primary | 0.65 0.22 40 | Saffron/orange – food action, CTAs |
| Secondary | 0.35 0 0 | Deep slate – structure, secondary actions |
| Accent | 0.55 0.19 25 | Deep red – urgency, highlights |
| Success | 0.65 0.18 140 | Green – order confirmed |
| Muted | 0.92 0 0 | Soft gray – backgrounds, dividers |
| Border | 0.92 0 0 | Card & input borders |
| Background | 0.98 0 0 (light) / 0.15 0 0 (dark) | Page & surface |
| Foreground | 0.12 0 0 (light) / 0.95 0 0 (dark) | Text |

## Typography
| Role | Font | Usage |
|------|------|-------|
| Display | General Sans | Headers, food names, bold callouts |
| Body | Figtree | Description, labels, UI text |
| Mono | JetBrains Mono | Order IDs, timestamps |

## Structural Zones
| Zone | Elevation | Treatment |
|------|-----------|-----------|
| Header | Elevated | bg-card, border-b border-border, shadow-sm |
| Main Content | Base | bg-background, content cards with bg-card |
| Food Cards | Card | bg-card, shadow-sm, rounded-lg, image hero |
| Status Timeline | Highlight | inline badge-status with primary accent |
| Bottom Nav | Elevated | bg-card, border-t border-border, shadow-elevated |
| Footer | Base | bg-muted/20, border-t |

## Spacing & Rhythm
- **Gap**: 16px (primary), 12px (compact), 24px (sections)
- **Padding**: 16px cards, 24px sections, 12px compact UI
- **Density**: Mobile-optimized; comfortable tap targets (44px min)

## Component Patterns
- **Food Card**: Image + name + price + description + qty selector. Rounded-lg (12px). Hover: shadow-md, opacity shift.
- **CTA Button**: Primary orange bg, white text, 12px radius. Full-width on mobile.
- **Status Badge**: inline-flex, bg-primary/10, text-primary, rounded-full, 8px padding.
- **Order Item**: Horizontal card, thumbnail + details + price, editable qty.
- **Bottom Nav**: 3 icons (Home, Cart, Orders) + labels. Active state: primary color.

## Motion
- **Slide-in**: Content entry animations (200ms ease-out)
- **Pulse-soft**: Gentle pulse for loading states, order status updates
- **Hover**: Subtle shadow lift + opacity on interactive elements

## Responsive
- Mobile-first: single column, full-width cards
- Desktop (md:): 2–3 column grid, larger spacing
- Breakpoints: sm (640px), md (768px), lg (1024px)

## Anti-patterns
- ❌ Multiple orange shades (consistency)
- ❌ Generic stock food photos (must be distinct per item)
- ❌ No status indication for orders
- ❌ Flat, lifeless spacing/depth

## Signature Detail
**Food photography as hero.** Each menu item photo is distinct, high-quality, and occupies the top 60% of card. No placeholder imagery. This elevates perceived quality above competitors.
