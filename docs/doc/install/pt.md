# VTEX Ads APP VTEX

A instalação conta com os seguintes passos:

**1** - Instalar o app usando a CLI da VTEX:

```bash
vtex install vtex.vtex-ads
```

**2** - Adicionar o app como uma dependência do tema no arquivo `manifest.json`.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

**3** - Configurar o ID do publisher no painel de administração da VTEX.

**4** - Configurar o ID da marca se necessário no painel de administração da VTEX.

**5** - Declarar os blocos do app no tema.

## Modo desenvolvimento

> 🚧 `vtex workspace use vtexads`

Toda implementação deve ser feita em ambiente de desenvolvimento. Use o workspace vtexads para testes. Após validação, publique no ambiente master da loja.

## Componentes disponíveis

1. `vtex-ads-banner`  
   Esse componente é responsável pela requisição, exibição e gerenciamento dos eventos relacionados aos anúncios do tipo banner. Ele exibirá uma banner no local que for inserido.
2. `vtex-ads-shelf`  
   Esse componente é responsável pela requisição, exibição e gerenciamento dos eventos relacionados aos anúncios do tipo produtos. Ele montará um carrossel de produtos no local que for inserido usando componentes nativos VTEX.
3. `vtex-ads-sponsored-brands`  
   Esse componente é responsável por exibir anúncios de marcas patrocinadas.
4. `vtex-ads-pixel-event`  
   Esse componente deve ser usado dentro dos cards de produto para ouvir eventos de produtos (cliques, impressões, etc.).
5. `vtex-ads-conversion`  
   Esse componente é responsável pelo gerenciamento dos eventos de conversão. **Por favor, consulte o suporte técnico antes de implementar este componente.**

| Para saber mais, acesse a página sobre os componentes. Lá será possível encontrar a documentação específica de cada e as propriedades recebidas vida propriedades do bloco ou via site editor.

> 📁 **Exemplos Completos**: Verifique a pasta `examples/` para exemplos de implementação mais robustos e completos que cobrem diferentes cenários e casos de uso.

## Exibindo anúncios

Adicione os componentes correspondentes nas páginas que exibirão os anúncios e faça os ajustes visuais necessários.

> É fundamental ter um conhecimento mínimo da declaração de blocos da VTEX.

**📘 Implementação**  
Use a página de busca como exemplo.  
`store/blocks/search/`

> O nome do arquivo pode variar de tema para tema caso tenha customização.

1. Adicionar componentes de exibição de anúncios.

```json
{
  "vtex-ads-banner": {
    "title": "VTEX Ads Banner - search_header",
    "props": {
      "placementName": "search_header",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "vtex-ads-sponsored-brands": {
    "title": "VTEX Ads Sponsored Brands",
    "props": {
      "placementName": "search_sponsored_brands",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "store.search": {
    "blocks": [
      "vtex-ads-banner",
      "vtex-ads-sponsored-brands",
      "vtex-ads-shelf",
      "search-result-layout"
    ]
  }
}
```

2. Caso tenha variação de componentes para resolver responsividade, fazer o mesmo procedimento.

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

## Rastreamento de Eventos de Produto

**📘 Implementação**

Para rastrear eventos de produtos (cliques, impressões, etc.), adicione o componente `vtex-ads-pixel-event` dentro dos seus cards de produto.

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

> O componente `vtex-ads-pixel-event` deve ser colocado como filho do componente de card de produto para rastrear corretamente as interações do usuário.

## Notificando conversão

**📘 Implementação**

> ⚠️ **Importante**: Antes de implementar o componente de conversão, consulte o suporte técnico para determinar se é necessário para seu caso de uso específico.

Também será necessário adicionar um componente na página `OrderPlaced` para rastrear eventos de conversão.

1. Adicionar o `vtex-ads-conversion` no arquivo de configuração da página Order Placed `store/blocks/orderplaced.jsonc`

> O nome do arquivo pode variar de tema para tema caso tenha customização.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```
