// ========================================
// CÓDIGO PARA GOOGLE APPS SCRIPT
// ========================================
// INSTRUCCIONES:
// 1. Abre tu Google Sheet
// 2. Ve a Extensiones → Apps Script
// 3. Borra todo el código por defecto
// 4. Copia y pega este código completo
// 5. Guarda (Ctrl+S)
// 6. Implementar → Nueva implementación
// 7. Tipo: Aplicación web
// 8. Ejecutar como: Tu cuenta
// 9. Quién tiene acceso: Cualquier persona
// 10. Implementar
// 11. COPIA LA URL y pégala en script.js (línea donde dice TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI)
// ========================================

function doPost(e) {
  try {
    // Obtener la hoja activa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos del formulario
    const data = JSON.parse(e.postData.contents);
    
    // Si es la primera vez, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Categoría',
        'Equipo',
        'Nombre',
        'Cédula',
        'Celular',
        'Correo',
        'Fecha Nacimiento',
        'Año Graduación'
      ]);
      
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Agregar nueva fila con los datos
    sheet.appendRow([
      new Date(),                  // Timestamp
      data.categoria,              // Categoría
      data.equipo,                 // Equipo
      data.nombre,                 // Nombre
      data.cedula,                 // Cédula
      data.celular,                // Celular
      data.correo,                 // Correo
      data.nacimiento,             // Fecha Nacimiento
      data.graduacion              // Año Graduación
    ]);
    
    // Ajustar el ancho de las columnas automáticamente
    sheet.autoResizeColumns(1, 9);
    
    // Retornar respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'success',
        'message': 'Datos registrados correctamente'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Retornar error
    return ContentService
      .createTextOutput(JSON.stringify({ 
        'result': 'error', 
        'error': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba (opcional)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        categoria: "Olympus",
        equipo: "Manchester",
        nombre: "Juan Pérez",
        cedula: "1234567890",
        celular: "0991234567",
        correo: "juan@ejemplo.com",
        nacimiento: "1995-05-15",
        graduacion: "2013"
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}
