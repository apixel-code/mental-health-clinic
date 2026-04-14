# Psychiatrist Website (মনোরোগ বিশেষজ্ঞ) - PRD

## Problem Statement
Build a complete, mobile-optimized website for a psychiatrist with Bengali language content targeting emotional pain points.

## Architecture
- **Frontend**: React + TailwindCSS + Shadcn UI + Framer Motion
- **Backend**: FastAPI + MongoDB (Motor)
- **Design**: Organic & Earthy light theme - #2C4B3B (brand), #D98A6C (accent), #FDFBF7 (bg)
- **Fonts**: Noto Serif Bengali (headings), Hind Siliguri (body)

## User Personas
1. **Patient**: Someone struggling with mental health (anxiety, depression, insomnia) looking for help
2. **Doctor/Admin**: The psychiatrist managing blog content and appointments

## Core Requirements
- Landing page with emotional Bengali copy (Hero, Transformation, Authority, Services, Testimonials, CTA)
- Blog page with posts from MongoDB
- Single blog post view
- Admin panel (password-only login: admin123)
- Blog CRUD from admin dashboard
- Appointment booking via WhatsApp redirect
- Mobile-first responsive design

## What's Been Implemented (Feb 2026)
- [x] Full landing page with all sections
- [x] Blog listing page (/blog)
- [x] Single blog post page (/blog/:id)
- [x] Admin login (/admin) - password only
- [x] Admin dashboard (/admin/dashboard) with Blog CRUD
- [x] Backend API: Blog CRUD + Admin verify
- [x] Data separation (src/data/content.js)
- [x] Mobile responsive with hamburger menu
- [x] WhatsApp appointment booking redirect

## Prioritized Backlog
### P0 (Done)
- All core features implemented

### P1 (Next)
- Appointments management in admin
- Content editor in admin (edit landing page text)
- SEO meta tags

### P2 (Future)
- Online appointment booking form with date/time slots
- Multi-language support (English/Bengali toggle)
- Blog categories/tags filtering
- Image upload for blog thumbnails
