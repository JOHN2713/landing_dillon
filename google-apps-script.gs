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
    
    // Log para debugging
    Logger.log('Datos recibidos: ' + JSON.stringify(data));
    Logger.log('Graduado: ' + data.graduado);
    Logger.log('Graduación: ' + data.graduacion);
    Logger.log('No Graduado: ' + data.noGraduado);
    
    // Determinar el estado de graduación
    let estadoGraduacion = '';
    if (data.noGraduado === 'Sí') {
      estadoGraduacion = 'No se graduó';
    } else if (data.graduado === 'Sí' && data.graduacion && data.graduacion !== 'N/A') {
      estadoGraduacion = 'Graduado en ' + data.graduacion;
    } else {
      estadoGraduacion = 'Sin información';
    }
    
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
        'Estado de Graduación'
      ]);
      
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Agregar nueva fila con los datos
    sheet.appendRow([
      new Date(),                         // Timestamp
      data.categoria || '',               // Categoría
      data.equipo || '',                  // Equipo
      data.nombre || '',                  // Nombre
      data.cedula || '',                  // Cédula
      data.celular || '',                 // Celular
      data.correo || '',                  // Correo
      data.nacimiento || '',              // Fecha Nacimiento
      estadoGraduacion                    // Estado de Graduación
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
  // Prueba 1: Usuario graduado
  const testDataGraduado = {
    postData: {
      contents: JSON.stringify({
        categoria: "Olympus",
        equipo: "Manchester",
        nombre: "Juan Carlos Pérez González",
        cedula: "1234567890",
        celular: "0991234567",
        correo: "juan@ejemplo.com",
        nacimiento: "1995-05-15",
        graduado: "Sí",
        graduacion: "2013",
        noGraduado: "No"
      })
    }
  };
  
  Logger.log('=== PRUEBA 1: Usuario Graduado ===');
  const result1 = doPost(testDataGraduado);
  Logger.log(result1.getContent());
  
  // Prueba 2: Usuario NO graduado del colegio
  const testDataNoGraduado = {
    postData: {
      contents: JSON.stringify({
        categoria: "Master",
        equipo: "Faced",
        nombre: "María José López Ramírez",
        cedula: "0987654321",
        celular: "0998765432",
        correo: "maria@ejemplo.com",
        nacimiento: "2000-08-20",
        graduado: "No",
        graduacion: "N/A",
        noGraduado: "Sí"
      })
    }
  };
  
  Logger.log('=== PRUEBA 2: Usuario NO Graduado del Colegio ===');
  const result2 = doPost(testDataNoGraduado);
  Logger.log(result2.getContent());
  
  // Prueba 3: Usuario que no marcó ninguna opción
  const testDataNinguno = {
    postData: {
      contents: JSON.stringify({
        categoria: "Senior",
        equipo: "Piwis",
        nombre: "Pedro Antonio Martínez Silva",
        cedula: "1122334455",
        celular: "0993344556",
        correo: "pedro@ejemplo.com",
        nacimiento: "2002-03-10",
        graduado: "No",
        graduacion: "N/A",
        noGraduado: "No"
      })
    }
  };
  
  Logger.log('=== PRUEBA 3: Usuario sin marcar ninguna opción ===');
  const result3 = doPost(testDataNinguno);
  Logger.log(result3.getContent());
}
