---
title: "Add 4 New Prize Categories"
description: "Expand the prize section to include 4 specialized 'Spark' awards of 100,000 VNĐ each."
status: completed
priority: P2
effort: 1h
branch: main
tags: [ui, awards, agents]
created: 2026-03-30
---

# Plan — Adding 4 Prize Categories

The objective is to add 4 additional prizes (100,000 VNĐ each) to the "Cơ cấu giải thưởng" (Prize Structure) section in a way that respects the existing premium, glassmorphic design.

## User Review Required

> [!IMPORTANT]
> - There are 4 new prizes, each worth **100.000 VNĐ**.
> - I have brainstormed names based on the "Agentic Spark" theme. Please review and confirm your preference:
>   1. **Giải Sáng Tạo (Creative Spark)**: Unique concepts.
>   2. **Giải Kỹ Thuật (Technical Spark)**: Robust architecture.
>   3. **Giải Thực Tiễn (Practical Spark)**: High real-world utility.
>   4. **Giải Triển Vọng (Potential Spark)**: Future growth potential.

## Proposed Changes

### 1. Data Structure Update
- **File**: `src/App.tsx`
- **Change**: Add a new constant `SUB_PRIZES` or update `PRIZES` to include the 4 new categories with their respective icons, titles, and descriptions.

### 2. UI Layout - Sub-Awards Grid
- **File**: `src/App.tsx` (within the `#prizes` section)
- **Change**: 
  - Below the main Podium (1st, 2nd, 3rd), introduce a new grid container.
  - The grid will display the 4 new "Spark" awards in a 4-column layout on desktop and a 2-column/1-column layout on mobile.
  - Layout will use `liquid-glass` styling for consistency.
  - Icons will use a different color mix (e.g., a combination of the primary accent colors) to differentiate from the podium.

## Phase 01: Research & Brainstorming [DONE]
- [x] Analyze existing prize section architecture (`src/App.tsx`)
- [x] Brainstorm prize names and icons
- [x] Research grid-based award layouts using `ui-ux-pro-max`

## Phase 02: Implementation
- [ ] Define the `SUB_PRIZES` data array.
- [ ] Create the `SubPrizeCard` component or inline JSX for the grid.
- [ ] Adjust the `#prizes` section padding/spacing to accommodate the new grid.
- [ ] Implement responsive behavior for the grid.

## Phase 03: Verification
- [ ] Check desktop layout for balance.
- [ ] Verify mobile responsiveness (stacked/grid).
- [ ] Ensure hover states are consistent with the main podium cards.
- [ ] Compile and verify there are no syntax errors.

---

## Brainstorming Details

| Prize Category | Icon | Focus |
| :--- | :--- | :--- |
| **Sáng Tạo** | `Sparkles` | For original, out-of-the-box AI Agent concepts. |
| **Kỹ Thuật** | `Cpu` | For robust system logic and planning capabilities. |
| **Thực Tiễn** | `Target` | For ideas that solve real, immediate pain points. |
| **Triển Vọng** | `TrendingUp` | For solutions that are scalable and product-ready. |

---

## Open Questions

> [!NOTE]
> 1. Do you prefer the names suggested above, or should we use more generic names like "Khuyến khích 1, 2, 3, 4"?
> 2. Should the new prizes be listed in the same "Vòng Idea" sub-header, or do they belong to a separate category?
