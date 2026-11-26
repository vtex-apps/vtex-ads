# Instalación de VTEX Ads APP

Esta app te permite mostrar anuncios en tiendas VTEX de manera simple y configurable. Ofrece componentes listos para usar que renderizan banners, carruseles de productos patrocinados y ubicaciones de marcas patrocinadas en áreas estratégicas de tu tienda.

Aunque esta app está diseñada para funcionar perfectamente con el VTEX Site Editor (CMS), la configuración inicial requiere un desarrollador. Los bloques de anuncios deben declararse primero en el código del tema de la tienda antes de estar disponibles en el Site Editor, donde las configuraciones visuales y de comportamiento pueden ajustarse según sea necesario.

## Modo de Desarrollo

> 🚧 `vtex use vtexads`

Toda la implementación debe realizarse en el entorno de desarrollo. Usa el workspace vtexads para pruebas. Después de la validación, publícalo en el entorno master de la tienda.

## Instalación

La instalación involucra los siguientes pasos:

### 1. Instalar la App vía VTEX CLI

```bash
vtex install vtex.vtex-ads
```

### 2. Declarar la dependencia en manifest.json
Agrega la app como dependencia del tema en el archivo `manifest.json`.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

### 3. Vincular el tema
Vincula el tema para ver los cambios. `vtex link`

### 4. Configurar la app

Accede al panel de administración de tu tienda y configura:
- Publisher ID (requerido)
- Brand ID (opcional para editores multi-marca)

> ⚙️ La configuración también se puede hacer vía enlace directo:  
> `https://{{workspace}}--{{account}}.myvtex.com/admin/apps/vtex.vtex-ads@0.0.1/setup`  
>  
> ⚠️ Este enlace puede variar dependiendo del **workspace** o **versión de la app**.

Alternativamente, puedes acceder a la configuración manualmente desde el VTEX Admin:

1. Ve al menú lateral y haz clic en **Apps**.
2. Luego selecciona **Mis Apps**.
3. Busca **VTEX Ads**.
4. Haz clic en la app para acceder a su página de configuración.

### 5. ¡Agreguemos algunos anuncios!
Ahora necesitas definir dónde aparecerán tus anuncios. Para cada página que mostrará anuncios, agrega los bloques correspondientes.

#### Componentes Disponibles

1. `vtex-ads-banner`  
   Este componente es responsable de solicitar, mostrar y gestionar eventos relacionados con anuncios tipo banner. Mostrará un banner en la ubicación designada.
2. `vtex-ads-shelf`  
   Este componente es responsable de solicitar, mostrar y gestionar eventos relacionados con anuncios tipo producto. Renderiza una lista de productos patrocinados usando componentes nativos de VTEX.  
   Para asegurar que el estilo de tu tema y las reglas de negocio se preserven, pasa un bloque personalizado `list-context.product-list-static` para envolver el estante, y luego usa la tarjeta de producto de tu tema (ej., `product-summary.shelf`) dentro de él.  
   Consulta la sección de ejemplos de uso para la estructura correcta del bloque.
3. `vtex-ads-sponsored-brands`  
   Este componente es responsable de mostrar anuncios de marcas patrocinadas.
4. `vtex-ads-stories`  
   Este componente es responsable de solicitar y mostrar anuncios de Stories: un carrusel de videos de productos patrocinados, con agregar y quitar del carrito de la tienda.
5. `vtex-ads-pixel-event`  
   Este componente debe usarse dentro de las tarjetas de producto para escuchar eventos de producto (clics, impresiones, etc.).
6. `vtex-ads-conversion`  
   Este componente es responsable de gestionar eventos de conversión. **Por favor consulta con soporte técnico antes de implementar este componente.**

| Para más información, visita la página de componentes. Allí puedes encontrar documentación específica para cada componente y las propiedades que reciben a través de propiedades de bloque o vía site editor.

### Mostrando Anuncios

**Es esencial tener al menos un entendimiento básico de la declaración de bloques de VTEX.**

> 📁 **Ejemplos Completos**: Revisa la carpeta `examples/` para ejemplos de implementación más robustos y completos que cubren diferentes escenarios y casos de uso.

Agrega los componentes correspondientes a las páginas que mostrarán los anuncios y haz los ajustes visuales necesarios.

#### 📄 Ejemplos de Uso
Usa la página de búsqueda como ejemplo.  
`store/blocks/search/`

> El nombre del archivo puede variar dependiendo del tema si ha sido personalizado.

1. Agregar componentes de visualización de anuncios.

```json
{
  "vtex-ads-banner#search-top-banner": {
    "title": "VTEX Ads Banner - Banner superior",
    "props": {
      "placementName": "site_search_top_banner",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "vtex-ads-sponsored-brands#search-top-sb": {
    "title": "VTEX Ads Sponsored Brands",
    "props": {
      "placementName": "site_search_top_sponsored_brands",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "store.search": {
    "blocks": [
      "vtex-ads-banner#search-top-banner",
      "vtex-ads-sponsored-brands#search-top-sb",
      "search-result-layout"
    ]
  }
}
```

2. Si hay variaciones de componentes para manejar la responsividad, sigue el mismo procedimiento.

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

### 6. Seguimiento de Eventos de Producto

**📘 Implementación**

Para rastrear eventos de producto (clics, impresiones, etc.), agrega el componente `vtex-ads-pixel-event` dentro de tus tarjetas de producto.

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

> El componente `vtex-ads-pixel-event` debe colocarse como hijo del componente de tarjeta de producto para rastrear adecuadamente las interacciones del usuario.

### 7. Notificación de Conversión

**📘 Implementación**

> ⚠️ **Importante**: Antes de implementar el componente de conversión, por favor consulta con soporte técnico para determinar si es necesario para tu caso de uso específico.

También necesitarás agregar un componente a la página `OrderPlaced` para rastrear eventos de conversión.

1. Agrega el `vtex-ads-conversion` al archivo de configuración de la página Order Placed `store/blocks/orderplaced.jsonc`.

> El nombre del archivo puede variar dependiendo del tema si ha sido personalizado.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```