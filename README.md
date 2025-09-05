# 📊 Analizador de Componentes Angular

Este proyecto proporciona una herramienta para analizar y visualizar los componentes de un proyecto Angular, contabilizando su uso en los templates HTML.

## 🚀 Características

- **Análisis automático**: Escanea todos los archivos HTML de un proyecto Angular
- **Prefijo personalizable**: Permite especificar el prefijo de los componentes a buscar
- **Visualización interactiva**: Genera gráficas usando D3.js y Billboard.js
- **Reporte detallado**: Muestra estadísticas, tablas y gráficas de distribución
- **Interfaz moderna**: Dashboard responsivo con diseño atractivo

## 📋 Requisitos

- Node.js (versión 16 o superior)
- npm o yarn

## 🛠️ Instalación

1. Clona o descarga este proyecto
2. Navega al directorio del proyecto:
   ```bash
   cd count-components
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## 📖 Uso

### 1. Ejecutar el análisis

Para analizar un proyecto Angular, ejecuta el siguiente comando:

```bash
npm run analyze <directorio-del-proyecto> <prefijo-de-componentes>
```

**Ejemplos:**

```bash
# Analizar proyecto con prefijo 'app'
npm run analyze /ruta/a/mi-proyecto-angular app

# Analizar proyecto con prefijo 'my'
npm run analyze /ruta/a/mi-proyecto-angular my

# Analizar proyecto con prefijo 'custom'
npm run analyze /ruta/a/mi-proyecto-angular custom
```

### 2. Visualizar los resultados

Después de ejecutar el análisis, inicia el servidor web para ver los resultados:

```bash
npm run serve
```

Esto abrirá automáticamente tu navegador en `http://localhost:8080` mostrando el dashboard con:

- **Estadísticas generales**: Total de componentes, tipos únicos, nombre del proyecto
- **Gráfico circular**: Distribución de componentes por tipo
- **Gráfico de barras**: Frecuencia de uso de cada componente
- **Tabla detallada**: Lista completa con frecuencias y porcentajes

## 📁 Estructura del Proyecto

```
count-components/
├── assets/
│   ├── billboard.min.css      # Estilos de Billboard.js
│   ├── billboard.min.js       # Biblioteca de gráficas
│   └── report.js              # Lógica de visualización
├── count-components.ts        # Script principal de análisis
├── index.html                 # Dashboard web
├── package.json               # Configuración del proyecto
└── README.md                  # Este archivo
```

## 🔧 Scripts Disponibles

- `npm run analyze <directorio> <prefijo>`: Ejecuta el análisis del proyecto
- `npm run serve`: Inicia el servidor web para visualizar resultados
- `npm run build`: Compila el TypeScript (opcional)

## 📊 Formato de Salida

El análisis genera un archivo `analysis-result.json` con la siguiente estructura:

```json
{
  "projectDirectory": "/ruta/al/proyecto",
  "componentPrefix": "app",
  "totalComponents": 150,
  "components": {
    "app-header": 5,
    "app-sidebar": 3,
    "app-footer": 2
  },
  "analysisDate": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Cómo Funciona

1. **Escaneo de archivos**: El script recorre recursivamente el directorio especificado buscando archivos `.html`
2. **Análisis de componentes**: Utiliza expresiones regulares para encontrar etiquetas de cierre de componentes con el prefijo especificado
3. **Conteo y agrupación**: Cuenta las ocurrencias de cada componente encontrado
4. **Generación de reporte**: Crea un archivo JSON con todos los resultados
5. **Visualización**: El dashboard web carga estos datos y los presenta en gráficas interactivas

## 🎨 Personalización

### Colores de las Gráficas

Puedes modificar la paleta de colores editando el array `colorPalette` en `assets/report.js`:

```javascript
const colorPalette = [
  '#667eea', '#764ba2', '#f093fb', // ... más colores
];
```

### Estilos del Dashboard

Los estilos están definidos en el archivo `index.html` dentro de la etiqueta `<style>`. Puedes modificar:

- Colores de fondo
- Tipografías
- Espaciado
- Diseño responsivo

## 🐛 Solución de Problemas

### Error: "Directory does not exist"
- Verifica que la ruta al proyecto Angular sea correcta
- Asegúrate de usar rutas absolutas o relativas correctas

### Error: "No components found"
- Verifica que el prefijo especificado sea correcto
- Asegúrate de que el proyecto tenga archivos HTML con componentes
- Revisa que los componentes usen el prefijo especificado

### Error al cargar el dashboard
- Asegúrate de que existe el archivo `analysis-result.json`
- Verifica que el servidor web esté ejecutándose
- Revisa la consola del navegador para errores adicionales

## 📝 Notas

- El script busca etiquetas de **cierre** de componentes (ej: `</app-component>`)
- Solo analiza archivos con extensión `.html`
- El análisis es recursivo, incluyendo subdirectorios
- Los resultados se guardan en `analysis-result.json` en el directorio actual

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
