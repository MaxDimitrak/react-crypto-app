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

	function mapAssets(assets, result) {
		return assets.map(asset => {
			const coin = result.find((c) => c.id === asset.id)
			return {
				grow: coin.price > asset.price,
				curPrice: coin.price,
				name: coin.name,
				difference: (coin.price - asset.price).toFixed(3),
				difPercent: percentDifference(asset.price, coin.price),
				totalAmount: (asset.amount * coin.price).toFixed(3),
				totalProfit: ((asset.amount * coin.price) - (asset.amount * asset.price)).toFixed(2),
				...asset,
			}
		})

	}

	useEffect(() => {
		async function preload() {
			setLoading(true)
			const assets = await fetchCryptoAssets()
			const { result } = await fetchCryptoData()


			setAssets(mapAssets(assets, result))
			setCrypto(result)
			setLoading(false)

		}
		preload()
	}, [])

	function addAsset(asset) {
		setAssets(prev => mapAssets([...prev, asset], crypto))
	}

	return <CryptoContext.Provider value={{ addAsset, loading, assets, crypto }}>
		{children}
	</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
	return useContext(CryptoContext)
}