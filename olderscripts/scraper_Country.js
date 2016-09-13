var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var count = 0;
var filterNumber = [6,2,3,4,30,10,24,13,42,5,8,36,37,26,20,27,14,45,28,1];
var filterName = [
	"Global Intelligence Files",
	"Plusd","Cablegate",
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

var Countries = require("./countries")
//create empty object for countries
var cObj = {}
// var url = "https://search.wikileaks.org/advanced?new_search=False&query=&exclude_words=&document_date_end=&exact_phrase=&released_date_end=&any_of="+Countries[0]+"&document_date_start=&page="+1+"&order_by=most_relevant&released_date_start=&publication_type%5B%5D=6";
// request(url, function(err,response,body){
//   var $ = cheerio.load(body);

//     $('.results').find('h4').find('a').each(function(j, elem) {
//    		//name of the link
//   		var n = $(this).text();
//   		//link
//   		var urls = $(this).attr('href');
//   		//create an object with names and links
//   		var obj = {
//   			name : n,
//   			link : urls
//   		}
//   		console.log(obj);
//   	});
// })
//loop to iterate through Countries

for (var i = 0; i < Countries.length; i++) {
 		// console.log(i);
 		//LOOP-iterates through filters
 		for (var k = 0; k < filterNumber.length; k++) {
 			var filtName = filterName[k]

 			//each filter key
 			cObj[filtName] = [];
 			//loop through search pages
 			for (var l = 1; l < 51; l++) {
 				//filternumber change in url
 			 	var url = "https://search.wikileaks.org/advanced?new_search=False&query=&exclude_words=&document_date_end=&exact_phrase=&released_date_end=&any_of="+Countries[i]+"&document_date_start=&page="+l+"&order_by=most_relevant&released_date_start=&publication_type%5B%5D=6";
				// console.log(url);
 				request(url, function (err, response, body) {
 							count++;
		  			console.log("request count" , err);
				  //if no errors: continue
					if (!err) {
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
					  		}
					  		//push obj object into arr array
					  		
					  		cObj[filtName].push( obj );
  							 console.log("NAME IS " ,cObj[filtName]);
					  					
					  	});

					  	if(l == 51){

							var data =JSON.stringify(cObj);

							fs.writeFile("CountryData/"+Countries[i]+".json",data,function(err){
							if(err) console.log("Error", err); 
								console.log(Countries[i] +  "was saved!");
							}); 
						}

					 

		  			} else {

		    			console.log("We’ve encountered an error: " + err);

		  			}

				});
		};
		
		
 	};



};










