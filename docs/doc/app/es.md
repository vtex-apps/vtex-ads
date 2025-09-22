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
4. `vtex-ads-pixel-event`  
   Este componente debe usarse dentro de las tarjetas de producto para escuchar eventos de producto (clics, impresiones, etc.).
5. `vtex-ads-conversion`  
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

## VTEX Ads Pixel Event

`vtex-ads-pixel-event`

Este componente debe usarse dentro de las tarjetas de producto para escuchar eventos de producto (clics, impresiones, etc.). Permite el seguimiento adecuado de las interacciones del usuario con los productos.

## VTEX Ads Conversion

`vtex-ads-conversion`

Este componente es responsable de enviar datos de pedidos de la tienda a la plataforma de anuncios. Se usa cuando no hay integración de API haciendo esto.

> ⚠️ **Importante**: Antes de implementar el componente de conversión, por favor consulta con soporte técnico para determinar si es necesario para tu caso de uso específico.