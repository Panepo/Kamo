require! {
	'fs': fs
	'./aircrafts.ls': aircrafts
}

# ===============================================================================
# PARSE AIRCRAFTS DATA
# ===============================================================================
slotAircraft = <[name type id bomb torpedo air scout sonar desc]>
outAircraft = []
for aircraft, i in aircrafts
	outAircraft[i] = {}
	for slotValue, j in slotAircraft
		if slotValue !== 'X'
			outAircraft[i][slotValue] = aircraft[j]

outAircraft = JSON.stringify outAircraft
console.log 'aircrafts.json arrange complete!'
fs.writeFileSync './raw/aircrafts.json', outAircraft
