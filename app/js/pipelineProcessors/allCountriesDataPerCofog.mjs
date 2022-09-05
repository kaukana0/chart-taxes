// COFOG is a dimension, COFOG means "Classification Of the Functions Of Government"
// this is for the barchart

// output format: {cofogKey:"", data:[[]]}
// example: {cofogKey:"GF01", data:[ ["EU",100.0], ["AT",10.0], ["DK",50.0] ]}
// memory expectation: 10 cofogs ("toplevel" cofogs only, aggregating "sub-cofogs") * 31 countries = 310 elements
export function process(inputData, output) {
    output["allCountriesDataPerCofog"] = new Map()
    output["allCountriesDataPerCofog"].set("GF01", [ 
        ["EU", "AT", "DK"],
        ["GF01", 10, 20, 30],
//        ["S2", 30, 10, 20] 
    ])
    output["cofogLabels"] = new Map()
    output["cofogLabels"].set("GF01", "General public services")
}
