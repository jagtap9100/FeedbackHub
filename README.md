# FeedbackHub - Customer Feedback Platform

A lightweight customer feedback platform built as part of the Acowale Machine Test.

The application enables customers to submit feedback through a public form while providing an admin dashboard to analyze feedback trends, search submissions, and monitor category-wise insights.

---

# Live Demo

**Application:** https://your-app-url.vercel.app

---

# Source Code

**GitHub Repository:** https://github.com/your-username/feedbackhub

---

# Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Prisma ORM

### Database

- PostgreSQL (Supabase)

### Deployment

- Vercel

---

# Features

## Public Feedback Form

- Submit customer feedback
- Category selection
- Comment submission
- Form validation

## Admin Dashboard

- Total feedback count
- Category-wise analytics
- Recent submissions
- Search feedback
- Filter by category

---

# Project Structure

```text
app/
components/
lib/
prisma/
types/
public/
```

---

# My Engineering Journey

Instead of starting with the UI, I first understood the business problem described in the assignment.

I identified two primary user flows:

1. A customer submitting feedback.
2. An administrator viewing analytics.

After defining these flows, I designed the database schema, API endpoints, and application structure before implementing the frontend.

This approach helped ensure that the UI, backend, and database were aligned from the beginning.

---

# Development Process

### Step 1

Read the requirements and identified the core product features.

### Step 2

Designed the database schema for storing customer feedback.

### Step 3

Built REST APIs for:

- Submit Feedback
- Fetch Feedback
- Analytics Summary

### Step 4

Developed the public feedback form.

### Step 5

Implemented the admin dashboard with analytics, search, and filtering.

### Step 6

Added validation, error handling, and environment configuration.

### Step 7

Deployed the application to Vercel.

---

# Engineering Decisions

- Chose Next.js to keep frontend and backend in one project.
- Used PostgreSQL because feedback data is relational and analytics-friendly.
- Used Prisma for type-safe database operations.
- Organized the project into reusable components for maintainability.

Additional reasoning is documented in **DECISIONS.md**.

---

# Future Improvements

Given additional time, I would add:

- Authentication
- Role-based access
- Pagination
- Export to CSV
- Unit and integration tests
- Rate limiting
- Monitoring and logging
- CI/CD pipeline
- Real-time dashboard updates

---

# Running the Project

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Run the development server:

```bash
npm run dev
```

---

# Production Readiness

The application includes:

- Environment variable support
- Input validation
- Error handling
- Modular architecture
- Production-ready deployment
- Maintainable folder structure

---

# Thank You

Thank you for reviewing my submission. I enjoyed working on this assignment because it focused on engineering decisions and product thinking rather than only implementation.
