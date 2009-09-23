/*
var WoodRef = Class.create();
WoodRef.prototype = {
  styles = { barColor:'#563114' }
}
*/

// some core extensions
Object.extend(String.prototype, {
  parameterize:function() {
    return this.toLowerCase().gsub(/\W/,'_').gsub(/_+/,'_');
  },
  unescape:function() {
    return this.replace("&#39;","'").replace("&amp;","&");
  }
});


// Provides a common place to store variables and values for use throughout the app
Search = {
  styles:{
    barColor:'#003e7e'
  }
};


// Helper methods that simplify generating view stuff
Helper = {
  
  // Give this method an array of page *titles* and it will generate a table with those titles as well as optional icons
  //
  // Helper.createSubPages(['Birch','Maple'],true)
  
  createSubPages:function(pages,show_image) {
    var data = pages.collect(function(page) {
      var output = {hasChild:true}
      if (typeof page == 'string') {
        output.title = page;
      } else if (typeof page == 'object') {
        output.title = page.title;
      }
      if (show_image) {
        if (typeof page == 'string') {
          output.image = page+'/images/icon.png'
        } else if (typeof page == 'object') {
          output.image = page.url+'/images/icon.png'
        }
      }
    	return output
    });
    
  	var tableView = Titanium.UI.createTableView({data:data, title:'table', isPrimary:true}, function(e) {
  	  var page = pages[e.index];
  	  if (typeof page == 'string') {
        var url = page.parameterize()+'/index.html';
      } else if (typeof page == 'object') {
        var url = page.url.parameterize()+'/index.html';
      }
  	  Titanium.UI.createWindow({url:url, title:page, barColor:Search.styles.barColor}).open({animated:true});
	  });

  	Titanium.UI.currentWindow.addView(tableView);
  	Titanium.UI.currentWindow.showView(tableView);
  },
  
  createTabbedBar:function(labels) {
  	// create a flexible space button that is used to help position items on the toolbar
    var flexSpace = Titanium.UI.createButton({
       systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });

    // create a tabbed bar for the toolbar
    var tabbar = Titanium.UI.createTabbedBar({
      labels:labels,
      backgroundColor:'#333333',
      index:0
    });

    // add tabbar to the toolbar and center it using the flex space buttons
    Titanium.UI.currentWindow.setToolbar([flexSpace,tabbar,flexSpace]);
  }
}
