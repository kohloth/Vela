function corr(d1, d2) {
	let { min, pow, sqrt } = Math
	let add = (a, b) => a + b
	let n = min(d1.length, d2.length)
	if (n === 0) return 0
	[d1, d2] = [d1.slice(0, n), d2.slice(0, n)]
	let [sum1, sum2] = [d1, d2].map(l => l.reduce(add))
	let [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0))
	let mulSum = d1.map((n, i) => n * d2[i]).reduce(add)
	let dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n))
	if (dense === 0) return 0;
	return (mulSum - (sum1 * sum2 / n)) / dense
}

console.log(corr([100, 200, 500], [100, 200, 500])); // 1
console.log(corr([100, 200, 500], [-100, -200, -500])); // -1
console.log(corr([100, 200, 500], [-50, -100, -250])); // -1
console.log(corr([1, 2, 3], [1.1, 3, 2.8])); // -0.98411...
console.log(corr([12, 44, 33], [-5, -39, -22])); // -0.814...
console.log(corr([142, 424, 133], [-45, -139, -272])); // -0.125...
console.log(corr([0, 2, 0], [1, 2, 3])); // 0
console.log(corr([null, 2, null], [1, 2, 3])); // 0
