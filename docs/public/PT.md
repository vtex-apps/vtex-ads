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

Este componente renderiza banners na tela. Ele pega o contexto da página e consulta o servidor de anúncios Newtail para verificar se há banners disponíveis.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição do bloco.

| Prop name       | Type     | Default value | Description                                                                                        |
| --------------- | -------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `quantity`      | `number` | `1`           | Quantidade de anúncios solicitados.                                                                |
| `placementName` | `string` | `banner`      | Nome do placement usado na consulta.                                                               |
| `size`          | `string` | `desktop`     | Tamanho da imagem que deverá ser solicitado. Mesmo valor cadastrado na plataforma de retail media. |
| `categoryName`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação                                               |

#### Propriedades via site editor

Propriedades disponibilizadas no site editor.

| Prop name            | Type     | Default value | Description                                                                                        |
| -------------------- | -------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `quantityAdmin`      | `number` | `null`        | Quantidade de anúncios solicitados.                                                                |
| `placementNameAdmin` | `string` | `null`        | Nome do placement usado na consulta.                                                               |
| `sizeAdmin`          | `string` | `null`        | Tamanho da imagem que deverá ser soliticado. Mesmo valor cadastrado na plataforma de retail media. |
| `categoryNameAdmin`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação                                               |

## VTEX Ads Search

---

`vtex-ads-sponsored-brands`

Este componente deve ser chamado sempre dentro do provedor da busca. Ele verifica os resultados da busca, reúne os SKUs e consulta no servidor de anúncios Newtail quais estão patrocinados. Após o resultado, uma tag indicando patrocínio é adicionada ao item correspondente.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição do bloco.

| Prop name              | Type          | Default value                                                             | Description                                                                                           |
| ---------------------- | ------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `quantity`             | `number`      | `20`                                                                      | Quantidade de anúncios solicitados.                                                                   |
| `placementName`        | `string`      | `search`                                                                  | Nome do placement usado na consulta.                                                                  |
| `tagText`              | `string`      | `Patrocinado`                                                             | Texto que será usado na tag. Por padrão, será patrocinado com tradução automática.                    |
| `tagClassname`         | `string`      | `newtail-sponsored-tag`                                                   | Classe que será adicionada ao elemento HTML da tag.                                                   |
| `tagPosition`          | `[start,end]` | `start`                                                                   | Indica se a tag estará no começo ou no final do card de produto.                                      |
| `parentSearchSelector` | `string`      | `.vtex-search-result-3-x-searchResultContainer #gallery-layout-container` | Indica o container que envolve o resultado da busca. Usamos o padrão do _store-theme_.                |
| `onlyFirstSKU`         | `boolean`     | `false`                                                                   | Indica se devemos olhar apenas o SKU principal ou todos SKUs atrelados.                               |
| `sponsoredSkusAtTop`   | `boolean`     | `true`                                                                    | Indica se devemos reordenar o resultado de busca. Essa opção não deve ser usada com rolagem infinita. |

#### Propriedades via site editor

Propriedades disponibilizadas no site editor.

| Prop name                   | Type          | Default value | Description                                                                            |
| --------------------------- | ------------- | ------------- | -------------------------------------------------------------------------------------- |
| `quantityAdmin`             | `number`      | `null`        | Quantidade de anúncios solicitados.                                                    |
| `placementNameAdmin`        | `string`      | `null`        | Nome do placement usado na consulta.                                                   |
| `tagTextAdmin`              | `string`      | `null`        | Texto que será usado na tag. Por padrão, será patrocinado com tradução automática.     |
| `tagClassnameAdmin`         | `string`      | `null`        | Classe que será adicionada ao elemento HTML da tag.                                    |
| `tagPositionAdmin`          | `[start,end]` | `null`        | Indica se a tag estará no começo ou no final do card de produto.                       |
| `parentSearchSelectorAdmin` | `string`      | `null`        | Indica o container que envolve o resultado da busca. Usamos o padrão do _store-theme_. |
| `onlyFirstSKUAdmin`         | `boolean`     | `null`        | Indica se devemos olhar apenas o SKU principal ou todos SKUs atrelados.                |

## VTEX Ads Shelf

---

`vtex-ads-shelf`

Este componente monta uma prateleira com os SKUs patrocinados. Ele pega o contexto da página e consulta o servidor de anúncios Newtail para obter SKUs patrocinados. Após o resultado, é feita uma consulta no catálogo da loja para montar a prateleira de produtos.

#### Propriedades via bloco `isLayout: true`

Propriedades disponibilizadas apenas na definição do bloco.

| Prop name       | Type     | Default value | Description                                          |
| --------------- | -------- | ------------- | ---------------------------------------------------- |
| `quantity`      | `number` | `20`          | Quantidade de anúncios solicitados.                  |
| `placementName` | `string` | `products`    | Nome do placement usado na consulta.                 |
| `categoryName`  | `string` | `null`        | Nome da categoria caso deseje forçar uma segmentação |

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
