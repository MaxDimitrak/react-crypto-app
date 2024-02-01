import { cryptoData, cryptoAssets } from './data'

export function fetchCryptoData() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(cryptoData)
		}, 1)
	})
}

export function fetchCryptoAssets() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(cryptoAssets)
		}, 1)
	})
}