function queryToJson(link){
	if(link.indexOf('?') < 0){
		return "URL must contain query strings";
	}
	if(link){
		link = link.substring(link.indexOf('?')+1)
		.replace(/=/g, ' : ')
		.replace(/&/g, ' , ')
		.split(' ')
	}else{
		link = location.search.substring(1)
		.replace(/=/g, ' : ')
		.replace(/&/g, ' , ')
		.split(' ');
	}

	link=link.map((a)=>{
		return (a==':' || a==',')? a: a = `\"${a}\"`;
	})
	link = decodeURIComponent(`{${link.join('').replace(/\+/g, ' ')}}`);
	console.log(link);
	console.log(JSON.parse(link));
	try{
		return JSON.parse(link);
	}catch(errmsg){
		console.log("error", errmsg);
		return "error in url query string"
	}
}