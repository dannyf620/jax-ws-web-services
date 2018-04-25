var fs = require('fs');
var jsonfile = require('jsonfile');

const file = '../Data/poblacion.json'; // poblacion file https://es.wikipedia.org/wiki/Anexo:Departamentos_de_Colombia_por_poblaci%C3%B3n
const file2 = '../Data/departamentosPIB.json';  // PIB file https://es.wikipedia.org/wiki/Anexo:Departamentos_de_Colombia_por_Producto_Interno_Bruto
const fileGeojson = '../Data/departamentos/depto.geojson'; //original file
const fileDepartamentos = '../Data/departamentos.json';
const fileWithPoblation = '../Data/departamentos/deptoPoblation.geojson';
const fileWithPIB = '../Data/departamentos/deptoPIB.geojson';

function getDptList() {
  jsonfile.readFile(fileGeojson, function (err, obj) {
    var listaDpt = obj.features.map(element => {
      var objTemp = {
        DPTO: element.properties.DPTO,
        NOMBRE_DPT: element.properties.NOMBRE_DPT
      }
      return objTemp;
    });
    jsonfile.writeFile(fileDepartamentos, listaDpt, function (err) {
      if (err)
        console.error(err)
    })
  })
}

function addPoblationData() {
  jsonfile.readFile(fileGeojson, (err, areaDpt) => {
    jsonfile.readFile(file, (err, poblacion) => {
      if (poblacion.length != areaDpt.features.length) {
        console.error("El numero de departamentos es inconpatibles");
      } else {
        var ArrayTest = [];
        for (var i = 0; i < poblacion.length; i++) {
          var feature = areaDpt.features.filter(geo => {
            return geo.properties.NOMBRE_DPT == poblacion[i].nombre
          })
          // console.log(feature);
          feature[0].properties.Pcabecera = poblacion[i].Pcabecera;
          feature[0].properties.Presto = poblacion[i].Presto;
          feature[0].properties.total_poblacion = poblacion[i].total_poblacion;
          ArrayTest.push(feature[0]);
        }
        // console.dir(ArrayTest);
        areaDpt.features.ArrayTest;
        jsonfile.writeFile(fileWithPoblation, areaDpt, function (err) {
          if (err)
            console.error(err)
        })
      }
    })
  })
}

function addPIBData() {
  jsonfile.readFile(fileGeojson, (err, areaDpt) => {
    jsonfile.readFile(file2, (err, PIB) => {
      if (PIB.length != areaDpt.features.length) {
        console.error("El numero de departamentos es inconpatibles");
      } else {
        var ArrayTest = [];
        for (var i = 0; i < PIB.length; i++) {
          var feature = areaDpt.features.filter(geo => {
            return geo.properties.NOMBRE_DPT == PIB[i].Departamento
          })
          feature[0].properties.PIB_PorcentajeParticipacion = PIB[i].PIB_PorcentajeParticipacion;
          feature[0].properties.Poblacion = PIB[i].Poblacion;
          feature[0].properties.PIB_millones_USD = PIB[i].PIB_millones_USD;
          feature[0].properties.PPA_Miles_millones_USD = PIB[i].PPA_Miles_millones_USD;
          feature[0].properties.PIB_per_capita_USD = PIB[i].PIB_per_capita_USD;
          feature[0].properties.PIB_per_capita_PPA_USD = PIB[i].PIB_per_capita_PPA_USD;
          ArrayTest.push(feature[0]);
        }
        // console.dir(ArrayTest);
        areaDpt.features.ArrayTest;
        jsonfile.writeFile(fileWithPIB, areaDpt, function (err) {
          if (err)
            console.error(err)
        })
      }
    })
  })
}
getDptList();
addPoblationData()
addPIBData()