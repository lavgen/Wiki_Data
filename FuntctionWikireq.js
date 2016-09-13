//node modules to use
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//create empty object
var cobj = {};

var countries = require("./countries")
//filternames corresponding numbers in order
var filterNames = [
    "Global Intelligence Files",
    "Plusd",
    "Cablegate",
    "Kissinger Cables",
    "Carter Cables2",
    "Afghanistan War Logs",
    "Carter Cables",
    "US Military Equipment in Iraq",
    "Clinton Emails",
    "Syria Files",
    "The Guantanamo Files",
    "Hacking Team",
    "Hacking Team Emails",
    "Sony",
    "Secret Congressional Reports",
    "Sony Documents",
    "US Military Equipment in Afghanistan",
    "DNC Email Archive",
    "Sony Emails",
    "Non-collection Publications"];
//filterNumbers to identift the filter in url
var filterNumbers = [6,2,3,4,30,10,24,13,42,5,8,36,37,26,20,27,14,45,28,1];

//iterator for country names
var c = 0;
//iterator for filterNumbers
var f = 0;
//iterator for page number
var page = 1;
//add each filtername as an array to empty object we created
for (var i = 0; i < filterNames.length-1; i++) {
    var key = filterNames[i];
    cobj[key] = [];

}
//function to get data and put into empty object and write file 
function saveCountryFile(){
    //turn data into readable file
    var data = JSON.stringify(cobj);
    //save files into CountryData file -it is syncronious so it can't have any callback inside
    fs.writeFileSync("CountryData/"+countries[c]+".json",data);
    console.log( 'saved ' + countries[c]+'.json' );
                        

    cobj = {};

    // saveCountryFile() doesn't run until after we switch to the first country... 
    // which means the for loop inside it which adds those keys to cobj never runs 
    // so I put this forloop above all the functions so it runs
    
    // NOTE: but also u still need this here so that it re-runs evertime u start a new country
    for (var i = 0; i < filterNames.length; i++) {
        var key = filterNames[i];
        cobj[key] = [];
    }



}
//request files 
function wikireq(){

    //url to be changed each time
    var url = "https://search.wikileaks.org/advanced?new_search=False&query=&exclude_words=&document_date_end=&exact_phrase=&released_date_end=&any_of="+countries[c]+"&document_date_start=&page="+page+"&order_by=most_relevant&released_date_start=&publication_type%5B%5D="+filterNumbers[f];
    //assign filter names to key variable 
    var key = filterNames[f];

    //outputs undefined for cobj[key]
    // console.log(cobj[key]);
    console.log(countries[c],filterNames[f],page);
    request( url, function(err,res,body){

        var $ = cheerio.load(body); 
        $('.results').find('h4').find('a').each(function(j, elem) {

            //name of the link
            var n = $(this).text();
            //link
            var urls = $(this).attr('href');
            //create an object with names and links
            var obj = {
                name : n,
                link : urls
            };
            //gives error for now
            cobj[key].push( obj );
        
            // console.log(obj);
        });

        // var obj = {
        //     n:"",
        //     url:""
        // }
 

        page++;
        if( page > 50 ){
            page = 1;


            f++
            if( f > filterNames.length ){
                f = 0;
                c++;
                saveCountryFile();
            }
        }

        if( c < countries.length ) wikireq();

    });

}
wikireq();
