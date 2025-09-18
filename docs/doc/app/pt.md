# vtex-ads-app

O aplicativo VTEX Ads tem a finalidade de fornecer componentes para implementar Retail Media em uma loja Vtex.

O aplicativo tem campos de configuração para inserir o publisher id e brand id se necessário. Os componentes shelf, banner e sponsored-brands possibilitam algumas edições via site editor. As mesmas edições também poderão ser feitas via declaração de bloco. Os valores do site editor sobrepõem os valores declarados no bloco.

## Install

---

Para mais detalhes sobre a instalação no tema, acesse: [a documentação](https://vtex-ads.readme.io/reference/vtex-ads-app-install-pt)

## Blocos disponíveis

---

| Bloco                      | Descrição                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `vtex-ads-banner`          | Componente para renderizar banners patrocinados de acordo com o contexto da página.                                                  |
| `vtex-ads-sponsored-brands`| Componente para renderizar anúncios de marcas patrocinadas de acordo com o contexto da página.                                        |
| `vtex-ads-shelf`           | Componente para renderizar uma carrossel de produtos patrocinados de acordo com o contexto da página.                                |
| `vtex-ads-pixel-event`     | Componente para rastrear eventos de produtos (cliques, impressões, etc.) dentro dos cards de produto.                                |
| `vtex-ads-conversion`      | Componente para tratar os eventos de conversão.                                                                                      |

## Propriedades dos blocos

---

As propriedades dos blocos podem ser definidas pelo site-editor ou diretamente pela declaração do bloco no tema. A prioridade será para os dados inseridos no site-editor.

## VTEX Ads Banner

---

`vtex-ads-banner`

Este componente renderiza banners na tela. Ele manipula o contexto da página e consulta o servidor de anúncios Newtail para verificar se há banners disponíveis.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição `json` do bloco dentro no tema.

| Prop name       | Type     | Default value              | Description                                                                                                                                                                                                |
| --------------- | -------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_banner_default` | Nome do placement usado na consulta. Por padrão, será usado 'placement_banner_default'. Dê preferência ao nome cadastrado na plataforma de anúncios.                                                       |
| `size`          | `string` | `banner`                   | Tamanho da imagem que deverá ser solicitado. Mesmo valor cadastrado na plataforma de retail media.                                                                                                         |
| `sizeMobile`    | `string` | `null`                     | Tamanho da imagem que deverá ser solicitado quando visto em dispositivos mobile. Mesmo valor cadastrado na plataforma de retail media. Se não for informado, será usando o valor informado para 'desktop'. |
| `quantity`      | `number` | `1`                        | Quantidade de anúncios solicitados.                                                                                                                                                                        |
| `categoryName`  | `string` | `null`                     | Nome da categoria caso deseje forçar uma segmentação                                                                                                                                                       |

#### Propriedades via site editor

Propriedades disponibilizadas no site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                                                                |
| -------------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indica se o placement está ativo.                                                                                                                                                                          |
| `placementNameAdmin` | `string`  | `null`        | Nome do placement usado na consulta.                                                                                                                                                                       |
| `sizeAdmin`          | `string`  | `null`        | Tamanho da imagem que deverá ser soliticado. Mesmo valor cadastrado na plataforma de retail media.                                                                                                         |
| `sizeMobileAdmin`    | `string`  | `null`        | Tamanho da imagem que deverá ser solicitado quando visto em dispositivos mobile. Mesmo valor cadastrado na plataforma de retail media. Se não for informado, será usando o valor informado para 'desktop'. |
| `quantityAdmin`      | `number`  | `null`        | Quantidade de anúncios solicitados.                                                                                                                                                                        |
| `categoryNameAdmin`  | `string`  | `null`        | Nome da categoria caso deseje forçar uma segmentação.                                                                                                                                                      |

## VTEX Ads Sponsored Brands

---

`vtex-ads-sponsored-brands`

Este componente renderiza anúncios de marcas patrocinadas na tela. Ele pega o contexto da página e consulta o servidor de anúncios para verificar se há anúncios de marcas patrocinadas disponíveis.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição do bloco.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_brands_default` | Nome do placement usado na consulta. Por padrão, será usado 'placement_brands_default'. Dê preferência ao nome cadastrado na plataforma de anúncios.           |
| `size`          | `string` | `banner`                   | Tamanho da imagem que deverá ser solicitado. Mesmo valor cadastrado na plataforma de retail media.                                                             |
| `sizeMobile`    | `string` | `null`                     | Tamanho da imagem que deverá ser solicitado quando visto em dispositivos mobile. Mesmo valor cadastrado na plataforma de retail media. Se não for informado, será usando o valor informado para 'desktop'. |
| `categoryName`  | `string` | `null`                     | Nome da categoria caso deseje forçar uma segmentação.                                                                                                           |

#### Propriedades via site editor

Propriedades disponibilizadas no site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indica se o placement está ativo.                                                                                                                              |
| `placementNameAdmin` | `string`  | `null`        | Nome do placement usado na consulta.                                                                                                                           |
| `sizeAdmin`          | `string`  | `null`        | Tamanho da imagem que deverá ser solicitado. Mesmo valor cadastrado na plataforma de retail media.                                                             |
| `sizeMobileAdmin`    | `string`  | `null`        | Tamanho da imagem que deverá ser solicitado quando visto em dispositivos mobile. Mesmo valor cadastrado na plataforma de retail media. Se não for informado, será usando o valor informado para 'desktop'. |
| `categoryNameAdmin`  | `string`  | `null`        | Nome da categoria caso deseje forçar uma segmentação.                                                                                                           |

## VTEX Ads Pixel Event

---

`vtex-ads-pixel-event`

Este componente deve ser usado dentro dos cards de produto para ouvir eventos de produtos (cliques, impressões, etc.). Ele permite o rastreamento adequado das interações do usuário com os produtos.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição do bloco.

| Prop name       | Type     | Default value | Description                                        |
| --------------- | -------- | ------------- | -------------------------------------------------- |
| `placementName` | `string` | `products`    | Nome do placement usado na consulta.               |
| `categoryName`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação. |

#### Propriedades via site editor

Propriedades disponibilizadas no site editor.

| Prop name            | Type     | Default value | Description                                        |
| -------------------- | -------- | ------------- | -------------------------------------------------- |
| `placementNameAdmin` | `string` | `null`        | Nome do placement usado na consulta.               |
| `categoryNameAdmin`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação. |

## VTEX Ads Shelf

---

`vtex-ads-shelf`

Este componente monta uma prateleira com os SKUs patrocinados. Ele pega o contexto da página e consulta o servidor de anúncios Newtail para obter SKUs patrocinados. Após o resultado, é feita uma consulta no catálogo da loja para montar a prateleira de produtos.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição do bloco.

| Prop name       | Type     | Default value               | Description                                                                                                                                           |
| --------------- | -------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- | ------ | ---------------------------------------------------- |
| `quantity`      | `number` | `20`                        | Quantidade de anúncios solicitados.                                                                                                                   |
| `placementName` | `string` | `placement_product_default` | Nome do placement usado na consulta. Por padrão, será usado 'placement_product_default'. Dê preferência ao nome cadastrado na plataforma de anúncios. | `categoryName` | `string` | `null` | Nome da categoria caso deseje forçar uma segmentação |

#### Propriedades via editor

Propriedades disponibilizadas no site editor.

| Prop name            | Type     | Default value | Description                                          |
| -------------------- | -------- | ------------- | ---------------------------------------------------- |
| `quantityAdmin`      | `number` | `null`        | Quantidade de anúncios solicitados.                  |
| `placementNameAdmin` | `string` | `null`        | Nome do placement usado na consulta.                 |
| `categoryNameAdmin`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação |


## VTEX Ads Conversion

---

`vtex-ads-conversion`

Este componente é responsável por enviar dados sobre os pedidos feitos na loja para a plataforma de anúncios. Serve quando não há uma integração de API fazendo isso.

> ⚠️ **Importante**: Antes de implementar o componente de conversão, consulte o suporte técnico para determinar se é necessário para seu caso de uso específico.
