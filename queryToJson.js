/*
 * @Author
 * Micaiah Effiong
 *
*/

/*
 * @param {String} query 
 * return Object
 *
*/
function queryToJson(query){
	if(!query) throw Error('query is not defined');
	let obj = Object.create(null);
	let _string = (query.startsWith('?'))
		? query.substring(1)
		: query;
	let queryArray = _string.split('&');
	queryArray.forEach(function(elt){
		elt = elt.split('=');
		if (obj[elt[0]] && typeof obj[elt[0]] == 'string') {
			let placeholder = obj[elt[0]];
			obj[elt[0]] = new Array();
			obj[elt[0]].push(placeholder, elt[1]);
		}else	if (obj[elt[0]] && obj[elt[0]] instanceof Array == true) {
			obj[elt[0]].push(elt[1]);
		}else{
			obj[elt[0]] = elt[1];
		}
	});
	return obj;
}