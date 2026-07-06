# SOCIVUM - Código-fonte preview completo v1

Este pacote é uma versão ampla de desenvolvimento do SOCIVUM, preparada para ser enviada a um desenvolvedor testar, revisar e evoluir.

## O que contém

- Next.js 14
- TypeScript
- Prisma ORM
- SQLite para teste local
- Estrutura preparada para migração para PostgreSQL
- Layout administrativo
- Dashboard
- 35 módulos com páginas iniciais
- APIs REST iniciais para criação/listagem
- Banco de dados modelado para os principais módulos
- Manual leigo em PDF/Word separado poderá ser elaborado posteriormente
- Guia técnico em `docs/GUIA_TECNICO.md`

## Como instalar localmente

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

Abrir no navegador:

```text
http://localhost:3000
```

## Importante

Este pacote não deve ser usado com dados reais sem revisão técnica, segurança, LGPD, autenticação real, backups e homologação.

## Próximo passo para desenvolvedor

1. Instalar.
2. Rodar localmente.
3. Testar navegação.
4. Avaliar banco de dados.
5. Priorizar MVP.
6. Migrar para PostgreSQL.
7. Implementar autenticação real.
8. Configurar ambiente de produção.
