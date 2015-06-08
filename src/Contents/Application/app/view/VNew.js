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
			fieldPosition: "top",
			padding: 10
		},
		{
			xtype: "textarea",
			fieldLabel: "Commentaires",
			labelAlign: "top",
			fieldPosition: "top",
			padding: 10
		}
		];
		this.callParent(arguments);
	}
});