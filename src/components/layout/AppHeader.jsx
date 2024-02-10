import { Select, Space, Layout, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useEffect, useState } from 'react';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
	width: '100%',
	textAlign: 'center',
	height: 60,
	padding: '1rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: 'white',
};

export default function AppHeader() {

	const { crypto } = useCrypto()
	const [isSelectOpen, setIsSelectOpen] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [coinInfo, setCoinInfo] = useState()

	function handleSelect(value) {
		setCoinInfo(crypto.find(coin => coin.id === value))
		setIsModalOpen(true)
	}

	function onClose() {
		setIsDrawerOpen(false)
	}

	useEffect(() => {
		const keypressHandler = (event) => {
			if (event.key === '/') {
				setIsSelectOpen(prev => !prev)
			}
		};
		document.addEventListener('keypress', keypressHandler)
		return () => document.removeEventListener('keypress', keypressHandler)
	}, [])

	return (
		<Layout.Header style={headerStyle}>
			<Select
				style={{
					width: '400px',
				}}
				open={isSelectOpen}
				onSelect={handleSelect}
				onClick={() => setIsSelectOpen(prev => !prev)}
				placeholder="press / to open"
				optionLabelProp="label"
				options={crypto.map(coin => (
					{
						label: coin.name,
						value: coin.id,
						icon: coin.icon,
					}
				))}
				optionRender={(option) => (
					<Space>
						<img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} />
						{option.data.label}
					</Space>
				)}
			/>
			<Button type="primary" onClick={() => setIsDrawerOpen(true)}>Add Asset</Button>
			<Modal
				width={600}
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}>
				<CoinInfoModal coin={coinInfo} />
			</Modal>
			<Drawer
				width='700px'
				title="Add Asset"
				onClose={() => setIsDrawerOpen(false)}
				destroyOnClose
				open={isDrawerOpen}>
				<AddAssetForm onClose={onClose} />
			</Drawer>
		</Layout.Header >
	)
}