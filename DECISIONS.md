# DECISIONS.md

## 1. Why did you choose this technology stack?

I chose **Next.js**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **PostgreSQL (Supabase)** because they provide a modern, scalable, and production-ready foundation for building full-stack web applications.

- **Next.js** allows me to build both the frontend and backend APIs within a single project, simplifying development and deployment.
- **TypeScript** improves code quality through static type checking, reducing runtime errors and making the codebase easier to maintain.
- **Tailwind CSS** enables rapid UI development with consistent styling while keeping the design responsive and clean.
- **Prisma** offers a type-safe ORM, making database operations easier to write, understand, and maintain.
- This stack is widely adopted in production environments and supports future scalability without significant architectural changes.

---

## 2. Why did you choose this database?

I selected **PostgreSQL hosted on Supabase** because it is a reliable relational database that fits the structured nature of customer feedback data.

The application stores entities such as feedback, categories, and timestamps, which are naturally relational. PostgreSQL provides strong data integrity, indexing, filtering, and aggregation capabilities that make analytics queries efficient.

Supabase also offers:

- Managed PostgreSQL hosting
- Automatic backups
- Secure environment variable support
- Easy integration with Next.js
- Room for future features such as authentication and real-time updates

These features reduce infrastructure overhead while providing a production-ready database.

---

## 3. Why did you structure your application this way?

I followed a feature-oriented and modular project structure to keep the application maintainable and scalable.

The application is divided into clear responsibilities:

- **Public Feedback Module** handles customer feedback submission.
- **Admin Dashboard Module** is responsible for analytics, search, filtering, and reporting.
- **API Routes** encapsulate backend business logic and database access.
- **Reusable Components** keep the UI consistent and reduce duplication.
- **Utility and Validation Layers** centralize shared logic such as database connections, validation schemas, and helper functions.

This separation improves readability, simplifies testing, and makes it easier to extend the application with features such as authentication, pagination, notifications, or role-based access control in the future.

Overall, the architecture follows separation of concerns, making each part of the application focused on a single responsibility while remaining easy to maintain as the project grows.

## 4. What trade-offs did you make due to time constraints?

Given the estimated time for the assignment, I focused on delivering a complete, stable, and production-aware MVP instead of implementing every possible feature.

To maximize the quality of the core functionality, I postponed features such as authentication, pagination, CSV export, notifications, and comprehensive unit tests. I also kept the analytics simple by focusing on total feedback, category distribution, and recent submissions rather than implementing advanced reporting or real-time updates.

My priority was to ensure that the required features were reliable, maintainable, and easy to extend.

---

## 5. What would you improve if you had one more week?

With an additional week, I would enhance the application in several areas:

- Implement secure admin authentication and role-based access control.
- Add pagination, sorting, and advanced filtering.
- Build richer analytics with trend charts and time-based reports.
- Add email notifications and feedback status tracking.
- Write comprehensive unit and integration tests.
- Improve accessibility and performance.
- Introduce caching for analytics queries.
- Add monitoring, rate limiting, audit logging, and CI/CD pipelines.

These improvements would make the application more suitable for production-scale usage.

---

## 6. What was the most difficult technical challenge you faced?

The most challenging part was designing the application so that the same feedback data could efficiently support both the public submission flow and the analytics dashboard.

I needed to design the database schema and API responses in a way that allowed simple feedback submission while also supporting category-based aggregation, recent submissions, searching, and filtering without creating unnecessary complexity.

Balancing simplicity, maintainability, and future scalability required the most engineering thought.

---

## 7. Which AI tools did you use?

I used AI as a development assistant rather than a code generator.

The primary tools I used were:

- ChatGPT
- GitHub Copilot

These tools helped me validate ideas, explore implementation approaches, review code, and improve documentation.

---

## 8. Share one instance where AI helped you.

AI helped me evaluate different architectural approaches before implementation.

For example, I compared using a separate Express backend versus building APIs directly with Next.js Route Handlers. After evaluating the trade-offs, I chose the integrated Next.js approach because it reduced project complexity while still meeting all functional requirements.

This saved development time without sacrificing maintainability.

---

## 9. Share one instance where you disagreed with AI and why.

One suggestion was to introduce additional abstractions and multiple service layers early in the project.

For this assignment, I intentionally kept the architecture simpler because the application's current scope did not justify that level of complexity. I preferred a clean and modular structure that is easier to understand while still allowing future expansion.

I believe engineering decisions should be based on the project's requirements rather than following AI suggestions without evaluation.

---

## 10. What would break first if this application suddenly had 100,000 users?

The first bottleneck would likely be the database and analytics queries.

As the number of feedback records grows, operations such as category aggregation, searching, filtering, and recent feedback retrieval could become slower if executed directly on every request.

To address this, I would:

- Add database indexes.
- Introduce query optimization.
- Cache analytics responses.
- Use pagination.
- Separate read and write workloads if necessary.
- Deploy behind a load balancer with horizontal scaling.

These improvements would significantly increase the application's capacity.

---

## 11. What is one thing in this assignment that you would improve, change, or challenge?

I appreciated the open-ended nature of the assignment because it reflects real engineering work.

One improvement I would suggest is providing a few non-functional requirements, such as an expected number of users, approximate traffic, or performance expectations.

This additional context would help candidates make more informed architectural decisions while still allowing creativity in the implementation.
