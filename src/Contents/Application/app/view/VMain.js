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
			hidden: false,
			bodyCls: "wallpaper_rainbow"
		},
		{
			region: "center",			
			split:true,
			hidden: true,
            itemId: "mainScreen",
			bodyStyle: "background-color: white",
			layout: "vbox",
			items: [
				{
					padding: 10,
					fieldLabel: "Etude",
                    itemId: "etude",
					xtype: "textfield",
					width: "100%"
				},
				{
					padding: 10,
					fieldLabel: "Description",
                    itemId: "description",
					xtype: "textarea",
					width: "100%"
				},
				{
					layout: "hbox",
					width: "100%",
					flex: 1,
					border: false,
					padding: 10,
					items: [
						{
							xtype: "grid",
							height: "100%",
							width: 350,
                            tbar: [
                            {
                                text: "Importer",
                                iconCls: "import",
                                itemId: "import"
                            }
                            ],
							columns: [
								{
									text: "Acquisitions",
									flex: 1
								}
							],
							store: App.store.create({
								fields: [],
								data: []
							})
						},
						{
							border: true,
							flex: 1,
							height: "100%"
						}
					]
				}
			]
		}
	]
	
});
