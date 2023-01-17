/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom'
import { useState } from 'react';
import BarChart from '../../components/chart/BarChart';
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'


const h1Style = css`
	height: 5vh;
	background-color: #fff;
`
const divStyle = css`
	display: flex;
	flex-direction: column ;
`
export default function TotalIncome() {
	const urlName = useLocation().pathname
	return (
		<div css={divStyle}>
			<Nav />
			<h1 css={h1Style}>
				{urlName === '/admin/total_income' ? 'TOTAL INCOME' : 'TOTAL USEAGE'}
			</h1>
			<BarChart />
			<BarChart />
			<Footer />
		</div>
	)
}