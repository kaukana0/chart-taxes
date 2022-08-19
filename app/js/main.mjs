import * as treeChart from "../components/treeChart/treeChart.mjs"
import * as chart from "../components/chart/chart.mjs"
import "../components/dropdownBox/dropdownBox.mjs"
import * as l10n from "../components/l10n/lang.mjs"
import * as meta from "../components/metaTags/metaTags.mjs"

import * as pipeline from "../components/pipeline/pipeline.mjs"
import {replaceEuInRawData} from "../components/util/util.mjs"
import { process as extractCountries } from "../components/processorCountries/processor.mjs"
import { process as defineCountryOrder } from "../components/processorCountryOrder/countryOrder.mjs"
import { process as renameCountries } from "../components/processorCountryNames/countryNames.mjs"
//import { process as extractOriginalRawData } from "./pipelineProcessors/originalRawData.mjs"
import { process as extractAllCofogsDataPerCountry } from "./pipelineProcessors/allCofogsDataPerCountry.mjs"		// for treechart
import { process as extractAllCountriesDataPerCofog } from "./pipelineProcessors/allCountriesDataPerCofog.mjs"	// for barchart

init(run)


function init(callback) {
	l10n.init("en", {
		'en': './translations/en.json',
		'fr': './translations/fr.json'
	},
	() => {
		meta.init(l10n._('title.main'), l10n._('title.main'), "some.jpg", 100, 100)
		callback()
	})
}


function run() {
	const processingCfg = [
		{
//			input : "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10a_exp?sector=S13&na_item=TE&time=2020",
			input : "persistedData/data2022-08-13.json",
			processors: [defineCountryOrder, extractCountries, renameCountries, extractAllCofogsDataPerCountry, extractAllCountriesDataPerCofog]
		}
	]

	pipeline.run(
		processingCfg,
		(data) => {
			if(data	&& Object.keys(data).length > 0 && Object.getPrototypeOf(data) === Object.prototype) {
				try {
					document.getElementById("selectCountry").callback = (k, v) => updateCharts(data, k)
					document.getElementById("selectCountry").data = [data.countries, data.groupChanges]
					document.getElementById("loadingIndicator").style.display = "none"
				} catch(e) {
					displayFailure(e)
				}
			} else {
				displayFailure("emtpy data")
			}
		},
		(e) => {
			displayFailure(e)
		},
		replaceEuInRawData
	)


	function displayFailure(e) {
		console.error(e)
		document.getElementById("loadingIndicator").style.display = "none"
		document.getElementById("errorMessage").style.display = "block"
	}

}

function updateCharts(data, k) {
	treeChart.init("treeChart", data.allCofogsDataPerCountry.get(k))

	chart.init({
		type: "bar",
		chartDOMElementId: "barChart",
		legendDOMElementId: null,
		cols: data.allCountriesDataPerCofog.get("GF01"),
		tooltipTexts: data.countries,
		suffixText: "Unit",
		isRotated: true
	})
	chart.setYLabel("barChart", "Unit")
}
