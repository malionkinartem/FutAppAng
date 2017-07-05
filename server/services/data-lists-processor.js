var axios = require('axios')
var config = require('../config')
var configData = require('../repositories/data-lists-repository')

function DataListsProcessor(){
    this.update = async function(){
        
        var firstPage = (await axios.get(config.playersUrl)).data;
        var totalPages = firstPage.totalPages;

        var dataList = getPlayersDataLists(firstPage.items);

        for(var i = 2; i < totalPages; i++){

            var pageData = (await axios.get(config.playersUrl, {
                params:{
                    page: i
                }
            })).data;

            var pageDataList = getPlayersDataLists(pageData.items);

            dataList = mergeArrays(dataList, pageDataList);
        }

        await configData.deleteAll();
        await configData.saveMany(dataList.map(x => x.value));
    }

    function getPlayersDataLists(playersList){
        var array = [];

        playersList.forEach(function(element) {

            var nation = getPlayerNation(element);
            var league = getPlayerLeague(element);
            var club = getPlayerClub(element);

            if(!array.find(x=> x.id === nation.id + nation.type)){
                array.push({id: nation.id + nation.type, value: nation})
            }

            if(!array.find(x=> x.id === league.id + league.type)){
                array.push({id: league.id + league.type, value: league})
            }

            if(!array.find(x=> x.id === club.id + club.type)){
                array.push({id: club.id + club.type, value: club})
            }

        }, this);

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
            value: player.league.name,
            id: player.league.id,
            shortValue: player.league.abbrName,
            type: 'league'
        }
    }

    function getPlayerClub(player){
        return {
            value: player.club.name,
            id: player.club.id,
            shortValue: player.club.abbrName,
            type: 'club'
        }
    }

    function isExist(item, id){
        return item.id === id;
    }

    function mergeArrays(arr1, arr2){
        if(arr2.length == 0){
            return arr1;
        }

        if(arr1.length == 0){
            return arr2;
        }

        arr2.forEach(function(element) {
            if(!arr1.find(x=>x.id == element.id)){
                arr1.push(element);
            }
        }, this);

        return arr1;
    }
}

var processor = new DataListsProcessor();

module.exports = processor;