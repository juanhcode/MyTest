const pdfService = require('../services/report.service');


const buildPdf = async (req, res) => {
    const { id } = req.params;
    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=informe.pdf'
    });

    pdfService.buildPDF(
        id,
        (chunk) => stream.write(chunk),
        () => stream.end()
    )
};

module.exports = {
    buildPdf
}