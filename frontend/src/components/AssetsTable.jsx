import React from 'react';
import { Table } from 'antd'
import { useCrypto } from '../context/crypto-context';


const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Price, $',
		dataIndex: 'price',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.amount - b.amount,
	},
];

const AssetsTable = () => {

	const { assets, crypto } = useCrypto()

	const data = assets.map(asset => ({
		key: asset.id,
		name: asset.name,
		price: asset.price,
		amount: asset.amount,
	}))

	return (
		<div>
			<Table
				style={{ marginTop: '50px' }}
				pagination={false}
				columns={columns}
				dataSource={data}
			/>
		</div>

	)
}

export default AssetsTable