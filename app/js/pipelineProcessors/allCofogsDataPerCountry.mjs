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

example example:
{
name:"A",
	children: [
		{
		name:"AB1",
		children: [{
			name:"ABC1",
			children: []
		},{
			name:"ABC2",
			children: []
		}]
		},
		{
		name:"AB2",
		children: []
		}
	]
}

memory expectation: 79 cofogs ("toplevel" and "2nd-level" cofogs) * 31 countries = 2449 elements

*/
export function process(inputData, output) {
	output["allCofogsDataPerCountry"] = new Map()
	output["allCofogsDataPerCountry"].set("EU",
	{
		name:"EU",
		children: [
			{
			name:"AB1",
			children: [{
				name:"ABC1",
				children: []
			},{
				name:"ABC2",
				children: []
			}]
			},
			{
			name:"AB2",
			children: []
			}
		]
	})
}
