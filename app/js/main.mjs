import "../components/dropdownBox/dropdownBox.mjs"
import * as l10n from "../components/l10n/lang.mjs"
import * as meta from "../components/metaTags/metaTags.mjs"
import * as util from "../components/util/util.mjs"
import * as pipeline from "../components/pipeline/pipeline.mjs"
//import { process as extractOriginalRawData } from "./pipelineProcessors/originalRawData.mjs"
import { process as defineCountryOrder } from "./pipelineProcessors/countryOrder.mjs"
import { process as extractCountries } from "../components/processorCountries/processor.mjs"


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
			input : "https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gov_10a_exp?sector=S13&na_item=TE&time=2020",
			processors: [defineCountryOrder, extractCountries]
		}
	]

	pipeline.run(
		processingCfg,
		(data) => {
			if(data	&& Object.keys(data).length > 0 && Object.getPrototypeOf(data) === Object.prototype) {
				try {
					document.getElementById("selectCountry").data = [data.countries, data.groupChanges]
					//document.getElementById("selectCountry").callback = (k, v) => dm.update(data, dm.ModeEnum.Country)
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
		util.replaceEuInRawData
	)


	function displayFailure(e) {
		console.error(e)
		document.getElementById("loadingIndicator").style.display = "none"
		document.getElementById("errorMessage").style.display = "block"
	}

}

