# Guia Técnico - SOCIVUM

## Objetivo deste pacote

Este pacote entrega uma base ampla, navegável e testável do SOCIVUM. Ele não substitui auditoria de segurança nem homologação profissional.

## Instalação

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

## Banco

A versão local usa SQLite. Para produção, alterar `datasource db` no `prisma/schema.prisma` para PostgreSQL e atualizar `DATABASE_URL`.

## Itens críticos antes de produção

- Autenticação real.
- Perfis e permissões.
- Criptografia e políticas de senha.
- LGPD e consentimento.
- Backup automático.
- Logs de auditoria completos.
- HTTPS.
- Upload seguro.
- Integração bancária real via API/Open Finance/OFX.
- Testes automatizados.
