import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable'

const contentStyle = {
	textAlign: 'center',
	minHeight: 'calc(100vh - 60px)',
	lineHeight: '120px',
	color: '#fff',
	backgroundColor: '#001529',
	padding: '1rem'
};

export default function AppContent() {

	const { assets, crypto } = useCrypto()

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={2} style={{ textAlign: 'left', color: '#fff' }}>
				Portfolio: {assets.map((asset) => {
					const coin = crypto.find(c => c.id === asset.id)
					return asset.amount * coin.price
				}).reduce((acc, asset) => acc += asset, 0).toFixed(3)}$
			</Typography.Title>
			<PortfolioChart />
			<AssetsTable />
		</Layout.Content>
	)
}