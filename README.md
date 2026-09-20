
# ONG Mãos Unidas - Landing (Campanha de Doação de Alimentos)

Projeto de uma única página criado com Vite. Esta versão foca numa campanha de doação de alimentos, com componentes leves, acessibilidade e integração com o widget VLibras.

Feito por: kaueMarques

Scripts disponíveis:

- `npm run dev` - roda o servidor de desenvolvimento (http://localhost:5173 por padrão)
- `npm run build` - gera os arquivos de produção em `dist/`
- `npm run preview` - serve o build em modo de preview local

Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Rodar em desenvolvimento:

```bash
npm run dev
```

3. Gerar build de produção:

```bash
npm run build
```

4. Verificar o build localmente:

```bash
npm run preview
```

URL do Deploy (public):

- https://teste-web-kappa.vercel.app/

Acesse o link acima para visualizar o site publicado.

Notas

- O projeto inclui um widget VLibras carregado de forma assíncrona para acessibilidade em Libras.
- Não é recomendado commitar a pasta `dist/` quando estiver usando Vercel; o Vercel fará o build automaticamente.
