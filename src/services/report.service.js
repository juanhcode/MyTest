const Informe = require('../database/models/Informe')
const CasoPrueba = require('../database/models/CasoPrueba');
const PDFDocument = require("pdfkit-table");
const fs = require('fs');
const {
    reportByIDExists
} = require('../helpers/db-validators')

const createReport = async(newReport) => {
    const reportCreation = new Informe(newReport);
    await reportCreation.save();
    return reportCreation;
}

const getReportXTestCase = async () => {
    const getReports = await Informe.findAll({
        include: CasoPrueba
    })
    return getReports
}

const updateReport = async (report, id) => {
    const reportUpdated = await Informe.update(report,{
        where: {
            id: id
        }
    })
    return reportUpdated;
}

const deleteReport = async (id) => {
    const reportDeleted = await Informe.destroy({
        where: {
            id: id
        }
    })
    return reportDeleted
}

const buildPDF = async(id, dataCallback, endCallback) => {
    const report = await reportByIDExists(id);
    console.log(report,'--------------------------');
    const metricasSplit = report.metricas_de_calidad.split(',');
    const doc = new PDFDocument();

    doc.on('data',dataCallback);
    doc.on('end', endCallback);
    const table = {
        title: `Informe del caso de prueba #${report.caso_de_prueba_id}`,
        headers: [ "Metricas de calidad", "Porcentaje", ],
        rows: [
          [ "Tiempo de entrega", `${metricasSplit[0]}%`],
          [ "Cantidad de código", `${metricasSplit[1]}%`],
          [ "Tasa de éxito de la meta del sprint.", `${metricasSplit[2]}%`]
        ],
      };
      // or columnsSize
      await doc.table(table, {
        prepareHeader: () => doc.fontSize(12),
        prepareRow: () => doc.fontSize(10), 
        columnsSize: [ 200, 100 ],
      },);
      const table2 = {
        headers: [ "Cobertura de pruebas", "Porcentaje"],
        rows: [
          [ "Cantidad de codigo cubierto", `${report.cobertura_de_pruebas}%`]
        ]
      };
      // or columnsSize
      await doc.table(table2, { 
        prepareHeader: () => doc.fontSize(12),
        prepareRow: () => doc.fontSize(10), 
        columnsSize: [ 200, 100 ]
      });
      const table3 = {
        headers: [ "Estadistica de errores", "Porcentaje"],
        rows: [
          [ "Errores reportados:", `${report.estadistica_de_errores}%`]
        ]
      };
      // or columnsSize
      await doc.table(table3, { 
        prepareHeader: () => doc.fontSize(12),
        prepareRow: () => doc.fontSize(10), 
        columnsSize: [ 200, 100 ]
      });
    doc.end();
}

module.exports = {
    createReport,
    getReportXTestCase,
    updateReport,
    deleteReport,
    buildPDF
}