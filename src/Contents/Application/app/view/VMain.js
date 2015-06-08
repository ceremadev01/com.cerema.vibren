App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
				{
					text: "Projets",					
					menu: [
						{
							text: "Nouveau",
							itemId: "MNU_NEW"
						},
						{
							text: "Ouvrir",
							itemId: "MNU_OPEN"
						}
					]
				}
			]		
		},
		{
			region: "center",			
			split:true,
			bodyCls: "wallpaper_rainbow",
			items: [
				
			]
		}
	]
	
});
