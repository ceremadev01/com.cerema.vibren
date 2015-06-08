App.controller.define('CMain', {

	views: [
		"VMain",
		"VImport"
	],
	
	models: [
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"button#clickImport": {
				click: "doImport"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	doJobs: function(JOBS,id,cb)
	{
		var _p=this;
		App.Files.import(JOBS[id],function() {
			if (JOBS[id+1]) _p.doJobs(JOBS,id+1,cb); else cb();
		});
	},
	doImport: function()
	{
		var JOBS=App.get('TImport uploadfilemanager#up').getFiles();
		App.view.create("VProgress",{
		
		}).show();
		this.doJobs(JOBS,0,function() {
			alert('completed');
		});
	},
	new_project: function()
	{
		alert('x');
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			switch(p.itemId) {
				case "MNU_NEW": 
					this.new_project();
					break;
				default:
					return;
			};
		};			
	},
	onLoad: function()
	{
		// form loaded	
	}
	
	
});
