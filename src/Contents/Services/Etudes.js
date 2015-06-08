Etudes = {
	nouveau: function(o,cb)
	{
		Etudes.using('db').post('vibren','etudes',o,cb);
	},
	getAll: function(o,cb)
	{
		Etudes.using('db').query('vibren','select * from etudes',o,cb);
	}
};

module.exports=Etudes;