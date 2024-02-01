import { Layout, Card, Statistic, Typography, Tag, List } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
	padding: '1rem',
};



export default function AppSider() {
	const { assets } = useContext(CryptoContext)
	return (
		<Layout.Sider width="25%" style={siderStyle}>
			{assets.map(asset => (
				<Card key={asset.id} style={{ marginBottom: '10px' }}>
					<Statistic
						title={asset.symbol}
						value={asset.curPrice}
						precision={3}
						valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
						prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix='$'
					/>
					<List
						dataSource={[

							{ title: (asset.difPercent > 0) ? 'Increased by' : 'Decreased by', value: `${asset.difference} / ${asset.difPercent} %` },
							{ title: 'Total Amount', value: asset.amount, isText: true },
							{ title: 'Total Profit', value: asset.totalProfit },
							{ title: 'Total Sum', value: asset.totalAmount },
						]}
						size={"small"}
						renderItem={(item) => (
							<List.Item>
								<Typography.Text>{item.title}</Typography.Text>
								{item.isText && <Tag >{item.value}</Tag>}
								{!item.isText && <Tag color={asset.grow ? "green" : "red"}>{item.value}</Tag>}
							</List.Item>
						)}
					/>
				</Card>
			))}
		</Layout.Sider>
	)
}