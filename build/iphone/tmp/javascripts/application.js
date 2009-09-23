Search = {
  
  progress:null,
  client:null,
  
  go:function(text, local, id) {
    this.progress = createProgressBar(id);
    this.client = Titanium.Network.createHTTPClient();
    if (local) {
      var pos = getLocation(text);
      this.getlocate(pos);
    } else {
      this.doSearch(text,location);
    }
  },
  
  getLocation:function() {
  	Titanium.Geolocation.getCurrentPosition(
  		function(pos) {   // success
  		  this.geolocate(pos);
  		},
  		function() {    // failure
        createAlert('Your location could not be determined!')
  		}
  	);
  },
	
	// find the phone's current zip code given a position object
	geolocate:function(pos) {
	  this.updateProgressBar('Finding zip        ',3)
    this.client.onload = function() {
      var zip = this.responseText.evalJSON().postalCodes.first().postalCode;
      this.doSearch(zip);
    }.bind(this);
    this.client.open("GET","http://ws.geonames.org/findNearbyPostalCodesJSON?lat="+pos.coords.latitude+"&lng="+pos.coords.longitude+"&maxRows=1");
    this.client.send();
  },
  
  
  // do a search on Active.com
  doSearch:function(keywords,location) {
    this.updateProgressBar('Finding events  ',6);
    this.client.onload = function() {
      this.updateProgressBar('Parsing events  ',9)
      var results = XMLObjectifier.xmlToJSON(this.responseText);
      titles = $A(results.results[0].result).collect(function(result) {
        return result.title[0].Text.unescape();
      });
      this.progress.hide();
      this.buildTable(titles);
    }.bind(this);
    this.client.open("GET","http://searchbeta.active.com/search?k="+keywords+"&f=activities&v=xml&m=meta%3AstartDate%3Adaterange%3Atoday..&num=15&l="+location);
    this.client.send();
  },
  
  
  // Build a table of the titles
  buildTable:function (titles) {
    Helper.createSubPages(titles);
	},
	
	
	// Remove weird characters from any text
	cleanText:function(text) {
	  return text.replace("&#39;","'").replace("&amp;","&");
  },
  
  
  // Create a progress bar on the screen
  createProgressBar:function(id) {
		var progress = Titanium.UI.createProgressBar({
			id:id,
			width:150,
			min:0,
			max:10,
			value:1,
			message:'Finding location',
			color:'#000000',
			style:Titanium.UI.iPhone.ProgressBarStyle.PLAIN
		});
		progress.show();
		return progress;
	},


  // update the progress bar
  updateProgressBar:function(message, value) {
    progress.setValue(value);
    progress.setMessage(message);
  },
	
	
	// show an alert
	createAlert:function(text) {
	  var alert = Titanium.UI.createAlertDialog();
    alert.setMessage(text);
    // alert.setTitle('Location Problem');
    alert.show();
  },
  
  status:function(text) {
    $('status').update(text);
  }
}