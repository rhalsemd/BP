/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import DropDown from '../UI/DropDown'

const chartStyle = css`
	height: 60vh;
	width: 90vw;
	background-color: #F9FAFB;
`
const rightRight = css`
	display: flex;
	justify-content: flex-end;
`

const centerCenter = css`
	display: flex;
	justify-content: center;
	margin-bottom: 50px
`

export default function BarChart() {
	return (
		<>
			<div css={rightRight}>
				<DropDown />
			</div>
			<div css={centerCenter}>
				<div css={chartStyle}>
					<h1>Chart</h1>
				</div>
			</div>
		</>
	)
}
