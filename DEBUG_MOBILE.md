# 🔍 DEBUG - INSTRUCCIONES PARA REVISAR EN MÓVIL

## 📱 PROBLEMA REPORTADO
- Usuario llena todos los campos en móvil
- Hace clic en "Registrarme"
- NO pasa a la pantalla de registro exitoso

---

## ✅ SOLUCIÓN IMPLEMENTADA

### **1. Removido atributo `required` del date picker desktop**
- El input type="date" ya NO tiene `required` en HTML
- Esto evita que bloquee el submit en móvil cuando está oculto

### **2. Agregados console.logs para debugging**
Los siguientes mensajes aparecerán en la consola:

```
🔍 Detectando dispositivo: MÓVIL (o DESKTOP)
📅 Valores móvil - Día: XX Mes: XX Año: XXXX
✅ Fecha formada: YYYY-MM-DD
✅ Todos los campos validados correctamente
📊 Datos a enviar: {objeto con todos los datos}
📤 Enviando a Google Sheets...
🎉 Mostrando modal de éxito
✅ Datos enviados exitosamente a Google Sheets
```

---

## 🧪 CÓMO REVISAR EN MÓVIL

### **Opción 1: Inspección Remota (Chrome)**

1. **En tu PC:**
   - Abre Chrome
   - Ve a: `chrome://inspect/#devices`
   - Asegúrate de que "Discover USB devices" esté marcado

2. **En tu móvil:**
   - Conecta el teléfono por USB a tu PC
   - Activa "Depuración USB" en Opciones de Desarrollador
   - Abre Chrome en el móvil
   - Navega a tu página

3. **En tu PC:**
   - Verás tu dispositivo en chrome://inspect
   - Haz clic en "Inspect"
   - Se abre DevTools para tu móvil
   - Ve a la pestaña "Console"

4. **Llena el formulario en el móvil**
   - Verás los logs en tu PC en tiempo real

---

### **Opción 2: Responsive Mode (Chrome Desktop)**

1. Abre tu página en Chrome
2. Presiona **F12** para abrir DevTools
3. Presiona **Ctrl + Shift + M** (o clic en el ícono de móvil)
4. Selecciona un dispositivo: **iPhone 14 Pro** o **Galaxy S20**
5. Recarga la página (**F5**)
6. Ve a la pestaña **Console**
7. Llena el formulario
8. Observa los logs que aparecen

---

### **Opción 3: Console en Safari (iOS)**

1. **En iPhone:**
   - Ve a Ajustes → Safari → Avanzado
   - Activa "Inspector Web"

2. **En Mac:**
   - Conecta el iPhone por cable
   - Abre Safari en Mac
   - Ve a Desarrollador → [Tu iPhone] → [Tu página]
   - Se abre el Inspector Web
   - Ve a Console

3. **Llena el formulario en iPhone**
   - Verás los logs en el Mac

---

## 🔍 QUÉ BUSCAR EN LOS LOGS

### **Si todo funciona correctamente verás:**
```
🔍 Detectando dispositivo: MÓVIL
📅 Valores móvil - Día: 15 Mes: 05 Año: 1995
✅ Fecha formada: 1995-05-15
✅ Todos los campos validados correctamente
📊 Datos a enviar: {...}
📤 Enviando a Google Sheets...
🎉 Mostrando modal de éxito
```

### **Si hay un problema con la fecha:**
```
🔍 Detectando dispositivo: MÓVIL
📅 Valores móvil - Día:  Mes:  Año: 
[ALERTA] Por favor complete la fecha de nacimiento
```

### **Si hay problemas de validación:**
```
❌ Errores en validación - no se envía
❌ Cédula ecuatoriana no válida
```

---

## 🎯 PASOS PARA TESTEAR

1. **Abre la página en móvil (o modo responsive)**
2. **Abre la consola (F12 → Console)**
3. **Llena todos los campos:**
   - ✅ Categoría: Olympus
   - ✅ Equipo: Manchester
   - ✅ Nombre: Juan Pérez
   - ✅ Cédula: 1234567890 (válida)
   - ✅ Celular: 0991234567
   - ✅ Email: test@mail.com
   - ✅ Día: 15
   - ✅ Mes: Mayo
   - ✅ Año: 1995
   - ✅ Año graduación: 2013
   - ✅ Términos: ✓
4. **Haz clic en "Registrarme"**
5. **Lee los mensajes en la consola**
6. **Captura de pantalla si hay error**

---

## 📋 CHECKLIST DE VALIDACIÓN

Antes de enviar, el sistema valida:

- [ ] Categoría seleccionada
- [ ] Equipo seleccionado
- [ ] Nombre no vacío
- [ ] Cédula válida (10 dígitos, provincia válida, dígito verificador)
- [ ] Celular válido (09XXXXXXXX)
- [ ] Email válido (formato correcto)
- [ ] Fecha de nacimiento completa (día + mes + año en móvil)
- [ ] Año de graduación seleccionado
- [ ] Términos aceptados

**Si TODAS están OK → Muestra modal de éxito**
**Si ALGUNA falla → Muestra error específico**

---

## 🛠️ SOLUCIONES RÁPIDAS

### **Problema: "Por favor complete la fecha de nacimiento"**
**Causa:** No has seleccionado día, mes o año
**Solución:** Asegúrate de seleccionar los 3 campos

### **Problema: "Cédula ecuatoriana no válida"**
**Causa:** La cédula no pasa el algoritmo de validación
**Solución:** Usa una cédula válida o prueba con: 1234567890

### **Problema: No aparece nada en consola**
**Causa:** JavaScript no se está cargando
**Solución:** 
- Recarga la página (F5)
- Verifica que script.js esté en la misma carpeta
- Revisa errores en Console

---

## 📞 INFORMACIÓN PARA REPORTAR

Si sigue sin funcionar, necesito:

1. **Screenshot de la consola** con todos los mensajes
2. **Dispositivo usado:** (ej: iPhone 14, Samsung S21, etc.)
3. **Navegador:** (ej: Chrome, Safari, Firefox)
4. **¿Qué mensaje de error aparece?** (si aparece alguno)
5. **¿Los selects de fecha están visibles?** (Día/Mes/Año)
6. **¿Seleccionaste los 3 valores?** (Día, Mes, Año)

---

## ✅ TEST RÁPIDO

Para verificar que todo funciona:

**Desktop:**
```
1. Abre index.html
2. F12 → Console
3. Llena formulario (usa date picker)
4. Debe aparecer: "🔍 Detectando dispositivo: DESKTOP"
5. Modal de éxito debe aparecer
```

**Móvil:**
```
1. Abre index.html en móvil
2. Llena formulario (usa selects Día/Mes/Año)
3. Console debe mostrar: "🔍 Detectando dispositivo: MÓVIL"
4. Modal de éxito debe aparecer
```

---

**¡Con estos logs podremos identificar exactamente dónde está el problema!** 🔍
