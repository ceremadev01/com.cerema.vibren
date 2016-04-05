Files={
	import: function(o,cb) {	
		// get checksum of the file
		var msg="";
		// ORM database vibren
		var vibren=Files.using('db').using('vibren');		
		vibren.Files.find({where: {fileid: App.upload.getFileID(o.docId)}}).then(function(file) {
			if (file) {
				msg={
					msg: "ALREADY_IMPORTED"
				};
				cb(msg,null);
				return;			
			} else {
				// get file formats				
				var Format={
					acq: Files.using('Formats/acq'),
					sig: Files.using('Formats/sig')
				};
				// try to identify the file based on extension
				var fileext=o.docId.substr(o.docId.lastIndexOf('.')+1,3).toLowerCase();
				var Document=o.docId;
				App.upload.reader(o.docId, function(err,buffer) {
					var response=Format[fileext].parse(buffer);
					// cleaning up the strings
					for (var item in response) {
						try {
							response[item]=response[item].replace(/\0/g, '').trim();
						}catch(e) {

						};
					};
					
					// Format ACQ
					if (fileext=="acq") {
						var d=response.date_heure;
						var e=d.split(' ')[0].split('.');
						var f=d.split(' ')[1];
						response.date_heure='20'+e[2]+'-'+e[1]+'-'+e[0]+' '+f.split('h')[0]+':'+f.split('h')[1].split('mn')[0]+':'+f.split('mn')[1].split('s')[0];						
						console.log({
							filename: o.filename,
							fileid: App.upload.getFileID(o.docId)
						});
						vibren.Files.create({
							filename: o.filename,
							fileid: App.upload.getFileID(o.docId)
						}).then(function(o) {		
							response.fileId=o.dataValues.id;
							console.log(response);
							vibren.Acquisition.create(response).then(function (acq) {
								cb();
							});					
						});
						return;						
					};
					
					// Format SIG
					if (fileext=="sig") {
						var checkACQ=o.filename.substr(0,o.filename.lastIndexOf('.')-1).split('_')[0];
						vibren.Files.create({
							filename: o.filename,
							fileid: App.upload.getFileID(o.docId)
						}).then(function(o) {							
							// looking for ACQ
                            console.log(checkACQ+'%');
							vibren.Files.find({
								where: {
									filename: {
										like: checkACQ+'%'
									}
								}
							}).then(function(file) {
                                console.log(file.dataValues);
								var ff=file.dataValues.id;
                                console.log(ff);
								vibren.Acquisition.find({where: { fileid: ff } }).then(function(acq) {
                                    console.log(acq);
									response.fileId=o.dataValues.id;
									response.acquisitionId=acq.id;
									vibren.Signal.create(response).then(function (Signal) {
										// adding task calculate_mesures
										/*App.tasks.add("calculate_mesures",{
											docId: Document, 
											acq: acq.id,
											sig: Signal.dataValues.id
										});	
										// callback
										cb();*/
																			
										var BufferReader = App.using('buffer-reader');
										var reader = new BufferReader(buffer);
										var result = {
												presence_signal: reader.nextInt16LE(),
												numero_fichier: reader.nextInt16LE(),
												commentaire_traitement: reader.nextString(21),
												trace_source: reader.nextString(15),
												trace_sortie: reader.nextString(15),
												nombre_voies: reader.nextInt16LE(),
												coefficient_multiplicateur: [
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE(),
													reader.nextDoubleLE()			
												],
												temps_debut: reader.nextDoubleLE(),
												temps_fin: reader.nextDoubleLE(),
												frequence_echantillonage: reader.nextDoubleLE(),
												nombre_points_voie: reader.nextInt32LE(),
												unite_x: reader.nextString(9),
												unite_y: [
													reader.nextString(9).replace(/\0/g, '').trim(),
													reader.nextString(9).replace(/\0/g, '').trim(),
													reader.nextString(9).replace(/\0/g, '').trim(),
													reader.nextString(9).replace(/\0/g, '').trim(),
													reader.nextString(9).replace(/\0/g, '').trim()
												]
										};	
										reader.seek(reader.tell()-1);
										var buf = reader.restAll();
										var bufferpack = App.using('bufferpack');
										var list=[];
										var b=new Buffer(2);
										buffer.copy(b,0,266);
										list.push(bufferpack.unpack('h',b,0));
										
										for (var ii=1;ii<buf.length-1;ii++) {
											if ((ii/2)%1==0) {
												list.push(bufferpack.unpack('h',buf,ii));
											}
										};
										
										var z=0;
										var voie=0;
										result.data=[];
										for (var ii=0;ii<list.length;ii++) {
											if (z==0) result.data[voie]=[];
											result.data[voie].push(parseFloat(list[ii][0]*result.coefficient_multiplicateur[voie]).toFixed(4));
											z++;
											if (z>result.nombre_points_voie*1) {z=0;voie++;}
										};
										for (var item in result) {
											try {
												result[item]=result[item].replace(/\0/g, '').trim();
											}catch(e) {

											};
										};
										var dta=[];
										for (var ii=0;ii<result.data.length;ii++) {
											var items=result.data[ii];
											//for (var jj=0;jj<items.length;jj++) {
												dta.push({
													voie: ii,
													points: items.join(';'),
													acquisitionId: acq.id,
													signalId: Signal.dataValues.id
												});
											//};
										};
										vibren.Mesures.bulkCreate(dta).catch(function(err) {
											console.log(err);
										}).then(function(success) {
											cb();
										});										
										
										
										
									});								
								});
							});
						});
					}
				});
				
				
			}
		});
	}
};

module.exports=Files;