
var cobj = {};

//i need an iterator for each array  for country,page,filternumber,filtername
var c= 0;
var fnum = 0;
var fname= 0;
var page = 1;
function createFilterKeys(){
	cobj = {};
	
}

function wikireq(){
	var url = "....." + countries[c] + "....." +page+"........." +filterNumbers[f];
var key = filterNames[f];
cobj[key] = [];

request(url, function (err,response,body) {
	
	var obj = {
		n: "",
		url : "",
	}


	cobj[key].push(obj);
	page++;
	if(page > 50){
		page=1;
		f++;
		if(f > filterNames.length){
			f= 0;
			page = 1;
			c++;
		}

	}
	wikireq();

});

}

wikireq();