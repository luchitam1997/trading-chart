import axios from 'axios'
import { Server } from 'socket.io'

interface KlineData {
  id: number
  poolId: string
  klineOpenTime: string
  klineCloseTime: string
  openPrice: string
  highPrice: string
  lowPrice: string
  closePrice: string
  volume: string
  quoteAssetVolume: string
  takerBuyBaseAssetVolume: string
  takerBuyQuoteAssetVolume: string
  numberOfTrades: number
}

export const setupOrderBookSocket = async (io: Server) => {
  let chartData: KlineData
  const { data } = (await axios({
    method: 'GET',
    url: 'https://testnet.mgfi.pro/gateway/deepbook/klines?symbol=DEEP_SUI',
  })) as { data: KlineData[] }

  let count = 0

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // Create interval to send updated data every 2 seconds
    const interval = setInterval(() => {
      // Update orderbook with new data from API

      if (count >= data.length) {
        count = 0
        clearInterval(interval)
      }

      chartData = data[count]
      count++

      // Broadcast updated orderbook to all connected clients
      io.emit('orderBookData', chartData)
    }, 2000)

    // Clean up interval when client disconnects
    socket.on('disconnect', () => {
      clearInterval(interval)
      console.log('Client disconnected:', socket.id)
      chartData = data[0]
      count = 0
    })
  })
}
