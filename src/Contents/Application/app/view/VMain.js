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
					text: "Etudes",					
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
			itemId: "ClearWater",
			hidden: true,
			bodyCls: "wallpaper_rainbow"
		},
		{
			region: "center",			
			split:true,
			bodyStyle: "background-color: white",
			layout: "vbox",
			items: [
				{
					padding: 10,
					fieldLabel: "Etude",
					xtype: "textfield",
					width: "100%"
				},
				{
					padding: 10,
					fieldLabel: "Description",
					xtype: "textarea",
					width: "100%"
				},
				{
					layout: "hbox",
					width: "100%",
					flex: 1,
					border: false,
					items: [
						{
							xtype: "grid",
							height: "100%",
							width: 350,
							columns: [
								{
									text: "sdffdfjkl"
								}
							],
							store: App.store.create({
								fields: [],
								data: []
							})
						}
					]
				}
			]
		}
	]
	
});
