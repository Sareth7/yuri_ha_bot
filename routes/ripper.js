module.exports.isLink = function(str) {
	const regExp = /(https?\:\/\/)?(readmanga\.me\/)([A-z0-9\_]+)/;
	if(regExp.test(str)) {
		const [,,,mangaName = ""] = str.match(regExp);
		return mangaName.toLowerCase();
	}else{
		return false;
	}
}