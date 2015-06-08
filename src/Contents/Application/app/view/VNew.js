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
			labelField: "Intitulé du projet",
			fieldPosition: "top",
			padding: 10
		},
		{
			xtype: "textarea",
			labelField: "Commentaires",
			fieldPosition: "top",
			padding: 10
		}
		];
		this.callParent(arguments);
	}
});