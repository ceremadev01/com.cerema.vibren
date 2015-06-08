App.view.define('VOpen',{
	extend: "Ext.window.Window",
    alias: "widget.TOpenProject",
	initComponent: function() {
		this.width = 600;
        this.height = 250;
        this.title = "Mes études";
        this.bodyStyle = "background-color: white";
		this.layout="vbox";
        this.items = [
		{
			xtype: "grid",
			itemId: "gridprj",
			width: "100%",
			flex: 1,
			bbar: [
				'->',
				{
					text: "OK"
				}
			],
			columns: [
			
			],
			store: App.store.create({
				fields: [],
				data: []
			})
		}		
		];
		this.callParent(arguments);
	}
});