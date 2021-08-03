export default function formatDate(val) {
	const d = new Date(val);
	// let temp = d.toLocaleString();
	return d.getFullYear() + "-" + convertDigit(d.getMonth() + 1) + "-" + convertDigit(d.getDate()) + " at " + "\n" + 
	convertDigit(d.getHours()) + ":" + convertDigit(d.getMinutes()) + ":" + convertDigit(d.getSeconds());
}

function convertDigit(val) {
	return val > 9 ? val : "0" + val; 
}