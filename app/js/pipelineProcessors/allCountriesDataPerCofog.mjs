// COFOG is a dimension, COFOG means "Classification Of the Functions Of Government"
// this is for the barchart

// output format: {cofogKey:"", data:[[]]}
// example: {cofogKey:"GF01", data:[ ["EU",100.0], ["AT",10.0], ["DK",50.0] ]}
// memory expectation: 10 cofogs ("toplevel" cofogs only, aggregating "sub-cofogs") * 31 countries = 310 elements
export function process(inputData, output) {
    output["allCountriesDataPerCofog"] = new Map()
    output["allCountriesDataPerCofog"].set("GF01", [ 
        ["x", "EU", "AT", "DK"],
        ["", 10, 20, 30] 
    ])
}
