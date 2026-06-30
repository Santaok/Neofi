export async function getCryptoPrice(symbol) {
    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}USDT`
        );
        const data = await response.json();
        return {
            symbol: symbol.toUpperCase(),
            price: parseFloat(data.price),
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        console.error(`❌ Ошибка получения цены ${symbol}:`, error);
        return null;
    }
}

export async function getMultiplePrices(symbols) {
    const promises = symbols.map(sym => getCryptoPrice(sym));
    const results = await Promise.all(promises);
    return results.filter(result => result !== null);
}


export async function getTopCryptos(limit = 10) {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        const data = await response.json();
        return data.map(coin => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            marketCap: coin.market_cap,
            change24h: coin.price_change_percentage_24h,
            image: coin.image
        }));
    } catch (error) {
        console.error('❌ Ошибка получения топ монет:', error);
        return [];
    }
}

export async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            const chainId = await window.ethereum.request({
                method: 'eth_chainId'
            });
            
            return {
                address: accounts[0],
                chainId: parseInt(chainId),
                network: chainId === '0x38' ? 'BSC Mainnet' : 'Other'
            };
        } catch (error) {
            console.error('❌ Ошибка подключения:', error);
            return null;
        }
    } else {
        console.warn('⚠️ MetaMask не установлен');
        return null;
    }
}

export async function getWalletBalance(address) {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const balance = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [address, 'latest']
            });
            return parseInt(balance, 16) / 1e18; 
        } catch (error) {
            console.error('❌ Ошибка получения баланса:', error);
            return null;
        }
    }
}

export function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

export function formatPriceChange(change) {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
}