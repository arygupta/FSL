
		document.addEventListener("fsl-ready", function( e ) {
			if(e.detail) {
				document.getElementById("load").load = 'Inside e.Detail';
			}
			else {
				document.getElementById("load").innerHTML = 'Inside else-load';
			}
		});
		
		
		function getPickListValues(objectType,fieldName) {
			fsl.metadata.getPicklistValues(objectType, fieldName, function(res, err) {
				if(err!=null) {
					document.getElementById("load").innerHTML = 'Error'+JSON.stringify(err);
				}
				else{
					let status = [];
					let values = res.values;
					var i;
					for (i = 0; i < values.length; i++) {
					  status.push(values[i].value);
					}
					document.getElementById("load").innerHTML = JSON.stringify(status);
				}
			})
		}
		
		function showRecord(recordId,objectType) {
			fsl.query.getRecord(recordId, objectType, function(res, err) {
				if(err){
					document.getElementById("showRecord").innerHTML = JSON.stringify(err);
				}
				else{
					if (res && Object.keys(res.records).length != 0) {
						document.getElementById("showRecord").innerHTML = JSON.stringify(res.records[Object.keys(res.records)[0]]);
					}
				}
			})
		}
		
		function query(fieldName,equalsString, objectType, query) {
			let idFilter = fsl.query.createDataFilter(fieldName,fsl.filterOperators.Equals,fsl.filterTypes.TypeString,equalsString);
			let filters = [idFilter];
			let allrecordids = 'Record Ids -->';
			fsl.query.executeSoqlQuery(objectType, filters, query, function (res, err) {
				if(err != null) {
					document.getElementById("query").innerHTML = JSON.stringify(err);
				}
				else{
					if (res && res.records) {
						for (const recordId in res.records) {
							if (res.records.hasOwnProperty(recordId)) {
								const record = res.records[recordId];
								document.getElementById("query").innerHTML = JSON.stringify(record);
								document.getElementById("recordids").innerHTML = allrecordids + ',' + JSON.stringify(recordId);
							}
						}
					}
					else{
						document.getElementById("query").innerHTML = 'No Records Found! :(';
					}
				}
			})
		}
