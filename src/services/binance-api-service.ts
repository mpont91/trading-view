export class BinanceApiService {
  async getPrices(symbols: string[]): Promise<Record<string, number>> {
    if (symbols.length === 0) return {}

    const formattedSymbols = encodeURIComponent(JSON.stringify(symbols))
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price?symbols=${formattedSymbols}`,
    )

    if (!response.ok) throw new Error('Error fetching Binance prices')

    const data: { symbol: string; price: string }[] = await response.json()

    const priceMap: Record<string, number> = {}
    for (const item of data) {
      priceMap[item.symbol] = parseFloat(item.price)
    }

    return priceMap
  }
}
