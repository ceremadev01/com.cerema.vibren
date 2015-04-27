App = {
	init: function(app,server) {
		app.post('/',function(req,res) {
			App.upload.up(req,res);
		});
	}
};

module.exports = App;