import { React, useRef, useState } from 'react'
import {
	Select,
	Space,
	Typography,
	Flex,
	Image,
	Divider,
	Button,
	Form, InputNumber,
	DatePicker,
	Result
} from 'antd'
import { useCrypto } from '../context/crypto-context'

const AddAssetForm = ({ onClose }) => {

	const [coin, setCoin] = useState(null);
	const [submitted, setSubmitted] = useState(false);

	const { addAsset, crypto } = useCrypto();

	const { Title } = Typography;

	const [form] = Form.useForm();

	const assetRef = useRef();


	const onFinish = (values) => {
		const newAsset = {
			id: coin.id,
			amount: values.amount,
			symbol: coin.symbol,
			price: values.price,
			date: values.date?.$d ?? new Date()
		}
		assetRef.current = newAsset
		setSubmitted(true);
		addAsset(newAsset);
	}

	const handleAmountChange = (value) => {
		form.setFieldsValue({
			total: +(value * coin.price).toFixed(3),
		})
	}

	const validateMessages = {
		required: '${label} is required!',
		types: {
			number: '${label} is not a valid number',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		}
	};

	//////////////////////////////////////////////////////////////// if coin is not chosen yet
	if (!coin) {
		return (
			<Select
				style={{
					width: '100%',
				}}
				onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
				placeholder="Select Coin"
				optionLabelProp="label"
				options={
					crypto.map(coin => (
						{
							label: coin.name,
							value: coin.id,
							icon: coin.icon,
						}
					))
				}
				optionRender={(option) => (
					<Space>
						<img style={{ width: '20px' }} src={option.data.icon} alt={option.data.label} />
						{option.data.label}
					</Space>
				)}
			/>
		)
	}

	//////////////////////////////////////////////////////////////// 

	//////////////////////////////////////////////////////////////// if submitted

	if (submitted) {
		return (
			<Result
				status="success"
				title="Coin was added successfully"
				subTitle={`The ${assetRef.current.amount} ${coin.name} was added successfully by price: ${+coin.price.toFixed(3)}`}
				extra={[
					<Button
						onClick={onClose}
						type="primary"
						key="console">
						Go to main page
					</Button>
				]}
			/>
		)
	}
	//////////////////////////////////////////////////////////////// if coin was choose but not submitted yet
	return (
		<Form
			form={form}
			name="basic"
			labelCol={{
				span: 4,
			}
			}
			wrapperCol={{
				span: 10,
			}}
			style={{
				maxWidth: 600,
			}}
			initialValues={{
				price: +coin.price.toFixed(3),
			}}
			onFinish={onFinish}
			validateMessages={validateMessages}
		>
			<Flex gap={10} align='center'>
				<Image src={coin.icon} width={40} />
				<Title level={3} style={{ margin: 0 }}>{coin.name} ({coin.symbol})</Title>
			</Flex>

			<Divider />

			<Form.Item
				label="Amount"
				name="amount"
				rules={[
					{
						type: 'number',
						required: true,
						min: 0,
					},
				]}
			>
				<InputNumber
					placeholder='Enter coin amount'
					onChange={handleAmountChange}
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item label="Price" name="price">
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item label="Total" name="total">
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item label="Date & Time" name="date&time">
				<DatePicker showTime style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Add Asset
				</Button>
			</Form.Item>
		</Form >
	)
}

export default AddAssetForm