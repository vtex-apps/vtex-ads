# VTEX Ads APP

Este app permite exibir anúncios em lojas VTEX de forma simples e configurável. Oferece componentes prontos para uso que renderizam banners, carrosséis de produtos patrocinados e posicionamentos de marcas patrocinadas em áreas estratégicas da sua loja.

Embora este app seja projetado para funcionar perfeitamente com o VTEX Site Editor (CMS), a configuração inicial requer um desenvolvedor. Os blocos de anúncios devem primeiro ser declarados no código do tema da loja antes de ficarem disponíveis no Site Editor, onde as configurações visuais e comportamentais podem ser ajustadas conforme necessário.

## Modo de Desenvolvimento

> 🚧 `vtex use vtexads`

Toda a implementação deve ser feita no ambiente de desenvolvimento. Use o workspace vtexads para testes. Após a validação, publique no ambiente master da loja.

## Instalação

A instalação envolve os seguintes passos:

### 1. Instalar o App via VTEX CLI

```bash
vtex install vtex.vtex-ads
```

### 2. Declarar a dependência no manifest.json
Adicione o app como dependência do tema no arquivo `manifest.json`.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

### 3. Vincular o tema
Vincule o tema para ver as mudanças. `vtex link`

### 4. Configurar o app

Acesse o painel administrativo da sua loja e configure:
- Publisher ID (obrigatório)
- Brand ID (opcional para editores multi-marca)

> ⚙️ A configuração também pode ser feita via link direto:  
> `https://{{workspace}}--{{account}}.myvtex.com/admin/apps/vtex.vtex-ads@0.0.1/setup`  
>  
> ⚠️ Este link pode variar dependendo do **workspace** ou **versão do app**.

Alternativamente, você pode acessar a configuração manualmente do VTEX Admin:

1. Vá ao menu lateral e clique em **Apps**.
2. Em seguida, selecione **Meus Apps**.
3. Procure por **VTEX Ads**.
4. Clique no app para acessar sua página de configuração.

## Componentes Disponíveis

1. `vtex-ads-banner`  
   Este componente é responsável por solicitar, exibir e gerenciar eventos relacionados a anúncios tipo banner. Exibirá um banner na localização designada.
2. `vtex-ads-shelf`  
   Este componente é responsável por solicitar, exibir e gerenciar eventos relacionados a anúncios tipo produto. Renderiza uma lista de produtos patrocinados usando componentes nativos da VTEX.  
   Para garantir que o estilo do seu tema e as regras de negócio sejam preservados, passe um bloco personalizado `list-context.product-list-static` para envolver a prateleira, e então use o cartão de produto do seu tema (ex., `product-summary.shelf`) dentro dele.  
   Consulte a seção de exemplos de uso para a estrutura correta do bloco.
3. `vtex-ads-sponsored-brands`  
   Este componente é responsável por exibir anúncios de marcas patrocinadas.
4. `vtex-ads-stories`  
   Este componente é responsável por solicitar e exibir anúncios de Stories: um carrossel de vídeos de produtos patrocinados, com adicionar e remover do carrinho da loja.
5. `vtex-ads-pixel-event`  
   Este componente deve ser usado dentro dos cartões de produto para escutar eventos de produto (cliques, impressões, etc.).
6. `vtex-ads-conversion`  
   Este componente é responsável por gerenciar eventos de conversão. **Por favor, consulte com suporte técnico antes de implementar este componente.**

| Para mais informações, visite a página de componentes. Lá você pode encontrar documentação específica para cada componente e as propriedades que recebem através de propriedades de bloco ou via site editor.

## Propriedades de Bloco

As propriedades de bloco podem ser definidas através do site editor ou diretamente na declaração do bloco no tema. A prioridade será dada aos dados inseridos no site editor.

## VTEX Ads Banner

`vtex-ads-banner`

Este componente renderiza banners na tela. Gerencia o contexto da página e consulta o servidor de anúncios para verificar se há banners disponíveis.

#### Propriedades via bloco `isLayout: true`

Propriedades fornecidas apenas na definição `json` do bloco dentro do tema.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_banner_default` | Nome do placement usado na consulta. Por padrão, 'placement_banner_default' será usado. Prefira o nome registrado na plataforma de anúncios.                   |
| `size`          | `string` | `banner`                   | Tamanho da imagem a ser solicitada. Mesmo valor registrado na plataforma de retail media.                                                                      |
| `sizeMobile`    | `string` | `null`                     | Tamanho da imagem a ser solicitada quando visualizada em dispositivos móveis. Mesmo valor registrado na plataforma de retail media. Se não fornecido, o valor desktop será usado. |
| `quantity`      | `number` | `1`                        | Quantidade de anúncios solicitados.                                                                                                                            |
| `categoryName`  | `string` | `null`                     | Nome da categoria se você quiser forçar segmentação.                                                                                                            |

#### Propriedades via site editor

Propriedades fornecidas no site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indica se o placement está ativo.                                                                                                                              |
| `placementNameAdmin` | `string`  | `null`        | Nome do placement usado na consulta.                                                                                                                           |
| `sizeAdmin`          | `string`  | `null`        | Tamanho da imagem a ser solicitada. Mesmo valor registrado na plataforma de retail media.                                                                      |
| `sizeMobileAdmin`    | `string`  | `null`        | Tamanho da imagem a ser solicitada quando visualizada em dispositivos móveis. Mesmo valor registrado na plataforma de retail media. Se não fornecido, o valor desktop será usado. |
| `quantityAdmin`      | `number`  | `null`        | Quantidade de anúncios solicitados.                                                                                                                            |
| `categoryNameAdmin`  | `string`  | `null`        | Nome da categoria se você quiser forçar segmentação.                                                                                                            |

## VTEX Ads Sponsored Brands

`vtex-ads-sponsored-brands`

Este componente renderiza anúncios de marcas patrocinadas na tela. Gerencia o contexto da página e consulta o servidor de anúncios para verificar se há anúncios de marcas patrocinadas disponíveis.

#### Propriedades via bloco `isLayout: true`

Propriedades disponíveis apenas na definição do bloco.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_brands_default` | Nome do placement usado na consulta. Por padrão, 'placement_brands_default' será usado. Prefira o nome registrado na plataforma de anúncios.                   |
| `size`          | `string` | `banner`                   | Tamanho da imagem a ser solicitada. Mesmo valor registrado na plataforma de retail media.                                                                      |
| `sizeMobile`    | `string` | `null`                     | Tamanho da imagem a ser solicitada quando visualizada em dispositivos móveis. Mesmo valor registrado na plataforma de retail media. Se não fornecido, o valor desktop será usado. |
| `categoryName`  | `string` | `null`                     | Nome da categoria se você quiser forçar segmentação.                                                                                                            |

#### Propriedades via site editor

Propriedades disponíveis no site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indica se o placement está ativo.                                                                                                                              |
| `placementNameAdmin` | `string`  | `null`        | Nome do placement usado na consulta.                                                                                                                           |
| `sizeAdmin`          | `string`  | `null`        | Tamanho da imagem a ser solicitada. Mesmo valor registrado na plataforma de retail media.                                                                      |
| `sizeMobileAdmin`    | `string`  | `null`        | Tamanho da imagem a ser solicitada quando visualizada em dispositivos móveis. Mesmo valor registrado na plataforma de retail media. Se não fornecido, o valor desktop será usado. |
| `categoryNameAdmin`  | `string`  | `null`        | Nome da categoria se você quiser forçar segmentação.                                                                                                            |

## VTEX Ads Shelf

`vtex-ads-shelf`

Este componente cria uma prateleira com SKUs patrocinados. Pega o contexto da página e consulta o servidor de anúncios para recuperar SKUs patrocinados. Após o resultado, uma consulta é feita ao catálogo da loja para construir a prateleira de produtos.

#### Props do bloco `isLayout: true`

Propriedades disponíveis apenas na definição do bloco.

| Prop name       | Type     | Default value               | Description                                                                                                                            |
| --------------- | -------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `quantity`      | `number` | `20`                        | Número de anúncios solicitados.                                                                                                        |
| `placementName` | `string` | `placement_product_default` | Nome do placement usado na consulta. Por padrão, 'placement_product_default' será usado. Prefira o nome registrado na plataforma de anúncios. |
| `categoryName`  | `string` | `null`                      | Nome da categoria se você quiser forçar segmentação.                                                                                    |

#### Props do site editor

Propriedades disponíveis no site editor.

| Prop name            | Type     | Default value | Description                                        |
| -------------------- | -------- | ------------- | -------------------------------------------------- |
| `quantityAdmin`      | `number` | `null`        | Número de anúncios solicitados.                   |
| `placementNameAdmin` | `string` | `null`        | Nome do placement usado na consulta.               |
| `categoryNameAdmin`  | `string` | `null`        | Nome da categoria se você quiser forçar segmentação. |

## VTEX Ads Stories

`vtex-ads-stories`

Este componente renderiza o carrossel de Stories do VTEX Ads ([`@vtex/ads-stories`](https://www.npmjs.com/package/@vtex/ads-stories)): vídeos curtos de produtos patrocinados. Os botões de adicionar e remover do carrinho alteram o carrinho da loja (`vtex.order-items`), e os preços e a disponibilidade vêm do catálogo da loja.

O Publisher ID vem das configurações do app, como nos outros componentes. Sem ele, o bloco não renderiza nada. Coloque o bloco dentro de um `flex-layout.row`, que dá a largura do conteúdo da loja.

```json
{
  "vtex-ads-stories#home": {
    "title": "VTEX Ads - Stories home",
    "props": {
      "placement": "home_stories" // Placement de Stories cadastrado na plataforma de anúncios
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

#### Propriedades

As mesmas propriedades valem na definição do bloco no tema e no site editor (exceto `hydration`, só no tema). Os valores do site editor têm prioridade.

| Prop name | Type | Default value | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | `true` | Se `false`, o bloco não renderiza. |
| `placement` | `string` | `home_stories` | Nome do placement de Stories cadastrado na plataforma de anúncios. |
| `quantity` | `number` | `8` | Quantidade de Stories solicitados. |
| `slideDuration` | `number` | `5000` | Tempo, em milissegundos, que cada Story fica em destaque. `0` desativa o avanço automático. |
| `inactiveAutoplay` | `boolean` | `false` | Se `true`, os Stories que não estão em destaque também reproduzem o vídeo, sem som. |
| `hydration` | `"none"` | `null` | Só no tema. `"none"` não consulta preços e disponibilidade no catálogo da loja. |
| `appearance` | `object` | `null` | Cores, fonte e cantos. Veja a tabela abaixo. |

#### Aparência

Cada campo de `appearance` define uma variável CSS do componente. Campos vazios mantêm o padrão do componente ou o valor definido pelo CSS do tema.

| Campo | Variável CSS | Descrição |
| --- | --- | --- |
| `fontFamily` | `--vtex-ads-story-font-family` | Todo o texto, ex.: "Inter", sans-serif. Vazio: a fonte da loja. |
| `colorText` | `--vtex-ads-story-color-text` | Texto fora do vídeo, como o painel do produto. Padrão #242424 no painel. |
| `colorMuted` | `--vtex-ads-story-color-muted` | O preço "de" e o adicionar ao carrinho desativado. Padrão #6b6b6b. |
| `colorSurface` | `--vtex-ads-story-color-surface` | O painel do produto, o botão ver produto e o fundo atrás de um único Story. Padrão #fff. |
| `colorAccent` | `--vtex-ads-story-color-accent` | Os botões do painel do produto. Padrão #1b75a8. |
| `colorAccentContrast` | `--vtex-ads-story-color-accent-contrast` | Texto do botão adicionar ao carrinho. Padrão #fff. |
| `radius` | `--vtex-ads-story-radius` | Com unidade, ex.: 20px. 0px deixa cards, pílulas e botões quadrados. Os botões de ícone redondos continuam redondos. |

#### CSS

O container do bloco tem o CSS handle `stories-container`. O tema também pode definir as variáveis CSS nele, em `styles/css/vtex.vtex-ads.css`:

```css
.stories-container {
  --vtex-ads-story-color-accent: #f71963;
  --vtex-ads-story-radius: 20px;
}
```

## VTEX Ads Pixel Event

`vtex-ads-pixel-event`

Este componente deve ser usado dentro dos cartões de produto para escutar eventos de produto (cliques, impressões, etc.). Permite o rastreamento adequado das interações do usuário com os produtos.

## VTEX Ads Conversion

`vtex-ads-conversion`

Este componente é responsável por enviar dados de pedidos da loja para a plataforma de anúncios. É usado quando não há integração de API fazendo isso.

> ⚠️ **Importante**: Antes de implementar o componente de conversão, por favor consulte com suporte técnico para determinar se é necessário para seu caso de uso específico.