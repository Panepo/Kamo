require! {
	'fs': fs
	'./aircrafts.ls': aircrafts
	'./carriers.ls': carriers
}

# ===============================================================================
# PARSE AIRCRAFTS DATA
# ===============================================================================
slotAircraft = <[name short type id firepower torpedo bomb air sonar scout hit evade]>
outAircraft = []
for aircraft, i in aircrafts
	outAircraft[i] = {}
	for slotValue, j in slotAircraft
		if slotValue !== 'X'
			outAircraft[i][slotValue] = aircraft[j]

outAircraft = JSON.stringify outAircraft
console.log 'aircrafts.json arrange complete!'
fs.writeFileSync './raw/aircrafts.json', outAircraft

# ===============================================================================
# PARSE CARRIERS DATA
# ===============================================================================
slotCarrier = <[name type id slot1 slot2 slot3 slot4 fighter bomber torpedo scout scout2 seaplane seaplaneX heli blue big display firepower firepowerEQ]>
outCarrier = []

for carrier, i in carriers
	outCarrier[i] = {}
	for slotValue, j in slotCarrier
		if slotValue !== 'X'
				outCarrier[i][slotValue] = carrier[j]

for carrier, i in outCarrier
	switch carrier["type"]
		case 'AC', 'CV', 'CVL', 'TP'
			carrier["firepowerEQ"] = Math.floor carrier["firepower"]*1.5 + 55
		default
			carrier["firepowerEQ"] = carrier["firepower"] + 5

outCarrier = JSON.stringify outCarrier
console.log 'carriers.json arrange complete!'
fs.writeFileSync './raw/carriers.json', outCarrier
