# Phase 3, Steps 4 & 5 — Design System and UI Components

## What Was Done

Built the complete app design system from scratch based on the v1.0 component library mockups. The theme is called **"Deep Navy · Pearl Gold · Ocean Blue"** — a dark, premium aesthetic that runs across every screen.

## Design Tokens

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#0E1B2E` | Main app background |
| Surface | `#162236` | Cards, inputs, menus |
| Surface Light | `#1A2840` | Input fields, elevated surfaces |
| Border | `#1E2F47` | Card borders, separators |
| Primary (Pearl Gold) | `#C9A84C` | Buttons, active states, accents |
| Primary Muted | `rgba(201,168,76,0.12)` | Active tab backgrounds, selected states |
| Text | `#FFFFFF` | Primary text |
| Text Secondary | `#8B9DB5` | Subtitles, descriptions |
| Text Muted | `#4A5B73` | Placeholders, hints |
| Text Dark | `#0E1B2E` | Text on gold buttons |
| Success | `#22C55E` | Available, confirmed, success toasts |
| Warning | `#F97316` | Pending, surge pricing |
| Error | `#EF4444` | Errors, cancelled, unavailable |
| Info (Ocean Blue) | `#3B82F6` | Confirmed badges, info toasts |
| Inactive | `#6B7B8F` | Inactive tab icons |

### Typography

| Style | Size | Weight | Use |
|---|---|---|---|
| H1 | 32px / 700 | Bold | Screen titles |
| H2 | 24px / 700 | Bold | Section headers |
| H3 | 20px / 600 | Semi-bold | Card titles |
| Body | 16px / 400 | Regular | Body text |
| Body Bold | 16px / 600 | Semi-bold | Buttons, emphasis |
| Caption | 14px / 400 | Regular | Subtitles |
| Small | 12px / 400 | Regular | Hints, helper text |
| Label | 11px / 700 | Bold + uppercase + letter-spacing | Input labels |
| Tab Label | 10px / 400-600 | Regular/Semi-bold | Bottom nav labels |

### Spacing: 4 / 8 / 16 / 24 / 32 / 48px
### Border Radius: 8 / 12 / 16 / 24 / 9999px

## Components Built

| Component | File | Description |
|---|---|---|
| **Button** | `Button.tsx` | Gold primary, outlined secondary, ghost, danger variants. Small/medium/large sizes. Loading state with spinner. |
| **Input** | `Input.tsx` | Dark surface background, uppercase labels, focus border (gold), error border (red), password toggle, hint text. |
| **Card** | `Card.tsx` | Dark surface with border. Default and elevated variants. |
| **Badge** | `Badge.tsx` | Two variants: dot (colored dot + label) and pill (colored background chip). 6 colors: green, yellow, red, blue, gray, gold. |
| **Avatar** | `Avatar.tsx` | Photo with optional online indicator dot. Initials fallback with auto-generated colors. |
| **LoadingScreen** | `LoadingScreen.tsx` | RIFCOS icon with spinning ring, message, subtitle, and dot indicators inside a card. |
| **ErrorScreen** | `ErrorScreen.tsx` | Warning icon in red circle, message, description, and "Try Again" button inside a card. |
| **Toast** | `Toast.tsx` | Slide-in notification with colored left border. Icon circle, title, description. Success/error/info types. |
| **Divider** | `Divider.tsx` | Simple line or labeled divider (e.g. "or continue with"). |
| **ProgressBar** | `ProgressBar.tsx` | Segmented progress indicator for onboarding flows. Gold for completed, dark for remaining. |
| **TabBar** | `TabBar.tsx` | Custom bottom navigation matching the mockup: gold active indicator pill, gold tinted icons, badge support, safe area handling. |
| **ScreenShell** | `ScreenShell.tsx` | Dark-themed placeholder for screens not yet built. |

## Screens Updated

All auth screens (Welcome, Login, Signup, Forgot Password) and the Profile screen are fully themed with the dark design system. The custom TabBar is wired into both customer and provider tab navigators.

## Plain English

This is the visual identity of the app. Every color, every button, every card, every input field follows the same design language — deep navy backgrounds with pearl gold accents. It's designed to feel premium and polished, like a high-end service app. Every future screen we build just uses these same building blocks.
