# CryptoDash - Refactored Architecture

## Overview
CryptoDash has been successfully refactored from a monolithic single-file React app into a well-organized, component-based architecture following React best practices. The app maintains 100% functionality while gaining scalability, maintainability, and performance improvements through lazy loading.

## Project Structure

```
src/
├── assets/                    # Static assets
├── components/
│   ├── Common/               # Reusable UI components
│   │   ├── GlobalStyles.jsx
│   │   ├── Divider.jsx
│   │   ├── Spinner.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Chip.jsx
│   │   ├── Badge.jsx
│   │   ├── StatBox.jsx
│   │   ├── SkeletonCard.jsx
│   │   ├── Spark.jsx
│   │   └── index.js
│   ├── Coin/                 # Coin display components
│   │   ├── CoinCard.jsx
│   │   ├── CoinRow.jsx
│   │   ├── ChartModal.jsx
│   │   └── index.js
│   ├── Layout/               # Layout components
│   │   ├── Header.jsx
│   │   ├── Controls.jsx
│   │   └── index.js
│   ├── Pages/                # Page-level components (lazy-loaded)
│   │   ├── DashboardPage.jsx
│   │   ├── WatchlistPage.jsx
│   │   ├── PortfolioPage.jsx
│   │   ├── AlertsPage.jsx
│   │   └── index.js
│   ├── CryptoDashApp.jsx     # Main app orchestrator
├── context/                   # React Context & State Management
│   └── AppContext.js
├── constants/                 # Configuration & Constants
│   ├── themes.js
│   └── api.js
├── hooks/                     # Custom React Hooks
│   └── useApp.js
├── utils/                     # Utility Functions
│   ├── formatters.js
│   └── sort.js
├── App.jsx                    # Entry point
├── main.jsx                   # Bootstrap file
└── index.css                  # Global styles
```

## Architecture Benefits

### 1. **Modular Component Structure**
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Common components can be used across multiple pages
- **Maintainability**: Easy to find and update specific functionality
- **Testability**: Each component can be tested in isolation

### 2. **Lazy Loading with React.lazy() & Suspense**
```jsx
const DashboardPage = lazy(() =>
  import("../components/Pages").then((m) => ({ default: m.DashboardPage }))
);
const WatchlistPage = lazy(() =>
  import("../components/Pages").then((m) => ({ default: m.WatchlistPage }))
);
// ... other pages
```
- **Code Splitting**: Each page is loaded on-demand, reducing initial bundle size
- **Suspense Boundary**: Shows a loading spinner while pages are loading
- **Performance**: Only downloads code needed for the current view

### 3. **Centralized State Management**
- **AppContext.js**: Single source of truth for app state using useReducer
- **useApp Hook**: Custom hook for easy access to state and dispatch
- **Predictable Updates**: All state changes go through well-defined reducer actions

### 4. **Utility Functions Extracted**
- **formatters.js**: Price formatting, percent formatting, UID generation
- **sort.js**: Coin sorting logic
- **Reusable**: Can be imported and used anywhere in the app

### 5. **Constants Centralized**
- **themes.js**: Dark and light theme definitions
- **api.js**: API configuration, currencies, sort options, navigation items
- **Maintainability**: Easy to update constants globally

## Key Features Preserved

✅ **Live Cryptocurrency Data**
- Real-time market data from CoinGecko API
- Auto-refresh every 60 seconds
- Support for multiple currencies (USD, EUR, GBP, JPY)

✅ **Dashboard**
- Grid and list view modes
- Search and sort functionality
- 7-day price sparklines
- Skeleton loading states

✅ **Watchlist**
- Star/unstar coins for tracking
- Persisted state management
- Quick access to favorite coins

✅ **Portfolio Tracker**
- Add and track cryptocurrency holdings
- Calculate P&L (Profit & Loss)
- Visual allocation charts
- Real-time portfolio valuation

✅ **Price Alerts**
- Set price triggers (above/below)
- Track alert status
- Triggered alerts notification
- Alert management interface

✅ **Charts**
- Interactive price charts
- Area and bar chart types
- Multiple time ranges (24H, 7D, 1M, 3M, 1Y)
- Real-time tooltips

✅ **Theme System**
- Dark and light theme support
- Theme toggle in header
- Persistent theme selection

## Component Hierarchy

```
App
└── AppProvider
    └── CryptoDashApp
        ├── GlobalStyles
        ├── Header
        │   ├── Navigation
        │   ├── Currency Selector
        │   ├── Theme Toggle
        │   └── Mobile Menu
        ├── Main Content
        │   ├── DashboardPage (lazy)
        │   │   ├── Controls
        │   │   ├── CoinCard/CoinRow
        │   │   └── Spark Charts
        │   ├── WatchlistPage (lazy)
        │   │   └── CoinCard
        │   ├── PortfolioPage (lazy)
        │   │   ├── StatBox
        │   │   ├── BarChart
        │   │   └── Holdings Table
        │   └── AlertsPage (lazy)
        │       ├── Alert Form
        │       └── Alert Display
        └── ChartModal
            ├── AreaChart/BarChart
            └── Range Selector
```

## State Management

### Redux-like Reducer Pattern
```jsx
const appReducer = (state, action) => {
  switch(action.type) {
    case "COINS":       // Update coin data
    case "LOADING":     // Toggle loading state
    case "ERROR":       // Handle errors
    case "SEARCH":      // Filter coins
    case "SORT":        // Change sort order
    case "CURRENCY":    // Switch currency
    case "VIEW":        // Toggle grid/list view
    case "PAGE":        // Navigate between pages
    case "THEME":       // Toggle theme
    case "COIN":        // Select coin for chart
    case "WATCH":       // Add/remove from watchlist
    case "ADD_H":       // Add portfolio holding
    case "DEL_H":       // Remove portfolio holding
    case "ADD_A":       // Create price alert
    case "DEL_A":       // Delete price alert
  }
}
```

## Performance Optimizations

1. **Lazy Loading**: Pages load only when needed
2. **useMemo**: Filtered coins and market stats are memoized
3. **useCallback**: API fetching function is stable across renders
4. **Code Splitting**: Separate chunks for different pages reduce initial load
5. **Efficient Rendering**: Components only re-render when their props change

## How to Use

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts dev server, typically on `http://localhost:5173`

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview
```bash
npm run preview
```
Preview the production build locally

## Adding New Features

### Example: Adding a new page

1. Create the page component in `src/components/Pages/`
2. Export it from `src/components/Pages/index.js`
3. Lazy load it in `CryptoDashApp.jsx`:
   ```jsx
   const MyNewPage = lazy(() =>
     import("../components/Pages").then((m) => ({ default: m.MyNewPage }))
   );
   ```
4. Add it to the router in `CryptoDashApp.jsx`:
   ```jsx
   {state.page === "mynewpage" && (
     <Suspense fallback={<PageLoader t={t} />}>
       <MyNewPage sym={sym} t={t} />
     </Suspense>
   )}
   ```
5. Add navigation item to `constants/api.js` NAVIGATION array

### Example: Adding a new reusable component

1. Create the component in `src/components/Common/`
2. Export it from `src/components/Common/index.js`
3. Import and use across your components

## Best Practices Applied

✅ **Single Responsibility Principle**: Each component has one clear purpose
✅ **DRY (Don't Repeat Yourself)**: Reusable components and utilities
✅ **Composition**: Build UI from small, composable pieces
✅ **Props Drilling Minimized**: Uses Context API for global state
✅ **Performance**: Lazy loading and memoization
✅ **Code Organization**: Logical folder structure
✅ **Naming Conventions**: Clear, descriptive names
✅ **Component Isolation**: Components are independent and testable

## API Integration

The app fetches from **CoinGecko API** (free, no auth required):
- **Main endpoint**: `https://api.coingecko.com/api/v3/coins/markets`
- **Chart data**: `https://api.coingecko.com/api/v3/coins/{id}/market_chart`
- **Refresh rate**: Auto-updates every 60 seconds
- **Rate limiting**: Graceful error handling for rate limits

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers supported with responsive design

## Future Improvements

- [ ] Add unit and integration tests
- [ ] Implement TypeScript for type safety
- [ ] Add Firebase/Backend for persistent storage
- [ ] Implement PWA features (offline support)
- [ ] Add more chart types and indicators
- [ ] Email/SMS alerts integration
- [ ] Export portfolio data to CSV
- [ ] Multi-user accounts and sync

## Technical Stack

- **React 19.2+**: Latest React with Concurrent features
- **Vite 8.0-beta**: Fast build tool and dev server
- **Recharts 3.7**: React charting library
- **Context API**: State management
- **CSS-in-JS**: Inline styling for component styling
- **JavaScript ES6+**: Modern JavaScript features

## Contributing

When contributing to this project:

1. Maintain the component-based structure
2. Follow the existing naming conventions
3. Extract reusable logic to utils
4. Keep components focused and single-purpose
5. Use the existing Context API for state
6. Test components in isolation
7. Keep the mobile-first responsive design

## License

MIT

---

**Last Updated**: February 2026  
**Version**: 2.0.0 (Refactored Architecture)
