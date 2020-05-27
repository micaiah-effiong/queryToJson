/*
 * @Author
 * Micaiah Effiong
 * https://github.com/micaiah-effiong/queryToJson
 * 
*/

/*
	* @param {String} query 
	* @param {Boolean} option specifies if ${query} should be a valid URL 
	*
	* return Object
	*
	* example: queryToJson('query=name', true)
	* // this is not valid
	* Invalid URL
	*
	* example: queryToJson('query=name', false)
	* // this is valid
	* {'query': 'name'}
	*
*/
function queryToJson(query, option=true){
	if(!query){
		throw TypeError('1 argument required, but only 0 present.');
	}
	let _string 

	try{
		_string = new URL(query).search.substring(1)
	}catch(err){
		if (option == true){
			throw err;
		}
		_string = (query.substring(query.indexOf('?')+1))
		? query.substring(1)
		: query;
	}

	return createObjFromPairedArrayValues(_string.split('&'));
}

/*
 * @param {Array} _arr ["foo=bar"]
 * return {Object} obj {foo: bar}
 *
*/
function createObjFromPairedArrayValues(_arr){
	let obj = Object.create(null);
	_arr.forEach(function(elt){
		let pair = elt.split('=');
		pair[1] = decodeURIComponent(pair[1]).replace(/\+/g, " ");
		if (obj[pair[0]] && typeof obj[pair[0]] == 'string') {
			let placeholder = obj[pair[0]];
			obj[pair[0]] = new Array();
			obj[pair[0]].push(placeholder, pair[1]);
		}else	if (obj[pair[0]] && obj[pair[0]] instanceof Array == true) {
			obj[pair[0]].push(pair[1]);
		}else{
			obj[pair[0]] = pair[1];
		}
	});
	return obj;
}