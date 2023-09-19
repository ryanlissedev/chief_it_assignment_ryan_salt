Yak Shop Web Application
A web-based platform for a Yak Shepherd to sell Yak products online.

Features
Load new herd via REST services.
View current herd and stock.
Place orders for Yak products.
Real-time updates on stock and herd.
Surprise component for enhanced user experience.
Tech Stack
Backend:

.NET 7
PostgreSQL
Frontend:

Next.js with TypeScript
Tailwind CSS for styling
React Query for data fetching and state management
Main Components
Backend:

Models: Yak, Order, Stock
Controllers: YakShopController
Services: YakService, OrderService, StockService
DbContext: YakShopContext
Frontend:

Components: Herd, Stock, OrderForm, ThankYouPage, SurpriseComponent
Hooks: RealTimeUpdateHook
Services: api.ts for Axios API calls
Usage
Load new herd: POST request to /yak-shop/load.
View stock after T days: GET request to /yak-shop/stock/T.
View herd after T days: GET request to /yak-shop/herd/T.
Place order: POST request to /yak-shop/order/T.
Installation
Clone the repository.
Set up PostgreSQL and update connection string.
Backend: Restore packages and run the project.
Frontend: Install dependencies (npm install) and start the app (npm run dev).
