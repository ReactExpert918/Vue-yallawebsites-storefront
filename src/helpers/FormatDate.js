export default function formatDate(val) {
	const d = new Date(val);
	// let hour = convert24to12(convertDigit(d.getHours()));
	if(convertDigit(d.getHours()) < 12) {
		return d.getFullYear() + "-" + convertDigit(d.getMonth() + 1) + "-" + convertDigit(d.getDate()) + " at " + "\n" + 
		convertDigit(d.getHours()) + ":" + convertDigit(d.getMinutes()) + "AM";
	}
	else {
		return d.getFullYear() + "-" + convertDigit(d.getMonth() + 1) + "-" + convertDigit(d.getDate()) + " at " + "\n" + 
		(convertDigit(d.getHours()) - 12) + ":" + convertDigit(d.getMinutes()) + "PM";
	}
	
}

function convertDigit(val) {
	return val > 9 ? val : "0" + val; 
}