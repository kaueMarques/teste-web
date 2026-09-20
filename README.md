
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

Deploy para Vercel

1. Crie uma conta em https://vercel.com/ e conecte seu GitHub.
2. No painel do Vercel, crie um novo projeto e escolha o repositório `kaueMarques/teste-web`.
3. Configure (se necessário):
	- Build Command: `npm run build`
	- Output Directory: `dist`
4. Clique em Deploy. O Vercel executará o build e publicará o site.

Após o deploy, copie a URL pública do Vercel (ex: `https://meu-site.vercel.app`) e atualize este README na seção "URL do Deploy" abaixo, então faça commit e push.

URL do Deploy (public):

- https://teste-web-kappa.vercel.app/

Como acessar o site publicado no Vercel

- Abra o link direto no navegador: https://teste-web-kappa.vercel.app/
- Painel do Vercel: acesse https://vercel.com/dashboard e selecione o projeto "teste-web-kappa" para ver detalhes.
- Ver deploys e logs: no Dashboard → Deployments, clique no deploy mais recente e escolha "View Logs" para inspeção.
- Forçar novo deploy (redeploy): no mesmo deploy clique em "Redeploy" ou use "Deployments" → "Trigger Redeploy".
- Domínio público: Dashboard → Settings → Domains (a URL pública aparece ali depois do deploy).

Observação: o Vercel mostra automaticamente o build logs e o histórico de deploys; para mudanças locais, basta commitar e pushar para a branch monitorada (neste projeto: `master`) e o Vercel executará um novo build.

Notas

- O projeto inclui um widget VLibras carregado de forma assíncrona para acessibilidade em Libras.
- Não é recomendado commitar a pasta `dist/` quando estiver usando Vercel; o Vercel fará o build automaticamente.
