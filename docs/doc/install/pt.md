# Instalação do VTEX Ads APP

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

### 5. Vamos adicionar alguns anúncios!
Agora você precisa definir onde seus anúncios aparecerão. Para cada página que exibirá anúncios, adicione os blocos correspondentes.

#### Componentes Disponíveis

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

### Exibindo Anúncios

**É essencial ter pelo menos um entendimento básico da declaração de blocos da VTEX.**

> 📁 **Exemplos Completos**: Verifique a pasta `examples/` para exemplos de implementação mais robustos e completos que cobrem diferentes cenários e casos de uso.

Adicione os componentes correspondentes às páginas que exibirão os anúncios e faça os ajustes visuais necessários.

#### 📄 Exemplos de Uso
Use a página de busca como exemplo.  
`store/blocks/search/`

> O nome do arquivo pode variar dependendo do tema se foi personalizado.

1. Adicionar componentes de exibição de anúncios.

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

2. Se houver variações de componentes para lidar com responsividade, siga o mesmo procedimento.

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

### 6. Rastreamento de Eventos de Produto

**📘 Implementação**

Para rastrear eventos de produto (cliques, impressões, etc.), adicione o componente `vtex-ads-pixel-event` dentro dos seus cartões de produto.

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

> O componente `vtex-ads-pixel-event` deve ser colocado como filho do componente de cartão de produto para rastrear adequadamente as interações do usuário.

### 7. Notificação de Conversão

**📘 Implementação**

> ⚠️ **Importante**: Antes de implementar o componente de conversão, por favor consulte com suporte técnico para determinar se é necessário para seu caso de uso específico.

Você também precisará adicionar um componente à página `OrderPlaced` para rastrear eventos de conversão.

1. Adicione o `vtex-ads-conversion` ao arquivo de configuração da página Order Placed `store/blocks/orderplaced.jsonc`.

> O nome do arquivo pode variar dependendo do tema se foi personalizado.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```