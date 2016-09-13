var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
//counter for whichc search page we are on
// var count = [] ;
//create empty array to pass the object in
var arr = [];
var q = ["Afghanistan", "Albania", "Turkey"];
//request url
for (var i = 1; i < 51; i++) {
	q = 0;
	// var url = 'https://search.wikileaks.org/advanced?document_date_start=&document_date_end=&page='+i+'&released_date_end=&query=afghanistan&new_search=False&released_date_start=&publication_type%5B%5D=6&publication_type%5B%5D=2&publication_type%5B%5D=3&publication_type%5B%5D=4&publication_type%5B%5D=30&publication_type%5B%5D=10&publication_type%5B%5D=24&publication_type%5B%5D=13&publication_type%5B%5D=42&publication_type%5B%5D=5&publication_type%5B%5D=8&publication_type%5B%5D=36&publication_type%5B%5D=37&publication_type%5B%5D=26&publication_type%5B%5D=20&publication_type%5B%5D=27&publication_type%5B%5D=14&publication_type%5B%5D=45&publication_type%5B%5D=28&publication_type%5B%5D=1&any_of=&exact_phrase=&exclude_words=&order_by=oldest_document_date';
    var url = "https://search.wikileaks.org/advanced?new_search=False&query=&exclude_words=&document_date_end=&exact_phrase=&released_date_end=&any_of=afghanistan&document_date_start=&page=1&order_by=most_relevant&released_date_start=&publication_type%5B%5D=6";
	request(url, function (err, response, body) {
	  //if no errors continue
	  if (!err) {

	    var $ = cheerio.load(body);

	    $('.results').find('h4').find('a').each(function(k, elem) {
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
	  		arr.push(obj);
	  		
	  					
	  	});
	  	
	  
	  	// if (i == 51) {
	  	// 	writeFile();
	  	// };
	    	//get number of leaks
	  		// var pub = $('.publication-total').text();
	  		//log results
	
		
		//log array
		
		//stringify the array to see the strings in the saved file
		


	  } else {
	    console.log("We’ve encountered an error: " + err);
	  	}
	});
};
var length = Object.keys(arr);
console.log(length.length);
function writeFile(){

	var data = JSON.stringify(arr);

	fs.writeFile("data.json", data, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 


}


