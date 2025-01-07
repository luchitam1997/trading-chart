import axios from 'axios'
import { Router } from 'express'

const router = Router()

// API trả dữ liệu bids và asks
router.get('/', async (req, res) => {
  const { data } = await axios({
    method: 'GET',
    url: 'https://testnet.mgfi.pro/gateway/deepbook/depth?symbol=DEEP_SUI&limit=100',
  })
  console.log(data)
  const orderBookData = {
    bids: [...data.bids],
    asks: [...data.asks],
  }
  res.json(orderBookData)
})

export default router
