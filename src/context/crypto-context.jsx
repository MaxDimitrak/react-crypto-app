import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCryptoAssets, fetchCryptoData } from '../api';
import { percentDifference } from '../utils';

const CryptoContext = createContext({
	assets: [],
	crypto: [],
	loading: false,
})

export function CryptoContextProvider({ children }) {

	const [loading, setLoading] = useState(true);
	const [assets, setAssets] = useState([]);
	const [crypto, setCrypto] = useState([]);


	useEffect(() => {
		async function preload() {
			setLoading(true)
			const fetchAssets = await fetchCryptoAssets()
			const { result } = await fetchCryptoData()

			const readyAssets = fetchAssets.map((asset) => {
				const coin = result.find((c) => c.id === asset.id)
				return {
					grow: coin.price > asset.price,
					curPrice: coin.price,
					difference: (coin.price - asset.price).toFixed(2),
					difPercent: percentDifference(asset.price, coin.price),
					totalAmount: (asset.amount * coin.price).toFixed(2),
					totalProfit: ((asset.amount * coin.price) - (asset.amount * asset.price)).toFixed(2),
					...asset,
				}
			})
			setAssets(readyAssets)
			setCrypto(result)
			setLoading(false)

		}
		preload()
	}, [])

	return <CryptoContext.Provider value={{ loading, assets, crypto }}>
		{children}
	</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
	return useContext(CryptoContext)
}