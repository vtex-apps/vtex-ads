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
4. `vtex-ads-pixel-event`  
   Este componente deve ser usado dentro dos cartões de produto para escutar eventos de produto (cliques, impressões, etc.).
5. `vtex-ads-conversion`  
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

## VTEX Ads Pixel Event

`vtex-ads-pixel-event`

Este componente deve ser usado dentro dos cartões de produto para escutar eventos de produto (cliques, impressões, etc.). Permite o rastreamento adequado das interações do usuário com os produtos.

## VTEX Ads Conversion

`vtex-ads-conversion`

Este componente é responsável por enviar dados de pedidos da loja para a plataforma de anúncios. É usado quando não há integração de API fazendo isso.

> ⚠️ **Importante**: Antes de implementar o componente de conversão, por favor consulte com suporte técnico para determinar se é necessário para seu caso de uso específico.