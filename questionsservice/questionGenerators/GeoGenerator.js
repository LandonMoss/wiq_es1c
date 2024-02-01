const WikiUtils = require("../wikiUtils/wiki-utils")

const templates = [
    async () => {
        const country = await WikiUtils.getRandomCountry()
        return {
            "title": `Cual es la poblacion de ${country.name}`,
            "awnser": country.population,
            "fake" : [
               await WikiUtils.getRandomPopulationExclude(country.population),
               await WikiUtils.getRandomPopulationExclude(country.population),
               await WikiUtils.getRandomPopulationExclude(country.population)
            ]
        }
    },
    async () => {
        const country = await WikiUtils.getRandomCountry()
        return {
            "title": `Cual es la capital de ${country.name}`,
            "awnser": country.capital,
            "fake" : [
               await WikiUtils.getRandomCityWithExclude(country.capital),
               await WikiUtils.getRandomCityWithExclude(country.capital),
               await WikiUtils.getRandomCityWithExclude(country.capital)
            ]
        }
    },
]

module.exports = () => templates[Math.floor(Math.random()*templates.length)]()
