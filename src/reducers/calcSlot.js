import { dbAircraft } from './dbStore'

export function calcSlotFirepower( aircraftId ) {
	var aircraftSelect = dbAircraft.chain().find({ 'id': aircraftId }).data()
	var output = {}
	
	output.firepower = aircraftSelect[0].firepower
	switch ( aircraftSelect[0].type) {
		case "bomber":
			output.firepower = output.firepower + aircraftSelect[0].bomb * 1.3
		break
		case "torpedo":
			output.firepower = output.firepower + aircraftSelect[0].torpedo
		break
	}
	output.firepower = Math.floor( output.firepower * 1.5 )
	output.hit = aircraftSelect[0].hit
	output.evade = aircraftSelect[0].evade
	return output
}

export function calcSlotAirstrike( aircraftId, slot ) {
	var aircraftSelect = dbAircraft.chain().find({ 'id': aircraftId }).data()
	var output = {}
	var tempDam = 0
	
	switch ( aircraftSelect[0].type) {
		case "bomber":
			tempDam = aircraftSelect[0].bomb * Math.sqrt(slot) + 25
			output.as1 = tempDam
			output.as2 = 0
		break
		case "torpedo":
			tempDam = aircraftSelect[0].torpedo * Math.sqrt(slot) + 25
			output.as1 = Math.floor( tempDam * 0.8 )
			output.as2 = Math.floor( tempDam * 1.5 )
		break
	}
	return output
}

export function calcSlotSonar( aircraftId ) {
	var aircraftSelect = dbAircraft.chain().find({ 'id': aircraftId }).data()
	var output = {}
	
	switch ( aircraftSelect[0].type) {
		case "bomber":
		case "torpedo":
		case "seaplane":
		case "heli":
		case "blue":
		case "big":
			output.firepower = aircraftSelect[0].sonar
		break
	}
	output.firepower = Math.floor( output.firepower * 1.5 )
	output.hit = aircraftSelect[0].hit
	output.evade = aircraftSelect[0].evade
	return output
}

export function calcSlotAircontrol(aircraftId, slotSize, slotSkill ) {
	var aircraftSelect = dbAircraft.findOne({'id': aircraftId })
	var acValue = 0
	
	switch ( aircraftSelect.type ) {
		case 'fighter':
		case 'seaplaneX':
			acValue = acValue + Math.floor( aircraftSelect.air * Math.sqrt(slotSize))

			switch ( slotSkill ) {
				case 1:
					acValue = acValue + 0 + 1
					break
				case 2:
					acValue = acValue + 2 + 1
					break
				case 3:
					acValue = acValue + 5 + 2
					break
				case 4:
					acValue = acValue + 9 + 2
					break
				case 5:
					acValue = acValue + 14 + 2
					break
				case 6:
					acValue = acValue + 14 + 3
					break
				case 7:
					acValue = acValue + 22 + 3
					break
			}
			
			break
		case 'bomber':
		case 'torpedo':
			if ( aircraftSelect.air > 0 ) {
				acValue = acValue + Math.floor( aircraftSelect.air * Math.sqrt(slotSize))
			}
			
			switch ( slotSkill ) {
				case 1:
					acValue = acValue + 1
					break
				case 2:
					acValue = acValue + 1
					break
				case 3:
					acValue = acValue + 2
					break
				case 4:
					acValue = acValue + 2
					break
				case 5:
					acValue = acValue + 2
					break
				case 6:
					acValue = acValue + 3
					break
				case 7:
					acValue = acValue + 3
					break
			}
			
			break 
		case 'seaplane':
			if ( aircraftSelect.air > 0 ) {
				acValue = acValue + Math.floor( aircraftSelect.air * Math.sqrt(slotSize))
			}
			
			switch ( slotSkill ) {
				case 1:
					acValue = acValue + 0 + 1
					break
				case 2:
					acValue = acValue + 1 + 1
					break
				case 3:
					acValue = acValue + 1 + 2
					break
				case 4:
					acValue = acValue + 1 + 2
					break
				case 5:
					acValue = acValue + 3 + 2
					break
				case 6:
					acValue = acValue + 3 + 3
					break
				case 7:
					acValue = acValue + 6 + 3
					break
			}
			break
	}
	
	return acValue
}

export function calcSlotScout( aircraftId, slotSize ) {
	var aircraftSelect = dbAircraft.chain().find({ 'id': aircraftId }).data()
	var output = 0
	
	switch ( aircraftSelect[0].type ) {
		case "scout":
		case "scout2":
		case "big":
			output = 4 * aircraftSelect[0].scout * Math.sqrt(slotSize)
		break
	}
	return output
}