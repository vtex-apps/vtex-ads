# VTEX Ads APP

Este é um **Storefront app** que permite exibir anúncios em lojas VTEX de forma simples e configurável. Ele oferece componentes prontos para uso que renderizam banners, carrosséis de produtos patrocinados e posicionamentos de marcas patrocinadas em áreas estratégicas da sua loja.

> 📚 **Documentação VTEX IO**: Para mais informações sobre desenvolvimento de Storefront apps, consulte a [documentação oficial da VTEX](https://developers.vtex.com/docs/guides/vtex-io-documentation-1-developing-storefront-apps-using-react-and-vtex-io).

Embora este app seja projetado para funcionar perfeitamente com o VTEX Site Editor (CMS), a configuração inicial requer um desenvolvedor. Os blocos de anúncios devem primeiro ser declarados no código do tema da loja antes de ficarem disponíveis no Site Editor, onde as configurações visuais e comportamentais podem então ser ajustadas conforme necessário.

## Pré-requisitos

Antes de começar a implementação, certifique-se de ter:

- **VTEX CLI** instalado e configurado
- **Acesso ao store-theme** da loja (código do tema)
- **Permissões de desenvolvedor** na conta VTEX

> 📚 Para mais informações sobre o VTEX CLI, consulte a [documentação oficial da VTEX](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-installation-and-command-reference).

## Modo de desenvolvimento

> 🚧 `vtex use vtexads`

Toda implementação deve ser feita no ambiente de desenvolvimento. [Use o workspace](https://developers.vtex.com/docs/guides/vtex-io-documentation-workspace) vtexads para o desenvolvimento. Após validação, publique no ambiente master da loja.

## Instalação

A instalação envolve os seguintes passos:
1. Instalar o App via VTEX CLI
2. Declarar a dependência no manifest.json no store-theme
3. Linkar o tema
4. Configurar o app
5. Exibir anúncios

### 1. Instalar o App via VTEX CLI

```bash
vtex install vtex.vtex-ads
```

### 2. Declarar a dependência no manifest.json
Adicione o app VTEX ADS como dependência do store-theme no arquivo `manifest.json`.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

### 3. Linkar o tema
Linke o tema para ver as mudanças no ambiente de desenvolvimento. `vtex link`

### 4. Configurar o app

Neste momento, temos um passo importante para exibirmos anúncios. Acesse o painel administrativo da sua loja e configure:
- Publisher ID (obrigatório)
- Brand ID (opcional para publishers multi-marca)

Você pode acessar a configuração manualmente pelo VTEX Admin:

1. Vá ao menu lateral e clique em **Apps**.
2. Em seguida, selecione **Meus Apps**.
3. Procure por **VTEX Ads**.
4. Clique no app para acessar sua página de configuração.

> ⚙️ A configuração também pode ser feita via link direto:  
> `https://{{workspace}}--{{account}}.myvtex.com/admin/apps/vtex.vtex-ads@0.0.1/setup`  
>  
> ⚠️ Este link pode variar dependendo do **workspace** ou **versão do app**.

### 5. Lidando com os componentes
Agora você precisa declarar os componentes nas páginas do seu tema. Os componentes são dividos em 2 classes: exibição de anúncios e notificação de eventos.

⚠️ Para mais detalhes, consulte a seção de exemplos.

#### Componentes Disponíveis (exibição e notificação de eventos)

1. Exibição
    1. `vtex-ads-banner`  
    Exibe banners patrocinados no local configurado. Este componente funciona de forma autônoma e não requer filhos.

    2. `vtex-ads-shelf`  
    Exibe produtos patrocinados em formato de prateleira. Para funcionar corretamente, é necessário receber os blocos `list-context.product-list-static`, `slider-layout` e o card de produto do tema (`product-summary.shelf`).  
    > Essa estrutura garante liberdade para reaproveitar estilos e regras de negócio já aplicados no tema.

    3. `vtex-ads-sponsored-brands`  
    Exibe marcas patrocinadas em carrossel. Também requer os blocos `list-context.product-list-static`, `slider-layout` e o card de produto do tema (ex: `product-summary.shelf`).

    4. `vtex-ads-stories`  
    Exibe o carrossel de Stories do VTEX Ads: vídeos de produtos patrocinados, com adicionar e remover do carrinho da loja. Funciona de forma autônoma e não requer filhos.

2. Notificação de eventos
    1. `vtex-ads-pixel-event`  
    Este componente deve ser usado dentro dos cards de produto para escutar eventos de produto (cliques, impressões, etc.).
    2. `vtex-ads-conversion`  
    Este componente é responsável por gerenciar eventos de conversão.   
    **⚠️ Por favor, consulte o suporte técnico antes de implementar este componente.**
 

### Exibindo Anúncios

**⚠️ É essencial ter pelo menos um entendimento básico da declaração de blocos VTEX.**

> 📁 **Exemplos Completos**: Verifique a pasta `examples/` para exemplos de implementação padronizados, mais robustos e completos que cobrem diferentes cenários e casos de uso.

Adicione os componentes correspondentes às páginas que exibirão os anúncios e faça os ajustes visuais necessários.

#### 📄 Exemplos de Uso
Use a página de busca como exemplo.  
`store/blocks/search/`
> Lembre-se, o nome do arquivo pode variar dependendo do tema se ele foi personalizado.

1. Banner
    ```json
        {
          "vtex-ads-banner#search-top": {
              "title": "VTEX Ads - Banner top PDP",
              "props": {
              "placementName": "site_search_top_banner", // {canal}_{contexto}_{posição}_{tipo}
              "size": "1280x176", // Mesmo tamanho cadastrado no admin de ads
              "sizeMobile": "634x300" // Mesmo tamanho cadastrado no admin de ads
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

2. Produtos patrocinados
> Para mantermos a originalidade e regras de negócio do tema, as shelfs recebem alguns componentes adicionais: `list-context.product-list-static`, `slider-layout` e `product-summary.shelf`.
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
              "rich-text#vtex-ads-sponsored-title", // Optional
              "list-context.product-list-static#vtex-ads"
            ],
            "props": {
              "placementName": "site_search_topproduct", // {channel}_{context}_ {position}_{type}
              "quantity": 10 // Optional, default is 20
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
> Para mantermos a originalidade e regras de negócio do tema, as shelfs recebem alguns componentes adicionais: `list-context.product-list-static`, `slider-layout` e `product-summary.shelf`.
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
              "sizeMobile": "450x150", // Same size registered in the ad platform
              "size": "450x225", // Same size registered in the ad platform
              "hideHeader": true // Optional
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
> Use a página inicial (`store/blocks/home/`). Coloque o bloco dentro de um `flex-layout.row`, que dá a largura do conteúdo da loja; sem ele, o carrossel ocupa toda a largura da tela.
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

### Notificando Eventos

Para rastrear eventos de produto (cliques, impressões, etc.), adicione o componente `vtex-ads-pixel-event` dentro dos seus cards de produto.

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

> O componente `vtex-ads-pixel-event` deve ser posicionado como filho do componente de card de produto para rastrear adequadamente as interações do usuário.

### Notificando Conversão

> ⚠️ **Importante**: Antes de implementar o componente de conversão, por favor consulte o suporte técnico para determinar se é necessário para o seu caso de uso específico.

Você também precisará adicionar um componente à página `OrderPlaced` para rastrear eventos de conversão.

1. Adicione o `vtex-ads-conversion` ao arquivo de configuração da página Order Placed `store/blocks/orderplaced.jsonc`.

> O nome do arquivo pode variar dependendo do tema se ele foi personalizado.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```
