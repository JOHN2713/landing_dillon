# 📊 INSTRUCCIONES PARA CONECTAR CON GOOGLE SHEETS

## ✅ VALIDACIONES IMPLEMENTADAS

### 1. **Cédula Ecuatoriana**
- ✅ Debe tener exactamente 10 dígitos
- ✅ Solo números permitidos
- ✅ Los 2 primeros dígitos deben corresponder a una provincia válida (01-24)
- ✅ Validación con algoritmo módulo 10 (dígito verificador)
- ✅ Mensaje de error en tiempo real

### 2. **Celular Ecuatoriano**
- ✅ Debe tener exactamente 10 dígitos
- ✅ Debe empezar con "09"
- ✅ Solo números permitidos
- ✅ Formato: 09XXXXXXXX
- ✅ Mensaje de error en tiempo real

### 3. **Correo Electrónico**
- ✅ Formato válido de email (usuario@dominio.com)
- ✅ Validación en tiempo real
- ✅ Mensaje de error descriptivo

### 4. **Selección Dinámica de Equipos**
- ✅ 3 Categorías: Olympus, Master, Senior
- ✅ 28 Equipos totales organizados por categoría
- ✅ Filtrado automático al seleccionar categoría
- ✅ Campo de equipo se habilita solo después de seleccionar categoría

---

## 🔗 PASOS PARA CONECTAR CON GOOGLE SHEETS

### **PASO 1: Crear Google Sheet**

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada: **"Registro Torneo Dillon 2026"**
3. Los encabezados se crearán automáticamente con el script
4. **NO agregues encabezados manualmente** - el script lo hará por ti

---

### **PASO 2: Crear Google Apps Script**

1. En tu Google Sheet, ve a **Extensiones** → **Apps Script**
2. Borra el código por defecto que dice `function myFunction() { }`
3. Abre el archivo **`google-apps-script.gs`** de este proyecto
4. Copia TODO el contenido del archivo
5. Pégalo en el editor de Apps Script
6. Haz clic en **💾 Guardar** (o Ctrl+S)
7. Ponle un nombre al proyecto: "Registro Torneo Dillon"

---

### **PASO 3: Implementar el Script como Web App**

1. En el editor de Apps Script, haz clic en **Implementar** (botón azul arriba a la derecha)
2. Selecciona **Nueva implementación**
3. Haz clic en el ⚙️ junto a "Selecciona el tipo"
4. Selecciona **Aplicación web**
5. Configura:
   - **Descripción:** "Formulario Registro Torneo"
   - **Ejecutar como:** Tu cuenta (tu email)
   - **Quién tiene acceso:** **Cualquier persona** ⚠️ IMPORTANTE
6. Haz clic en **Implementar**
7. Te pedirá autorizar - haz clic en **Autorizar acceso**
8. Si te dice "Google no ha verificado esta app":
   - Haz clic en "Opciones avanzadas"
   - Haz clic en "Ir a [Nombre del proyecto] (no seguro)"
   - Haz clic en "Permitir"
9. **COPIA LA URL** que aparece (algo como: `https://script.google.com/macros/s/AKfycby.../exec`)

---

### **PASO 4: Conectar la Web con Google Sheets**

1. Abre el archivo **`script.js`** de tu proyecto
2. Busca la línea 375 aproximadamente que dice:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI';
   ```
3. Reemplaza `'TU_URL_DE_GOOGLE_APPS_SCRIPT_AQUI'` con la URL que copiaste en el Paso 3
4. Ejemplo:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
5. Guarda el archivo

---

## 📋 FORMATO DEL GOOGLE SHEET

El script creará automáticamente estos encabezados:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| **Timestamp** | **Categoría** | **Equipo** | **Nombre** | **Cédula** | **Celular** | **Correo** | **Fecha Nacimiento** | **Año Graduación** |

### **Ejemplo de datos:**
```
2026-04-18 10:30:15 | Olympus | Manchester | Juan Pérez | 1234567890 | 0991234567 | juan@mail.com | 1995-05-15 | 2013
```

---

## 🎯 EQUIPOS IMPLEMENTADOS (28 TOTALES)

### **Categoría Olympus (7 equipos)**
1. Copiadora 95
2. 6to H 96
3. Manchester
4. Chupines
5. Solo panas
6. Superdill
7. DFC

### **Categoría Master (11 equipos)**
1. Faced
2. Dillon corp
3. Dilfc 99
4. Gamonales
5. D2C
6. Copiadora 95
7. The Criminals
8. Egresados sexto C
9. Los de siempre
10. CCCC
11. Papá Oso

### **Categoría Senior (10 equipos)**
1. Copiadora 95
2. CCCC
3. Piwis
4. PG 2005
5. Lokura Dillon
6. Xforce
7. Franco canadiense
8. Estudiantes de la plata
9. Los de la 9
10. Los Primos

---

## ✅ VERIFICACIÓN

Para verificar que todo funciona:

1. **Abre tu página web** (index.html)
2. **Llena el formulario completo:**
   - Selecciona una categoría (ejemplo: Olympus)
   - Verás que el campo de equipos se habilita automáticamente
   - Selecciona un equipo (ejemplo: Manchester)
   - Completa nombre, cédula (10 dígitos), celular (09XXXXXXXX), email
   - Selecciona fecha de nacimiento y año de graduación
   - Acepta términos y condiciones
3. **Haz clic en "Registrarme"**
4. **Abre la consola del navegador** (F12)
   - Deberías ver: `✅ Datos enviados exitosamente a Google Sheets`
   - Y los datos validados
5. **Revisa tu Google Sheet**
   - Debe aparecer una nueva fila con todos los datos
   - El timestamp debe ser la fecha/hora actual

---

## 📊 FÓRMULAS ÚTILES EN GOOGLE SHEETS

Crea una segunda hoja llamada "Estadísticas" con estas fórmulas:

### **Contar registros por categoría:**
```
=COUNTIF(Registros!B:B,"Olympus")
=COUNTIF(Registros!B:B,"Master")
=COUNTIF(Registros!B:B,"Senior")
```

### **Contar jugadores por equipo:**
```
=COUNTIF(Registros!C:C,"Manchester")
=COUNTIF(Registros!C:C,"Faced")
```

### **Detectar cédulas duplicadas:**
En una columna nueva (J), agrega:
```
=IF(COUNTIF($E$2:$E,E2)>1,"⚠️ DUPLICADO","✅")
```

### **Total de registros:**
```
=COUNTA(Registros!A:A)-1
```

---

## 🔒 SEGURIDAD Y PRIVACIDAD

- ✅ Validación de cédula ecuatoriana con algoritmo oficial
- ✅ Validación de formato de celular ecuatoriano
- ✅ Validación de email
- ✅ Datos enviados directamente a Google Sheets (sin servidor intermedio)
- ⚠️ **NO compartas públicamente la URL del Apps Script**
- ✅ Solo tú tienes acceso al Google Sheet con los datos

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### **No se están guardando los datos:**
1. Verifica que la URL del script esté correctamente pegada en script.js
2. Asegúrate de haber dado permiso "Cualquier persona" en la implementación
3. Revisa la consola del navegador (F12) para ver errores
4. Verifica que el Google Sheet esté abierto y accesible

### **Error "Script function not found":**
- Vuelve a implementar el script (Implementar → Administrar implementaciones → Editar → Nueva versión)

### **Los equipos no se filtran:**
- Verifica que el campo categoría esté seleccionado
- Revisa la consola del navegador para errores de JavaScript

### **Aparece "Primero seleccione una categoría":**
- Es normal - el campo de equipos está deshabilitado hasta que selecciones una categoría
- Selecciona primero Olympus, Master o Senior

---

## 📧 PRÓXIMAS MEJORAS SUGERIDAS

1. ✅ Enviar email de confirmación automático al registrarse
2. ✅ Verificar cédulas duplicadas antes de registrar
3. ✅ Crear certificado de registro en PDF
4. ✅ Dashboard con gráficos de estadísticas
5. ✅ Exportar lista de jugadores por equipo

---

**¡Listo! Tu formulario está conectado con Google Sheets** 🎉
