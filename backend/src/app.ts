import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import orderBookRoutes from './routes/orderBook'
import { setupOrderBookSocket } from './sockets/orderBookSocket'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/orderbook', orderBookRoutes)

// Socket setup
setupOrderBookSocket(io)

const PORT = 4000
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
