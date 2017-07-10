var axios = require('axios')
var config = require('../config')
var configRepo = require('../repositories/data-lists-repository')
var leaguesRepo = require('../repositories/leagues-repository')
var plaersRepo = require('../repositories/players-repository')

function DataListsProcessor(){
    this.update = async function(){
        var data = {
            genericLists: [],
            leagues: []
        };  

        var dataArr = await getPlayersData();

        await plaersRepo.deleteAll();

        var iteration = 0;
        dataArr.forEach(function(playersDataPage){
            console.log("iteration " + iteration);
            populatePlayersData(playersDataPage.items, data);

            await plaersRepo.saveMany(playersDataPage.items);
            iteration++;
        });

        await configRepo.deleteAll();
        await configRepo.saveMany(data.genericLists.map(x => x.value));

        await leaguesRepo.deleteAll();
        await leaguesRepo.saveMany(data.leagues);
    }

    function populatePlayersData(playersList, processedData){

        playersList.forEach(function(player) {

            var teamRelation = getTeamRelationData(player);

            if(!processedData.genericLists.find(x=> x.id === teamRelation.nation.id + teamRelation.nation.type)){
                processedData.genericLists.push({id: teamRelation.nation.id + teamRelation.nation.type, value: teamRelation.nation})
            }

            var foundLeague = processedData.leagues.find(x=> x.id === teamRelation.league.id);
            if(!foundLeague){
                teamRelation.league.clubs = [teamRelation.club];
                processedData.leagues.push(teamRelation.league);
            }
            else{
                if(!foundLeague.clubs.find(x=>x.id === teamRelation.club.id)){
                    console.log("league: " + foundLeague.name + " added league: " + 
                        teamRelation.league.name + " club " + teamRelation.club.name);
                    foundLeague.clubs.push(teamRelation.club);
                }
            }

        }, this);
    }

    async function getPlayersData(){
        var array = [];

        var i =1;
        do {

            var pageData = (await axios.get(config.playersUrl, {
                params:{
                    page: i
                }
            })).data;

            array.push(pageData);
            
            i++;
        } while (i - 1 < pageData.totalPages);

        return array;
    }

    function getPlayerNation(player){
        return {
            value: player.nation.name,
            id: player.nation.id,
            shortValue: player.nation.abbrName,
            type: 'nation'
        }
    }
        
    function getPlayerLeague(player){
        return {
            name: player.league.name,
            id: player.league.id,
            shortName: player.league.abbrName,
            clubs: []
        }
    }

    function getPlayerClub(player){
        return {
            name: player.club.name,
            id: player.club.id,
            shortName: player.club.abbrName,
        }
    }

    function getTeamRelationData(player){
        return{
            nation: getPlayerNation(player),
            league: getPlayerLeague(player),
            club: getPlayerClub(player)
        }
    }
}

var processor = new DataListsProcessor();

module.exports = processor;