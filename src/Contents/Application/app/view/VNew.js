App.view.define('VNew',{
	extend: "Ext.window.Window",
    alias: "widget.TNewProject",
	initComponent: function() {
		this.width = 600;
        this.height = 250;
        this.title = "Nouveau projet";
        this.bodyStyle = "background-color: white";
		this.layout="vbox";
        this.items = [
		{
			xtype: "textfield",
			fieldLabel: "Intitulé du projet",
			labelAlign: "top",
			width: "100%",
			fieldPosition: "top",
			padding: 10
		},
		{
			xtype: "textarea",
			fieldLabel: "Commentaires",
			labelAlign: "top",
			width: "100%",
			fieldPosition: "top",
			padding: 10
		},
		{
			layout: "hbox",
			border: false,
			width: "100%",
			items: [
				{
					flex: 1,
					border: false
				},
				{
					xtype: "button",
					width: 150,
					text: "Enregistrer",
					itemId: "select_OK"
				}
			],
			padding: 10
		}		
		];
		this.callParent(arguments);
	}
});