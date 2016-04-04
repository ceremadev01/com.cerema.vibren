App.controller.define('CMain', {

	views: [
		"VMain",
		"VImport",
		"VNew",
		"VOpen"
	],
		
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"button#clickImport": {
				click: "doImport"
			},
			"TNewProject button#select_OK": {
				click: "doNewProject"
			},
			"TOpenProject grid#gridprj": {
				itemdblclick: "doOpenProject"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	doOpenProject: function()
	{
	
	},
	doNewProject: function()
	{
		var o={
			libelle: App.get('TNewProject textfield#text_title').getValue(),
			description: App.get('TNewProject textfield#text_description').getValue()
		};
		console.log(o);
		App.Etudes.nouveau(o,function() {
            App.get('mainform panel#mainScreen').show();
		});
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
		App.view.create('VNew',{
			modal: true
		}).show();
	},
	open_project: function()
	{
		App.view.create('VOpen',{
			modal: true
		}).show();
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			switch(p.itemId) {
				case "MNU_NEW": 
					this.new_project();
					break;
				case "MNU_OPEN": 
					this.open_project();
					break;
				default:
					return;
			};
		};			
	},
	onLoad: function()
	{
		// form loaded	
		// provisoire
		//App.view.create('VImport').show();
	}
	
	
});
