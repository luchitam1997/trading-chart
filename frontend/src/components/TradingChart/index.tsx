'use client'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')

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

export default function TradingChart() {
  const [chartData, setChartData] = useState<KlineData[]>([])
  const options = {
    chart: {
      backgroundColor: '#131722',
      style: {
        fontFamily: "'Trebuchet MS', Verdana, sans-serif",
      },
    },
    navigator: {
      enabled: true,
      height: 30,
    },
    rangeSelector: {
      enabled: true,
      buttons: [
        {
          type: 'minute',
          count: 15,
          text: '15m',
        },
        {
          type: 'hour',
          count: 1,
          text: '1h',
        },
        {
          type: 'day',
          count: 1,
          text: '1D',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      selected: 1,
      inputEnabled: false,
    },
    yAxis: [
      {
        height: '60%',
        labels: {
          align: 'right',
          x: -3,
          style: {
            color: '#cccccc',
          },
        },
        title: {
          text: 'OHLC',
          style: {
            color: '#cccccc',
          },
        },
        lineColor: '#333333',
        gridLineColor: '#333333',
      },
      {
        top: '65%',
        height: '35%',
        labels: {
          align: 'right',
          x: -3,
          style: {
            color: '#cccccc',
          },
        },
        offset: 0,
        title: {
          text: 'Volume',
          style: {
            color: '#cccccc',
          },
        },
        lineColor: '#333333',
        gridLineColor: '#333333',
      },
    ],
    series: [
      {
        data: chartData.map((data) => [
          Number(data.klineOpenTime),
          Number(data.openPrice),
          Number(data.highPrice),
          Number(data.lowPrice),
          Number(data.closePrice),
        ]),
        type: 'candlestick',
        name: 'DEEP_SUI',
        id: 'DEEP_SUI',
        upColor: '#26a69a',
        upLineColor: '#26a69a',
        downColor: '#ef5350',
        downLineColor: '#ef5350',
        lineColor: undefined,
      },
      {
        type: 'column',
        name: 'Volume',
        data: chartData.map((data) => [
          Number(data.klineOpenTime),
          Number(data.volume),
        ]),
        yAxis: 1,
        color: '#3C3C3C',
      },
    ],
    tooltip: {
      split: false,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#ffffff',
      },
    },
    plotOptions: {
      candlestick: {
        color: '#ef5350',
        lineColor: '#ef5350',
        upColor: '#26a69a',
        upLineColor: '#26a69a',
      },
    },
    scrollbar: {
      enabled: false,
    },
  }

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }
    socket.on('orderBookData', (data: KlineData) => {
      setChartData((prev) => [...prev, data])
    })

    return () => {
      socket.off('orderBookData')
    }
  }, [])
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      constructorType={'stockChart'}
      allowChartUpdate={true}
    />
  )
}
