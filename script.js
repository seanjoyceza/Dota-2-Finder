input.addEventListener("keyup", (event) => {
    if (event.which <= 90 && event.which >= 48 || event.which === 8) {
        let playerName = input.value;
        let cleanString = cleanInput(playerName);
        let searchQuery = (`q=${cleanString}`);
        getPlayerInfo(searchQuery)
    }
})

async function getPlayerInfo(searchQuery) {
    try {
        let res = await fetch(`https://api.opendota.com/api/search?${searchQuery}`)
        let data = await res.json()

        let account_id = data[0].account_id;
        player.innerText = data[0].personaname
        player_image.src = data[0].avatarfull;
        profile.innerHTML = `<a href="https://www.dotabuff.com/players/${data[0].account_id}" class="btn btn-primary mt-3" target="_blank">View Dotabuff Profile</a>`
        getPlayerStats(account_id)
        getPlayerStatistics(account_id)
        second_container.classList.add("border", "second_container_color")

    } catch {
        // console.log("getPlayerInfo function error")
    }
}

async function getPlayerStatistics(accountID) {
    try {
        let res = await fetch(`https://api.opendota.com/api/players/${accountID}`)
        let data = await res.json()
        let country = data.profile.loccountrycode
        stats_one.innerHTML = `<b>Country:</b> ${countryListAlpha2[country]}`
        const flag = new CountryFlag(stats_one);
        flag.selectByAlpha2(country);
        stats_two.innerHTML = `<b>MMR Estimate:</b> ${data.mmr_estimate.estimate}`
        stats_three.innerHTML = `<b>Dota Plus Subscriber:</b> ${data.profile.plus}`
        stats_four.innerHTML = `<b>Rank Tier:</b> ${data.rank_tier}`
        stats_one.classList.add("border", "rounded", "p-3")
        stats_two.classList.add("border", "rounded", "p-3")
        stats_three.classList.add("border", "rounded", "p-3")
        stats_four.classList.add("border", "rounded", "p-3")
    } catch (e) {
        // console.log("getPlayerStatistics function error")
    }
}

async function getPlayerStats(accountID) {
    recents_heading.innerText = "Recent Matches"
    try {
        let res = await fetch(`https://api.opendota.com/api/players/${accountID}/recentMatches`)
        let data = await res.json()

        last_match_one.innerHTML = `<b>Gamemode:</b> ${gameMode[data[0].game_mode]}`
        last_match_two.innerHTML = `<b>K/D/A:</b> ${data[0].kills}/${data[0].deaths}/${data[0].assists}`
        last_match_three.innerHTML = `<b>MatchID:</b> <a href="https://www.dotabuff.com/matches/${data[0].match_id}" class="btn-sm btn btn-outline-primary" target="_blank">${data[0].match_id}</a>`
        last_match.classList.add("border", "rounded", "p-3")

        secondlast_match_one.innerHTML = `<b>Gamemode:</b> ${gameMode[data[0].game_mode]}`
        secondlast_match_two.innerHTML = `<b>K/D/A:</b> ${data[1].kills}/${data[1].deaths}/${data[1].assists}`
        secondlast_match_three.innerHTML = `<b>MatchID:</b> <a href="https://www.dotabuff.com/matches/${data[1].match_id}" class="btn-sm btn btn-outline-primary" target="_blank">${data[1].match_id}</a>`
        secondlast_match.classList.add("border", "rounded", "p-3")

        thirdlast_match_one.innerHTML = `<b>Gamemode:</b> ${gameMode[data[0].game_mode]}`
        thirdlast_match_two.innerHTML = `<b>K/D/A:</b> ${data[2].kills}/${data[2].deaths}/${data[2].assists}`
        thirdlast_match_three.innerHTML = `<b>MatchID:</b> <a href="https://www.dotabuff.com/matches/${data[2].match_id}" class="btn-sm btn btn-outline-primary" target="_blank">${data[2].match_id}</a>`
        thirdlast_match.classList.add("border", "rounded", "p-3")
    } catch {
        // console.log("getPlayerStats function error")
    }
}

function cleanInput(string) {
    return cleanString = string.trim().replace(/\s/g, "+");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
