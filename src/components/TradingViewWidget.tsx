"use client"

import { useEffect, useRef, useState } from 'react'

interface TradingViewWidgetProps {
  symbol?: string
  interval?: string
  theme?: 'light' | 'dark'
  width?: string | number
  height?: string | number
  showFloatingTooltip?: boolean
  showVolume?: boolean
  scalePosition?: 'right' | 'left' | 'no'
}

let tvScriptLoadingPromise: Promise<void> | null = null

export default function TradingViewWidget({
  symbol = 'BINANCE:BTCUSDT',
  interval = '1D',
  theme = 'dark',
  width = '100%',
  height = '100%',
  showFloatingTooltip = true,
  showVolume = true,
  scalePosition = 'right'
}: TradingViewWidgetProps) {
  const onLoadScriptRef = useRef<(() => void) | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    onLoadScriptRef.current = createWidget

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script')
        script.id = 'tradingview-widget-loading-script'
        script.src = 'https://s3.tradingview.com/tv.js'
        script.type = 'text/javascript'
        script.onload = () => {
          setIsLoading(false)
          resolve()
        }

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
        symbol: symbol,
        interval: interval,
        timezone: 'Europe/Istanbul',
        theme: theme,
        style: '1',
        locale: 'tr',
        toolbar_bg: theme === 'dark' ? '#1a1a1a' : '#f1f3f6',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        container_id: 'tradingview-widget',
        library_path: '/charting_library/',
        width: width,
        height: height,
        save_image: true,
        hide_top_toolbar: false,
        studies: [
          'MASimple@tv-basicstudies',
          'RSI@tv-basicstudies',
          'MACD@tv-basicstudies'
        ],
        drawings_access: {
          type: 'all',
          tools: [
            { name: 'Regression Trend' },
            { name: 'Trend Line' },
            { name: 'Fibonacci Retracement' }
          ]
        },
        disabled_features: [
          'header_symbol_search',
          'header_screenshot',
          'header_compare'
        ],
        enabled_features: [
          'study_templates',
          'use_localstorage_for_settings',
          showFloatingTooltip && 'floating_tooltips',
          'side_toolbar_in_fullscreen_mode'
        ].filter(Boolean),
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user',
        loading_screen: {
          backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          foregroundColor: theme === 'dark' ? '#434651' : '#787b86'
        },
        overrides: {
          'mainSeriesProperties.style': 1,
          'mainSeriesProperties.showCountdown': true,
          'scalesProperties.scalePosition': scalePosition,
          'paneProperties.background': theme === 'dark' ? '#1a1a1a' : '#ffffff',
          'paneProperties.vertGridProperties.color': theme === 'dark' ? '#242424' : '#e1e3eb',
          'paneProperties.horzGridProperties.color': theme === 'dark' ? '#242424' : '#e1e3eb',
          'symbolWatermarkProperties.transparency': 90,
          'scalesProperties.textColor': theme === 'dark' ? '#9ca3af' : '#131722',
          'mainSeriesProperties.candleStyle.upColor': '#22c55e',
          'mainSeriesProperties.candleStyle.downColor': '#ef4444',
          'mainSeriesProperties.candleStyle.drawWick': true,
          'mainSeriesProperties.candleStyle.drawBorder': true,
          'mainSeriesProperties.candleStyle.borderColor': '#378658',
          'mainSeriesProperties.candleStyle.borderUpColor': '#22c55e',
          'mainSeriesProperties.candleStyle.borderDownColor': '#ef4444',
          'mainSeriesProperties.candleStyle.wickUpColor': '#22c55e',
          'mainSeriesProperties.candleStyle.wickDownColor': '#ef4444',
          'paneProperties.legendProperties.showStudyArguments': true,
          'paneProperties.legendProperties.showStudyTitles': true,
          'paneProperties.legendProperties.showStudyValues': true,
          'paneProperties.legendProperties.showSeriesTitle': true,
          'paneProperties.legendProperties.showSeriesOHLC': true,
          'mainSeriesProperties.showPriceLine': true,
          'mainSeriesProperties.priceLineWidth': 1,
          'mainSeriesProperties.priceLineColor': theme === 'dark' ? '#3179f5' : '#2962ff',
          'mainSeriesProperties.showPrevClosePriceLine': true,
          'mainSeriesProperties.prevClosePriceLineWidth': 1,
          'mainSeriesProperties.prevClosePriceLineColor': theme === 'dark' ? '#ff9800' : '#fb8c00',
          'volumePaneSize': showVolume ? 'medium' : 'tiny'
        }
      })
    }
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-400">Grafik yükleniyor...</span>
          </div>
        </div>
      )}
      <div id="tradingview-widget" className="h-full" />
    </div>
  )
} 