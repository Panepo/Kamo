import { dbCarrier } from './database'
import { searchName, searchSlot, searchSkill, searchText, searchFactory, searchShort, listAircraftSkill2 } from '../constants/ConstList'
import { calcSlotAircontrol, calcSlotScout, calcSlotScout2, calcSlotText } from './calcSlot'

export function calcGroupAir(input) {
	var output = {}
	output.ac = 0
	output.scout = 0
	output.hit0 = []
	output.hit1 = []
	output.hit2 = []
	output.hit3 = []
	var tempObject = {}
	
	for (var i=0; i<input.length; i++) {
		for (var j=0; j<searchName.length; j++) {
			if ( input[i][searchName[j]] ) {
				output.ac = output.ac + calcSlotAircontrol(input[i][searchName[j]],input[i][searchSlot[j]], input[i][searchSkill[j]], input[i][searchFactory[j]] )
				output.scout = output.scout + calcSlotScout(input[i][searchName[j]],input[i][searchSlot[j]] )
				tempObject = calcSlotScout2( input[i][searchName[j]] )
				if ( tempObject.hit0 > 0 ) {
					output.hit0.push( tempObject.hit0 )
				}
				if ( tempObject.hit1 > 0 ) {
					output.hit1.push( tempObject.hit1 )
				}
				if ( tempObject.hit2 > 0 ) {
					output.hit2.push( tempObject.hit2 )
				}
				if ( tempObject.hit3 > 0 ) {
					output.hit3.push( tempObject.hit3 )
				}
			}
		}
	}
	
	
	var tempChance = 1
	for (var i=0; i<output.hit3.length; i++) {
		tempChance = tempChance * ( 1 - output.hit3[i] )
	}
	output.chance3 = 1 - tempChance
	
	tempChance = 1
	for (var i=0; i<output.hit2.length; i++) {
		tempChance = tempChance * ( 1 - output.hit2[i] )
	}
	output.chance2 = (1 - tempChance)*(1 - output.chance3)
	
	tempChance = 1
	for (var i=0; i<output.hit1.length; i++) {
		tempChance = tempChance * ( 1 - output.hit1[i] )
	}
	output.chance1 = (1 - tempChance)*(1 - output.chance2 - output.chance3)
	
	tempChance = 1
	for (var i=0; i<output.hit0.length; i++) {
		tempChance = tempChance * ( 1 - output.hit0[i] )
	}
	output.chance0 = (1 - tempChance)*(1 - output.chance1 - output.chance2 - output.chance3)
	
	output.airDamage = 1 + 0.2 * output.chance3 + 0.17 * output.chance2 + 0.12 * ( output.chance0 + output.chance1)
	
	output.scout = Math.floor(output.scout)
	output.chance0 = Math.floor(output.chance0*100)
	output.chance1 = Math.floor(output.chance1*100)
	output.chance2 = Math.floor(output.chance2*100)
	output.chance3 = Math.floor(output.chance3*100)
	output.airDamage = Math.floor(output.airDamage*100)
	
	return output
}

export function calcGroupText( aircraftId, aircraftType, aircraftSkill, aircraftFactory ) {
	var carrierSelected = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('type').data()
	
	if ( aircraftId.length > 0 ) {
		for (var i=0; i<carrierSelected.length; i++) {
			var seletcedTarget = dbCarrier.findOne({'id': carrierSelected[i].id })
			for (var j=0; j<searchName.length; j++) {
				if ( !seletcedTarget[searchName[j]] ) {
					if ( seletcedTarget[aircraftType] === 1 ) {
						seletcedTarget[searchText[j]] = calcSlotText( aircraftId, aircraftType, seletcedTarget[searchSlot[j]], aircraftSkill, aircraftFactory)
						dbCarrier.update(seletcedTarget)
					} else {
						seletcedTarget[searchText[j]] = "裝載不可(" + seletcedTarget[searchSlot[j]] + ")"
						dbCarrier.update(seletcedTarget)
					}
				}
			}
		}
	} else {
		for (var i=0; i<carrierSelected.length; i++) {
			var seletcedTarget = dbCarrier.findOne({'id': carrierSelected[i].id })
			for (var j=0; j<searchName.length; j++) {
				seletcedTarget[searchText[j]] = seletcedTarget[searchSlot[j]]
				dbCarrier.update(seletcedTarget)
			}
		}
	}
}

export function calcOutputText() {
	var carrierSelected = dbCarrier.chain().find({ 'select': { '$gt' : 1 } }).simplesort('select').data()
	var output = []
	var tempString = ''
	
	if ( carrierSelected.length > 0 ) {
		for (var i=0; i<carrierSelected.length; i++) {
			output[i] = carrierSelected[i].name + " "
			
			for (var j=0; j<4; j++) {
				if ( carrierSelected[i][searchName[j]] ) {
					tempString = "+" + carrierSelected[i][searchFactory[j]] + " " + carrierSelected[i][searchShort[j]] + " " + listAircraftSkill2[carrierSelected[i][searchSkill[j]]]
					output[i] = output[i] + tempString + " "
				} else {
					output[i] = output[i] + "empty "
				}
			}
		}
	}
	
	return output
}