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
			},
            "mainform button#import": {
                click: "doOpenImport"
            },
            "TOpenProject grid": {
                itemdblclick: "grid_click"
            }
		});
		
		App.init('VMain',this.onLoad);
		
	},
    grid_click: function(me,store,ndx) {
        App.ID=store.data.id;
        App.get('mainform textarea#description').setValue(store.data.description);
        App.get('mainform textfield#etude').setValue(store.data.libelle);     
        App.get('mainform panel#mainScreen').show();
        me.up('window').close();
    },
    doOpenImport: function()
    {
        App.view.create('VImport').show();
    },
	doOpenProject: function()
	{
	
	},
	doNewProject: function(me)
	{
		var o={
			libelle: App.get('TNewProject textfield#text_title').getValue(),
			description: App.get('TNewProject textfield#text_description').getValue()
		};
		App.Etudes.nouveau(o,function() {
            App.get('mainform panel#mainScreen').show();
            App.get('mainform textarea#description').setValue(App.get('TNewProject textfield#text_description').getValue());
            App.get('mainform textfield#etude').setValue(App.get('TNewProject textfield#text_title').getValue());
            me.up('window').close();
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
		console.log(JOBS);
		this.doJobs(JOBS,0,function() {
			App.notify("L'importation s'est terminée sans erreur.");
            App.get("TImport").close();            
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
	}
	
	
});
