# vtex-ads-app

La aplicación VTEX Ads proporciona componentes para implementar Retail Media en una tienda Vtex.

La aplicación tiene campos de configuración para insertar el ID del publicador y el ID de la marca si es necesario. Los componentes shelf, banner y sponsored-brands permiten algunas ediciones a través del site editor. Las mismas ediciones también se pueden hacer mediante declaración de bloques. Los valores del site editor sobrescriben los valores declarados en el bloque.

## Install

---

Para más detalles sobre la instalación, visite: [la documentación](https://vtex-ads.readme.io/reference/vtex-ads-app-install-es)

## Bloques disponibles

---

| Bloque                     | Descripción                                                                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vtex-ads-banner`          | Componente para renderizar banners patrocinados según el contexto de la página.                                                                           |
| `vtex-ads-sponsored-brands`| Componente para renderizar anuncios de marcas patrocinadas según el contexto de la página.                                                               |
| `vtex-ads-shelf`           | Componente para renderizar un carrusel de productos patrocinados según el contexto de la página.                                                          |
| `vtex-ads-pixel-event`     | Componente para rastrear eventos de productos (clics, impresiones, etc.) dentro de las tarjetas de producto.                                            |
| `vtex-ads-conversion`      | Componente para gestionar los eventos de conversión.                                                                                                      |

### Propiedades de los bloques

---

Las propiedades de los bloques pueden definirse a través del editor de sitios o directamente en la declaración del bloque en el tema. La prioridad se dará a los datos ingresados en el editor de sitios.

## VTEX Ads Banner

---

`vtex-ads-banner`

Este componente renderiza banners en la pantalla. Maneja el contexto de la página y consulta el servidor de anuncios de Newtail para verificar si hay banners disponibles.

#### Propiedades vía bloque `isLayout: true`

Propiedades disponibles solo en la definición `json` del bloque dentro del tema.

| Nombre de la propiedad | Tipo     | Valor por defecto          | Descripción                                                                                                                                                                                   |
| ---------------------- | -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName`        | `string` | `placement_banner_default` | Nombre del placement utilizado en la consulta. Por defecto, se utilizará 'placement_banner_default'. Prefiera el nombre registrado en la plataforma de anuncios.                              |
| `size`                 | `string` | `banner`                   | Tamaño de la imagen que se solicitará. Mismo valor registrado en la plataforma de retail media.                                                                                               |
| `sizeMobile`           | `string` | `null`                     | Tamaño de la imagen que se solicitará cuando se vea en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se utilizará el valor de desktop. |
| `quantity`             | `number` | `1`                        | Cantidad de anuncios solicitados.                                                                                                                                                             |
| `categoryName`         | `string` | `null`                     | Nombre de la categoría en caso de que desee forzar una segmentación.                                                                                                                          |

#### Propiedades vía editor de sitio

Propiedades disponibles en el editor de sitio.

| Nombre de la propiedad | Tipo      | Valor por defecto | Descripción                                                                                                                                                                                   |
| ---------------------- | --------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`               | `boolean` | `true`            | Indica si el placement está activo.                                                                                                                                                           |
| `placementNameAdmin`   | `string`  | `null`            | Nombre del placement utilizado en la consulta.                                                                                                                                                |
| `sizeAdmin`            | `string`  | `null`            | Tamaño de la imagen que se solicitará. Mismo valor registrado en la plataforma de retail media.                                                                                               |
| `sizeMobileAdmin`      | `string`  | `null`            | Tamaño de la imagen que se solicitará cuando se vea en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se utilizará el valor de desktop. |
| `quantityAdmin`        | `number`  | `null`            | Cantidad de anuncios solicitados.                                                                                                                                                             |
| `categoryNameAdmin`    | `string`  | `null`            | Nombre de la categoría en caso de que desee forzar una segmentación.                                                                                                                          |

## VTEX Ads Sponsored Brands

---

`vtex-ads-sponsored-brands`

Este componente renderiza anuncios de marcas patrocinadas en la pantalla. Maneja el contexto de la página y consulta el servidor de anuncios para verificar si hay anuncios de marcas patrocinadas disponibles.

#### Propiedades vía bloque `isLayout: true`

Propiedades disponibles solo en la definición del bloque.

| Nombre de la Propiedad | Tipo     | Default value              | Descripción                                                                                                                                                    |
| ---------------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName`        | `string` | `placement_brands_default` | Nombre del placement usado en la consulta. Por defecto, se utilizará 'placement_brands_default'. Prefiera el nombre registrado en la plataforma de anuncios.   |
| `size`                 | `string` | `banner`                   | Tamaño de la imagen que se solicitará. Mismo valor registrado en la plataforma de retail media.                                                                |
| `sizeMobile`           | `string` | `null`                     | Tamaño de la imagen que se solicitará cuando se vea en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se utilizará el valor de desktop. |
| `categoryName`         | `string` | `null`                     | Nombre de la categoría en caso de que desee forzar una segmentación.                                                                                           |

#### Propiedades vía editor de sitios

Propiedades disponibles en el editor de sitios.

| Nombre de la Propiedad | Tipo      | Default value | Descripción                                                                                                                                                    |
| ---------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`               | `boolean` | `true`        | Indica si el placement está activo.                                                                                                                           |
| `placementNameAdmin`   | `string`  | `null`        | Nombre del placement usado en la consulta.                                                                                                                    |
| `sizeAdmin`            | `string`  | `null`        | Tamaño de la imagen que se solicitará. Mismo valor registrado en la plataforma de retail media.                                                               |
| `sizeMobileAdmin`      | `string`  | `null`        | Tamaño de la imagen que se solicitará cuando se vea en dispositivos móviles. Mismo valor registrado en la plataforma de retail media. Si no se proporciona, se utilizará el valor de desktop. |
| `categoryNameAdmin`    | `string`  | `null`        | Nombre de la categoría en caso de que desee forzar una segmentación.                                                                                          |

## VTEX Ads Pixel Event

---

`vtex-ads-pixel-event`

Este componente debe ser usado dentro de las tarjetas de producto para escuchar eventos de productos (clics, impresiones, etc.). Permite el rastreo adecuado de las interacciones del usuario con los productos.

#### Propiedades vía bloque `isLayout: true`

Propiedades disponibles solo en la definición del bloque.

| Nombre de la Propiedad | Tipo     | Default value | Descripción                                        |
| ---------------------- | -------- | ------------- | -------------------------------------------------- |
| `placementName`        | `string` | `products`    | Nombre del placement usado en la consulta.         |
| `categoryName`         | `string` | `null`        | Nombre de la categoría en caso de que desee forzar una segmentación. |

#### Propiedades vía editor de sitios

Propiedades disponibles en el editor de sitios.

| Nombre de la Propiedad | Tipo     | Default value | Descripción                                        |
| ---------------------- | -------- | ------------- | -------------------------------------------------- |
| `placementNameAdmin`   | `string` | `null`        | Nombre del placement usado en la consulta.         |
| `categoryNameAdmin`    | `string` | `null`        | Nombre de la categoría en caso de que desee forzar una segmentación. |

### VTEX Ads Shelf

---

`vtex-ads-shelf`

Este componente monta una estantería con los SKUs patrocinados. Toma el contexto de la página y consulta el servidor de anuncios Newtail para obtener los SKUs patrocinados. Tras el resultado, se realiza una consulta en el catálogo de la tienda para construir la estantería de productos.

#### Bloque propiedades `isLayout: true`

Propiedades disponibles solo en la definición del bloque.

| Nombre de la propiedad | Tipo     | Default value               | Descripción                                                                                                                                                   |
| ---------------------- | -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quantity`             | `number` | `20`                        | Cantidad de anuncios solicitados.                                                                                                                             |
| `placementName`        | `string` | `placement_product_default` | Nombre del placement usado en la consulta. Por defecto, se utilizará 'placement_product_default'. Prefiera el nombre registrado en la plataforma de anuncios. |
| `categoryName`         | `string` | `null`                      | Nombre de la categoría si se desea forzar una segmentación.                                                                                                   |

#### Site editor propiedades

Propiedades disponibles en el editor de sitios.

| Nombre de la propiedad | Tipo      | Default value | Descripción                                                 |
| ---------------------- | --------- | ------------- | ----------------------------------------------------------- |
| `active`               | `boolean` | `true`        | Indica si el placement está activo.                         |
| `quantityAdmin`        | `number`  | `null`        | Cantidad de anuncios solicitados.                           |
| `placementNameAdmin`   | `string`  | `null`        | Nombre del placement usado en la consulta.                  |
| `categoryNameAdmin`    | `string`  | `null`        | Nombre de la categoría si se desea forzar una segmentación. |


### VTEX Ads Conversion

`vtex-ads-conversion`

Este componente es responsable de enviar datos de pedidos de la tienda a la plataforma de anuncios. Se utiliza cuando no hay una integración de API haciendo esto.

> ⚠️ **Importante**: Antes de implementar el componente de conversión, consulta con el soporte técnico para determinar si es necesario para tu caso de uso específico.
