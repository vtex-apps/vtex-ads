# VTEX Ads APP VTEX

La instalación incluye los siguientes pasos:

**1** - Instalar la app usando la CLI de VTEX:

```bash
vtex install vtex.vtex-ads
```

**2** - Agregar la app como una dependencia del tema en el archivo `manifest.json`.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

**3** - Configurar el ID del publisher en el panel de administración de VTEX.

**4** - Configurar el ID de la marca si es necesario en el panel de administración de VTEX.

**5** - Declarar los bloques de la app en el tema.

## Modo de Desarrollo

> 🚧 `vtex workspace use vtexads`

Toda la implementación debe realizarse en el entorno de desarrollo. Usa el workspace de vtexads para pruebas. Después de la validación, publícalo en el entorno master de la tienda.

## Componentes Disponibles

1. `vtex-ads-banner`  
   Este componente es responsable de la solicitud, visualización y gestión de eventos relacionados con anuncios de tipo banner. Mostrará un banner en el lugar designado.
2. `vtex-ads-shelf`  
   Este componente es responsable de la solicitud, visualización y gestión de eventos relacionados con anuncios de tipo productos. Creará un carrusel de productos en el lugar designado utilizando componentes nativos de VTEX.
3. `vtex-ads-sponsored-brands`  
   Este componente es responsable de mostrar anuncios de marcas patrocinadas.
4. `vtex-ads-pixel-event`  
   Este componente debe usarse dentro de las tarjetas de producto para escuchar eventos de productos (clics, impresiones, etc.).
5. `vtex-ads-conversion`  
   Este componente es responsable de gestionar eventos de conversión. **Por favor, consulta con el soporte técnico antes de implementar este componente.**

| Para más información, visita la página sobre los componentes. Allí podrás encontrar la documentación específica de cada uno y las propiedades que reciben a través de las propiedades del bloque o del editor del sitio.

> 📁 **Ejemplos Completos**: Revisa la carpeta `examples/` para ejemplos de implementación más robustos y completos que cubren diferentes escenarios y casos de uso.

## Mostrando Anuncios

Agrega los componentes correspondientes en las páginas que mostrarán los anuncios y haz los ajustes visuales necesarios.

> Es fundamental tener al menos un conocimiento básico de la declaración de bloques de VTEX.

**📘 Implementación**  
Usa la página de búsqueda como ejemplo.  
`store/blocks/search/`

> El nombre del archivo puede variar según el tema si ha sido personalizado.

1. Agregar componentes de visualización de anuncios.

```json
{
  "vtex-ads-banner": {
    "title": "VTEX Ads Banner - search_header",
    "props": {
      "placementName": "search_header",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "vtex-ads-sponsored-brands": {
    "title": "VTEX Ads Sponsored Brands",
    "props": {
      "placementName": "search_sponsored_brands",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "store.search": {
    "blocks": [
      "vtex-ads-banner",
      "vtex-ads-sponsored-brands",
      "vtex-ads-shelf",
      "search-result-layout"
    ]
  }
}
```

2. Si hay variaciones en los componentes para manejar la capacidad de respuesta, sigue el mismo procedimiento.

```json
{
  "my-mobile-search-component": {
    "props": {},
    "children": [
      "vtex-ads-banner",
      "vtex-ads-sponsored-brands",
      "vtex-ads-shelf",
      "another-children"
    ]
  }
}
```

## Seguimiento de Eventos de Producto

**📘 Implementación**

Para rastrear eventos de productos (clics, impresiones, etc.), agrega el componente `vtex-ads-pixel-event` dentro de tus tarjetas de producto.

```json
{
  "product-summary.shelf": {
    "children": [
      "vtex-ads-pixel-event",
      "product-summary-image",
      "product-summary-name",
      "product-summary-price"
    ]
  }
}
```

> El componente `vtex-ads-pixel-event` debe colocarse como hijo del componente de tarjeta de producto para rastrear correctamente las interacciones del usuario.

## Notificando Conversión

**📘 Implementación**

> ⚠️ **Importante**: Antes de implementar el componente de conversión, consulta con el soporte técnico para determinar si es necesario para tu caso de uso específico.

También necesitarás agregar un componente en la página `OrderPlaced` para rastrear eventos de conversión.

1. Agregar el `vtex-ads-conversion` en el archivo de configuración de la página Order Placed `store/blocks/orderplaced.jsonc`.

> El nombre del archivo puede variar según el tema si ha sido personalizado.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```
