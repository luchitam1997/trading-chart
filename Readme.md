# Real-Time Trading Chart MVP

This project demonstrates a real-time trading chart implementation using candlestick patterns. It consists of a frontend built with Next.js and a backend service that streams market data.

## Features

- Real-time candlestick chart visualization using Highcharts
- WebSocket integration for live data updates
- Trading data from DeepBook testnet API
- Clean, responsive UI with dark theme
- Time range selector (15m, 1h, 1D, All)
- Volume indicator

## Tech Stack

- Frontend:

  - Next.js 13+ (App Router)
  - TypeScript
  - Highcharts/Highstock
  - Socket.io Client
  - TailwindCSS

- Backend:
  - Node.js
  - Socket.io
  - Axios

## Getting Started

1. Clone the repository
2. Install dependencies in both frontend and backend directories:
   ```bash
   cd frontend && yarn install
   cd backend && yarn install
   ```
3. Start the backend server:
   ```bash
   cd backend && yarn start
   ```
4. Start the frontend development server:
   ```bash
   cd frontend && yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `frontend/`: Contains the Next.js application with the trading chart component
- `backend/`: Houses the WebSocket server that fetches and streams market data
- Main components:
  - `TradingChart`: Implements the interactive candlestick chart
  - `orderBookSocket`: Handles real-time data streaming

This MVP serves as a foundation for building more complex trading applications with additional features like order placement, multiple trading pairs, and advanced technical indicators.
