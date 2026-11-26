# VTEX Ads APP

Esta es una **aplicación Storefront** que permite mostrar anuncios en tiendas VTEX de forma simple y configurable. Ofrece componentes listos para usar que renderizan banners, carruseles de productos patrocinados, posicionamientos de marcas patrocinadas y carruseles de Stories en áreas estratégicas de tu tienda.

> 📚 **Documentación VTEX IO**: Para más información sobre desarrollo de aplicaciones Storefront, consulta la [documentación oficial de VTEX](https://developers.vtex.com/docs/guides/vtex-io-documentation-1-developing-storefront-apps-using-react-and-vtex-io).

Aunque esta aplicación está diseñada para funcionar perfectamente con el VTEX Site Editor (CMS), la configuración inicial requiere un desarrollador. Los bloques de anuncios deben declararse primero en el código del tema de la tienda antes de estar disponibles en el Site Editor, donde las configuraciones visuales y de comportamiento pueden ajustarse según sea necesario.

## Prerrequisitos

Antes de comenzar la implementación, asegúrate de tener:

- **VTEX CLI** instalado y configurado
- **Acceso al store-theme** de la tienda (código del tema)
- **Permisos de desarrollador** en la cuenta VTEX

> 📚 Para más información sobre VTEX CLI, consulta la [documentación oficial de VTEX](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-installation-and-command-reference).

## Modo de desarrollo

> 🚧 `vtex use vtexads`

Toda la implementación debe realizarse en el entorno de desarrollo. [Usa el workspace](https://developers.vtex.com/docs/guides/vtex-io-documentation-workspace) vtexads para el desarrollo. Después de la validación, publica en el entorno master de la tienda.

## Instalación

La instalación involucra los siguientes pasos:
1. Instalar la App vía VTEX CLI
2. Declarar la dependencia en manifest.json en store-theme
3. Vincular el tema
4. Configurar la app
5. Mostrar anuncios

### 1. Instalar la App vía VTEX CLI

```bash
vtex install vtex.vtex-ads
```

### 2. Declarar la dependencia en manifest.json
Agrega la app VTEX ADS como dependencia del store-theme en el archivo `manifest.json`.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

### 3. Vincular el tema
Vincula el tema para ver los cambios en el entorno de desarrollo. `vtex link`

### 4. Configurar la app

En este momento, tenemos un paso importante para mostrar anuncios. Accede al panel administrativo de tu tienda y configura:
- Publisher ID (obligatorio)
- Brand ID (opcional para publishers multi-marca)

Puedes acceder a la configuración manualmente a través del VTEX Admin:

1. Ve al menú lateral y haz clic en **Apps**.
2. Luego selecciona **Mis Apps**.
3. Busca **VTEX Ads**.
4. Haz clic en la app para acceder a su página de configuración.

> ⚙️ La configuración también puede hacerse vía enlace directo:  
> `https://{{workspace}}--{{account}}.myvtex.com/admin/apps/vtex.vtex-ads@0.0.1/setup`  
>  
> ⚠️ Este enlace puede variar dependiendo del **workspace** o **versión de la app**.

### 5. Manejo de los componentes
Ahora necesitas declarar los componentes en las páginas de tu tema. Los componentes se dividen en 2 clases: visualización de anuncios y notificación de eventos.

⚠️ Para más detalles, consulta la sección de ejemplos.

#### Componentes Disponibles (visualización y notificación de eventos)

1. Visualización
    1. `vtex-ads-banner`  
    Muestra banners patrocinados en la ubicación configurada. Este componente funciona de forma autónoma y no requiere hijos.

    2. `vtex-ads-shelf`  
    Muestra productos patrocinados en formato de estantería. Para funcionar correctamente, necesita recibir los bloques `list-context.product-list-static`, `slider-layout` y la tarjeta de producto del tema (`product-summary.shelf`).  
    > Esta estructura garantiza libertad para reutilizar estilos y reglas de negocio ya aplicadas en el tema.

    3. `vtex-ads-sponsored-brands`  
    Muestra marcas patrocinadas en carrusel. También requiere los bloques `list-context.product-list-static`, `slider-layout` y la tarjeta de producto del tema (ej: `product-summary.shelf`).

    4. `vtex-ads-stories`  
    Muestra el carrusel de Stories de VTEX Ads: videos de productos patrocinados, con agregar y quitar del carrito de la tienda. Funciona de forma autónoma y no requiere hijos.

2. Notificación de eventos
    1. `vtex-ads-pixel-event`  
    Este componente debe usarse dentro de las tarjetas de producto para escuchar eventos de producto (clics, impresiones, etc.).
    2. `vtex-ads-conversion`  
    Este componente es responsable de gestionar eventos de conversión.   
    **⚠️ Por favor, consulta el soporte técnico antes de implementar este componente.**
 

### Mostrando Anuncios

**⚠️ Es esencial tener al menos un entendimiento básico de la declaración de bloques VTEX.**

> 📁 **Ejemplos Completos**: Revisa la carpeta `examples/` para ejemplos de implementación estandarizados, más robustos y completos que cubren diferentes escenarios y casos de uso.

Agrega los componentes correspondientes a las páginas que mostrarán los anuncios y haz los ajustes visuales necesarios.

#### 📄 Ejemplos de Uso
Usa la página de búsqueda como ejemplo.  
`store/blocks/search/`
> Recuerda, el nombre del archivo puede variar dependiendo del tema si ha sido personalizado.

1. Banner
    ```json
        {
          "vtex-ads-banner#search-top": {
              "title": "VTEX Ads - Banner top PDP",
              "props": {
                "placementName": "site_search_top_banner", // {canal}_{contexto}_{posición}_{tipo}
                "size": "1280x176", // Mismo tamaño registrado en el admin de ads
                "sizeMobile": "634x300" // Mismo tamaño registrado en el admin de ads
              }
          },
          "store.search": {
              "blocks": [
                "vtex-ads-banner#search-top",
                "search-result-layout"
              ]
          }
        }
    ```

2. Productos patrocinados
    > Para mantener la originalidad y reglas de negocio del tema, las estanterías reciben algunos componentes adicionales: `list-context.product-list-static`, `slider-layout` y `product-summary.shelf`.

    ```json
        {
          "list-context.product-list-static#vtex-ads": {
            "blocks": ["product-summary.shelf#product-custom-ads"],
            "children": ["slider-layout#vtex-ads"],
            "title": "VTEX Ads - Product shelf - Wrapper context"
          },
          "vtex-ads-shelf#pdp-middle": {
            "title": "VTEX Ads - Product shelf middle PDP",
            "blocks": [
              "rich-text#vtex-ads-sponsored-title", // Opcional
              "list-context.product-list-static#vtex-ads"
            ],
            "props": {
              "placementName": "site_search_topproduct", // {channel}_{context}_ {position}_{type}
              "quantity": 10 // Opcional, por defecto es 20
            }
          },
          "store.search": {
              "blocks": [
                "vtex-ads-shelf#pdp-middle",
                "search-result-layout"
              ]
          }
        }
    ```


3. Marcas patrocinadas (sponsored brands)
    > Para mantener la originalidad y reglas de negocio del tema, las estanterías reciben algunos componentes adicionales: `list-context.product-list-static`, `slider-layout` y `product-summary.shelf`.

    ```json
        {
          "list-context.product-list-static#vtex-ads": {
            "blocks": ["product-summary.shelf#product-custom-ads"],
            "children": ["slider-layout#vtex-ads"],
            "title": "VTEX Ads - Product shelf - Wrapper context"
          },
          "vtex-ads-sponsored-brands#search-top": {
            "title": "VTEX Ads - Sponsored brand",
            "blocks": ["list-context.product-list-static#vtex-ads"],
            "props": {
              "placementName": "site_search_top_sb", // {channel}_{context}_ {position}_{type}
              "sizeMobile": "450x150", // Mismo tamaño registrado en la plataforma de ads
              "size": "450x225", // Mismo tamaño registrado en la plataforma de ads
              "hideHeader": true // Opcional
            }
          },
          "store.search": {
              "blocks": [
                "vtex-ads-sponsored-brands#search-top",
                "search-result-layout"
              ]
          }
        }
    ```

4. Stories
    > Usa la página de inicio (`store/blocks/home/`). Coloca el bloque dentro de un `flex-layout.row`, que le da el ancho del contenido de la tienda; sin él, el carrusel ocupa todo el ancho de la pantalla.

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

### Notificando Eventos

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

> El componente `vtex-ads-pixel-event` debe posicionarse como hijo del componente de tarjeta de producto para rastrear adecuadamente las interacciones del usuario.

### Notificando Conversión

> ⚠️ **Importante**: Antes de implementar el componente de conversión, por favor consulta el soporte técnico para determinar si es necesario para tu caso de uso específico.

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
