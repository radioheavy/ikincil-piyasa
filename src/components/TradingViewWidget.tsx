"use client"

import { useEffect, useRef } from 'react'

let tvScriptLoadingPromise: Promise<void> | null = null

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = resolve as () => void

        document.head.appendChild(script)
      })
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    )

    return () => {
      onLoadScriptRef.current = null
    }
  }, [])

  function createWidget() {
    if (
      document.getElementById('tradingview-widget') &&
      'TradingView' in window
    ) {
      new (window as any).TradingView.widget({
        autosize: true,
        symbol: 'BINANCE:BTCUSDT', // Örnek sembol
        interval: '1D',
        timezone: 'Europe/Istanbul',
        theme: 'dark',
        style: '1',
        locale: 'tr',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: 'tradingview-widget',
      })
    }
  }

  return (
    <div id="tradingview-widget" className="h-full" />
  )
} 