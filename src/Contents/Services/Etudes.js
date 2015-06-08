Etudes = {
	nouveau: function(o,cb)
	{
		Etudes.using('db').post('vibren','etudes',o,cb);
	}
};

module.exports=Etudes;