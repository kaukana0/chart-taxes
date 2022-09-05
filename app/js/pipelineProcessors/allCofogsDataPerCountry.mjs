// COFOG is a dimension, COFOG means "Classification Of the Functions Of Government"
// this is for the treechart

/*
output format is: Map (key=country-code, value=node)

node={
	name:"",
	children: [{
		name:"",
		children:[]
	}]
}

this implements a 2 level hierarchy only - code is not general enough for arbitrary depth.
the hierarchy within the "cofog99" dimension is purely by convention - it's just about how to determine level1 and level2.
for an example see function exampleData().

memory expectation: 79 cofogs ("toplevel" and "2nd-level" cofogs) * 31 countries = 2449 elements

*/


export function process(inputData, output) {
	output["allCofogsDataPerCountry"] = new Map()

	const root = {}

	output.countries.forEach((valL1, keyL1) => {
		const currentL1 = {}
		currentL1["name"] = valL1
		currentL1["children"] = []

		let cofogKeys = Object.keys(inputData.dimension.cofog99.category.label);	// modified during iteration

		cofogKeys.forEach(el => {
			const currentL2 = {}
			cofogKeys = cofogKeys.filter(item => item !== el)		// remove current
			const l2Children = cofogKeys.filter(item => item.startsWith(el))
			if(l2Children.length>0) {
				currentL2["name"] = el
				currentL2["children"] = []
				l2Children.forEach(l2Child => {
					const bla = {}
					bla["name"] = l2Child
					bla["children"] = []
					currentL2["children"].push(bla)
				})
				currentL1["children"].push(currentL2)
				cofogKeys = cofogKeys.filter(item => !l2Children.includes(item))		// remove all dem
			}
		})
		output["allCofogsDataPerCountry"].set(keyL1, currentL1)
	});

	console.log(JSON.stringify(output["allCofogsDataPerCountry"].get("EU")))
}


function exampleData(output) {
	/* dimension data might look like this:

	        "cofog99": {
            "label": "Classification of the functions of government (COFOG 1999)",
            "category": {
                "index": {
                    "TOTAL": 0,
                    "GF01": 1,
                    "GF0101": 2,
                    "GF0102": 3,
                    "GF0103": 4,
                    "GF0104": 5,
                    "GF0105": 6,
                    "GF0106": 7,
                    "GF0107": 8,
                    "GF0108": 9,
                    "GF02": 10,
                    "GF0201": 11,
                    "GF0202": 12,
                    "GF0203": 13,
					...

		GF01 and GF02 are "top level", GF0101 and GF0102 - for instance - are "2nd-level".
	*/
	output["allCofogsDataPerCountry"].set("EU",
	{
		"name":"European Union",
		"children":[
		   {
			  "name":"GF01",
			  "children":[
				 {
					"name":"GF0101",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0102",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0103",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0104",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0105",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0106",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0107",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0108",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0109",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0110",
					"children":[
					   
					]
				 }
			  ]
		   },
		   {
			  "name":"GF02",
			  "children":[
				 {
					"name":"GF0201",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0202",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0203",
					"children":[
					   
					]
				 },
				 {
					"name":"GF0204",
					"children":[
					   
					]
				 }
			  ]
		   }
		]
	 })
}