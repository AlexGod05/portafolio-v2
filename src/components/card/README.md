# Sistema de Tarjetas (@card)

Este módulo proporciona una estructura reutilizable para tarjetas en toda la aplicación. Su objetivo es evitar la duplicación de código, manteniendo estilos consistentes y funcionalidad compartida, mientras que los componentes visuales (Astro) se mantienen en sus respectivas secciones.

## Estructura

```
src/components/card/
├── index.ts         # Exporta scripts y referencias a componentes
├── scripts/         # Scripts reutilizables para las tarjetas
│   ├── card-init.ts     # Inicialización general de todas las tarjetas
│   ├── card-utils.ts    # Funciones utilitarias para tarjetas
│   └── companyCards.ts  # Funcionalidad específica para tarjetas de empresas
└── styles/          # Estilos CSS reutilizables
    └── cards.css    # Estilos comunes para todas las tarjetas
```

## Componentes Astro

Los componentes Astro (.astro) se mantienen en sus respectivas carpetas de secciones, pero **deben importar** los estilos comunes:

```astro
<style>
  @import '@card/styles/cards.css';
  
  /* Estilos específicos adicionales */
</style>
```

## Scripts

El módulo proporciona varios scripts reutilizables:

### Scripts generales
- **CardScripts**: Inicialización general de todas las tarjetas
- **card-utils.ts**: Utilidades como efectos hover, manejo de clics, etc.

### Scripts específicos
- **CompanyCardScripts**: Funcionalidad específica para tarjetas de empresa (modales, etc.)

## Uso

### 1. Importar estilos en componentes Astro

```astro
<style>
  @import '@card/styles/cards.css';
  
  /* Tus estilos específicos */
</style>
```

### 2. Usar clases de CSS consistentes

- `.card`: Clase base para todas las tarjetas
- `.card-content`: Contenedor interno
- `.card-header`: Encabezado de la tarjeta
- `.cards-grid`: Grid para mostrar múltiples tarjetas

### 3. Inicializar scripts

En tu archivo de script principal:

```ts
import { CardScripts } from '@card/index';

// Inicializar todas las funcionalidades de tarjetas
document.addEventListener('DOMContentLoaded', () => {
  CardScripts();
});
```

## Extensión

Para añadir nuevos tipos de tarjetas:

1. Crea el componente Astro en su sección correspondiente
2. Usa las clases CSS base (`card`, `card-content`, etc.)
3. Importa los estilos comunes
4. Si necesitas scripts específicos, agrégalos a `/scripts` y expórtalos en `index.ts` 