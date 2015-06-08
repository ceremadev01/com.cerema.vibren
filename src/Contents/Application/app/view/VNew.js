App.view.define('VNew',{
	extend: "Ext.window.Window",
    alias: "widget.TNewProject",
	initComponent: function() {
		this.width = 600;
        this.height = 250;
        this.title = "Nouveau projet";
        this.bodyCls = "white";
		this.layout="vbox";
        this.items = [
		];
		this.callParent(arguments);
	}
});