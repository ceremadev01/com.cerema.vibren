Etudes = {
	nouveau: function(o,cb)
	{
		console.log(o);
		Etudes.using('db').post('vibren','etudes',o,cb);
	}
};

module.exports=Etudes;