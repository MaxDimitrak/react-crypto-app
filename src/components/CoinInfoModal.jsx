import React from 'react'
import { Typography, Flex, Divider, Statistic, List, Image, Card } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

const CoinInfoModal = ({ coin }) => {
	const price = coin.price.toFixed(3)
	const { Text, Paragraph, Title } = Typography;
	return (
		<>

			<Flex justify='space-between' align='center'>
				<Flex align='center' gap={10}>
					<Image src={coin.icon} width={40} />
					<Title level={3} style={{ margin: 0 }}>{coin.name} ({coin.symbol})</Title>
				</Flex>
				<Statistic
					style={{ paddingRight: 20 }}
					value={price + '$'}
					title={'Current price'}
				/>
			</Flex>
			<Divider orientation='left'>Trends</Divider>

			<Flex justify='space-between' align='center'>
				<Card>
					<Statistic
						title='1 hour: '
						value={coin.priceChange1h}
						valueStyle={{ color: coin.priceChange1h > 0 ? '#3f8600' : '#cf1322' }}
						prefix={coin.priceChange1h > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix="$"
					/>
				</Card>

				<Card>
					<Statistic
						title='1 day: '
						value={coin.priceChange1d}
						valueStyle={{ color: coin.priceChange1d > 0 ? '#3f8600' : '#cf1322' }}
						prefix={coin.priceChange1d > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix="$"
					/>
				</Card>

				<Card>
					<Statistic
						title='1 week: '
						value={coin.priceChange1w}
						valueStyle={{ color: coin.priceChange1w > 0 ? '#3f8600' : '#cf1322' }}
						prefix={coin.priceChange1w > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
						suffix="$"
					/>
				</Card>
			</Flex>
			<Divider orientation='left'>Additional Info</Divider>

			<List
				bordered>
				<List.Item><Paragraph><Text strong>Market Cap: </Text>{coin.marketCap}</Paragraph></List.Item>
				<List.Item><Paragraph><Text strong>Volume: </Text>{coin.volume}</Paragraph></List.Item>
				{coin.contractAddress && <List.Item><Paragraph><Text strong>Contact Address: </Text>{coin.contractAddress}</Paragraph></List.Item>}
			</List>

		</ >
	)
}

export default CoinInfoModal