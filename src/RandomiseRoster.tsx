import React, { Component } from 'react'
import { render } from 'react-dom'
import charIconsP1 from './iconsP1'
import App from './App'
import Button from 'react-bootstrap/Button';

export interface RandomiseRosterProps {
	changeRoster: any
}

export function RandomiseRoster({ changeRoster }: RandomiseRosterProps) {
	return (
		<div className=''>
			<Button onClick={() => changeRoster(charIconsP1)} variant="primary" size="lg" block>
    			Generate New Roster
		  	</Button>
			{/* <button onClick={() => changeRoster(charIconsP1)}>
				Click to generate a new roster
			</button> */}
		</div>
	)
}

export default RandomiseRoster
