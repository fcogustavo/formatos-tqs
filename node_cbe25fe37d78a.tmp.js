const fs = require('fs');
const PDFDataExtract = require('pdfdataextract');

const pdfDataExtract = async (file) => {

	const file_data = fs.readFileSync(file);

	// Busca o data aguardando.
	try {
		const data_1 = await PDFDataExtract.PdfData.extract(file_data, {
			pages: 100,
			sort: true,
			verbosity: PDFDataExtract.VerbosityLevel.ERRORS,
			get: {
				pages: true,
				text: true,
				fingerprint: true,
				outline: true,
				metadata: true,
				info: true,
				permissions: true, // get permissions
			}
		});

		// Formata o objeto gauges a partir do data.

		let data_text = ''
		data_1.text.forEach(txt => {
			txt += '\n';
			data_text += txt;
		});
		//console.log(data_1.text)
		let textSplit = data_text.split('\n');
		//console.log(textSplit);
		let numbers = [];
		textSplit.forEach(txt => {
			let a = txt.split(' ')
			console.log(a)
			if (Number(a[0]) > 0) {
				let i = 1
				b = a[1]
				while (Number(b.slice(b.length - i, b.length)) <= Number(a[0])) {
					i++
				}
				let c = a[1].slice(0, a[1].length - i)
				let d = a[1].slice(a[1].length - i, a[1].length)
				a.splice(1, 1, c, d)
				console.log(a)
				numbers.push(
					{
						formato: Number(a[0]),
						dobras: Number(a[1])
					}
				);
				numbers.push(
					{
						formato: Number(a[2]),
						dobras: Number(a[3])
					}
				)
			}

		})



		

		return {gauges, summary, totalWeight};
	} catch (err) {
		console.log(`Ocorreu um erro durante o processo: ${err.message}`);
		return "Ocorreu um erro. Verifique o formato do arquivo.";
	};
};

(async () => {
	const test = await pdfDataExtract('arquives_test/Caderno de Formatos.pdf');
	console.log(test);
})()

module.exports = pdfDataExtract;