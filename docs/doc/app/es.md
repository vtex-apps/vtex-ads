# VTEX Ads APP

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

## Componentes Disponibles

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

## Propiedades de Bloque

Las propiedades de bloque pueden definirse ya sea a través del site editor o directamente en la declaración del bloque en el tema. Se dará prioridad a los datos ingresados en el site editor.

## VTEX Ads Banner

`vtex-ads-banner`

Este componente renderiza banners en pantalla. Maneja el contexto de la página y consulta el servidor de anuncios para verificar si hay banners disponibles.

#### Propiedades vía bloque `isLayout: true`

Propiedades proporcionadas solo en la definición `json` del bloque dentro del tema.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_banner_default` | Nombre del placement usado en la consulta. Por defecto, se usará 'placement_banner_default'. Prefiere el nombre registrado en la plataforma de anuncios.       |
| `size`          | `string` | `banner`                   | Tamaño de imagen a solicitar. Mismo valor registrado en la plataforma de retail media.                                                                         |
| `sizeMobile`    | `string` | `null`                     | Tamaño de imagen a solicitar cuando se ve en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se usará el valor de escritorio. |
| `quantity`      | `number` | `1`                        | Cantidad de anuncios solicitados.                                                                                                                             |
| `categoryName`  | `string` | `null`                     | Nombre de categoría si quieres forzar segmentación.                                                                                                            |

#### Propiedades vía site editor

Propiedades proporcionadas en el site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indica si el placement está activo.                                                                                                                            |
| `placementNameAdmin` | `string`  | `null`        | Nombre del placement usado en la consulta.                                                                                                                     |
| `sizeAdmin`          | `string`  | `null`        | Tamaño de imagen a solicitar. Mismo valor registrado en la plataforma de retail media.                                                                         |
| `sizeMobileAdmin`    | `string`  | `null`        | Tamaño de imagen a solicitar cuando se ve en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se usará el valor de escritorio. |
| `quantityAdmin`      | `number`  | `null`        | Cantidad de anuncios solicitados.                                                                                                                             |
| `categoryNameAdmin`  | `string`  | `null`        | Nombre de categoría si quieres forzar segmentación.                                                                                                            |

## VTEX Ads Sponsored Brands

`vtex-ads-sponsored-brands`

Este componente renderiza anuncios de marcas patrocinadas en pantalla. Maneja el contexto de la página y consulta el servidor de anuncios para verificar si hay anuncios de marcas patrocinadas disponibles.

#### Propiedades vía bloque `isLayout: true`

Propiedades disponibles solo en la definición del bloque.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_brands_default` | Nombre del placement usado en la consulta. Por defecto, se usará 'placement_brands_default'. Prefiere el nombre registrado en la plataforma de anuncios.       |
| `size`          | `string` | `banner`                   | Tamaño de imagen a solicitar. Mismo valor registrado en la plataforma de retail media.                                                                         |
| `sizeMobile`    | `string` | `null`                     | Tamaño de imagen a solicitar cuando se ve en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se usará el valor de escritorio. |
| `categoryName`  | `string` | `null`                     | Nombre de categoría si quieres forzar segmentación.                                                                                                            |

#### Propiedades vía site editor

Propiedades disponibles en el site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indica si el placement está activo.                                                                                                                            |
| `placementNameAdmin` | `string`  | `null`        | Nombre del placement usado en la consulta.                                                                                                                     |
| `sizeAdmin`          | `string`  | `null`        | Tamaño de imagen a solicitar. Mismo valor registrado en la plataforma de retail media.                                                                         |
| `sizeMobileAdmin`    | `string`  | `null`        | Tamaño de imagen a solicitar cuando se ve en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se usará el valor de escritorio. |
| `categoryNameAdmin`  | `string`  | `null`        | Nombre de categoría si quieres forzar segmentación.                                                                                                            |

## VTEX Ads Shelf

`vtex-ads-shelf`

Este componente crea un estante con SKUs patrocinados. Toma el contexto de la página y consulta el servidor de anuncios para recuperar SKUs patrocinados. Después del resultado, se hace una consulta al catálogo de la tienda para construir el estante de productos.

#### Props del bloque `isLayout: true`

Propiedades disponibles solo en la definición del bloque.

| Prop name       | Type     | Default value               | Description                                                                                                                            |
| --------------- | -------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `quantity`      | `number` | `20`                        | Número de anuncios solicitados.                                                                                                        |
| `placementName` | `string` | `placement_product_default` | Nombre del placement usado en la consulta. Por defecto, se usará 'placement_product_default'. Prefiere el nombre registrado en la plataforma de anuncios. |
| `categoryName`  | `string` | `null`                      | Nombre de categoría si quieres forzar segmentación.                                                                                    |

#### Props del site editor

Propiedades disponibles en el site editor.

| Prop name            | Type     | Default value | Description                                        |
| -------------------- | -------- | ------------- | -------------------------------------------------- |
| `quantityAdmin`      | `number` | `null`        | Número de anuncios solicitados.                   |
| `placementNameAdmin` | `string` | `null`        | Nombre del placement usado en la consulta.         |
| `categoryNameAdmin`  | `string` | `null`        | Nombre de categoría si quieres forzar segmentación. |

## VTEX Ads Stories

`vtex-ads-stories`

Este componente renderiza el carrusel de Stories de VTEX Ads ([`@vtex/ads-stories`](https://www.npmjs.com/package/@vtex/ads-stories)): videos cortos de productos patrocinados. Los botones de agregar y quitar del carrito cambian el carrito de la tienda (`vtex.order-items`), y los precios y la disponibilidad vienen del catálogo de la tienda.

El Publisher ID viene de la configuración del app, como en los otros componentes. Sin él, el bloque no renderiza nada. Coloca el bloque dentro de un `flex-layout.row`, que le da el ancho del contenido de la tienda.

```json
{
  "vtex-ads-stories#home": {
    "title": "VTEX Ads - Stories home",
    "props": {
      "placement": "home_stories" // Placement de Stories registrado en la plataforma de anuncios
    }
  },
  "flex-layout.row#vtex-ads-stories": {
    "children": ["vtex-ads-stories#home"]
  },
  "store.home": {
    "blocks": [
      "flex-layout.row#vtex-ads-stories"
    ]
  }
}
```

#### Propiedades

Las mismas propiedades valen en la definición del bloque en el tema y en el site editor (excepto `hydration`, solo en el tema). Los valores del site editor tienen prioridad.

| Prop name | Type | Default value | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | `true` | Si es `false`, el bloque no se renderiza. |
| `placement` | `string` | `home_stories` | Nombre del placement de Stories registrado en la plataforma de anuncios. |
| `quantity` | `number` | `8` | Cantidad de Stories solicitados. |
| `slideDuration` | `number` | `5000` | Tiempo, en milisegundos, que cada Story permanece destacado. `0` desactiva el avance automático. |
| `inactiveAutoplay` | `boolean` | `false` | Si es `true`, los Stories que no están destacados también reproducen su video, sin sonido. |
| `hydration` | `"none"` | `null` | Solo en el tema. `"none"` no consulta precios y disponibilidad en el catálogo de la tienda. |
| `appearance` | `object` | `null` | Colores, fuente y esquinas. Ver la tabla abajo. |

#### Apariencia

Cada campo de `appearance` define una variable CSS del componente. Los campos vacíos mantienen el valor por defecto del componente o el definido por el CSS del tema.

| Campo | Variable CSS | Descripción |
| --- | --- | --- |
| `fontFamily` | `--vtex-ads-story-font-family` | Todo el texto, p. ej. "Inter", sans-serif. Vacío: la fuente de la tienda. |
| `colorText` | `--vtex-ads-story-color-text` | Texto fuera del video, como el panel del producto. Por defecto #242424 en el panel. |
| `colorMuted` | `--vtex-ads-story-color-muted` | El precio "de" y el agregar al carrito desactivado. Por defecto #6b6b6b. |
| `colorSurface` | `--vtex-ads-story-color-surface` | El panel del producto, el botón ver producto y el fondo detrás de un único Story. Por defecto #fff. |
| `colorAccent` | `--vtex-ads-story-color-accent` | Los botones del panel del producto. Por defecto #1b75a8. |
| `colorAccentContrast` | `--vtex-ads-story-color-accent-contrast` | Texto del botón agregar al carrito. Por defecto #fff. |
| `radius` | `--vtex-ads-story-radius` | Con unidad, p. ej. 20px. 0px deja tarjetas, píldoras y botones cuadrados. Los botones de ícono redondos siguen redondos. |

#### CSS

El contenedor del bloque tiene el CSS handle `stories-container`. El tema también puede definir las variables CSS en él, en `styles/css/vtex.vtex-ads.css`:

```css
.stories-container {
  --vtex-ads-story-color-accent: #f71963;
  --vtex-ads-story-radius: 20px;
}
```

## VTEX Ads Pixel Event

`vtex-ads-pixel-event`

Este componente debe usarse dentro de las tarjetas de producto para escuchar eventos de producto (clics, impresiones, etc.). Permite el seguimiento adecuado de las interacciones del usuario con los productos.

## VTEX Ads Conversion

`vtex-ads-conversion`

Este componente es responsable de enviar datos de pedidos de la tienda a la plataforma de anuncios. Se usa cuando no hay integración de API haciendo esto.

> ⚠️ **Importante**: Antes de implementar el componente de conversión, por favor consulta con soporte técnico para determinar si es necesario para tu caso de uso específico.