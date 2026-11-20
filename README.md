# POSTO FÊNIX — Controle de Tanques

Aplicativo web instalável (PWA), preparado para publicação no GitHub Pages.

## Arquivos
- `index.html`: aplicação.
- `manifest.webmanifest`: identidade e configuração de instalação.
- `sw.js`: cache para funcionamento offline após a primeira visita.
- `icons/`: ícones do aplicativo.

## Publicar no GitHub Pages
1. Crie um repositório no GitHub, por exemplo `posto-fenix`.
2. Envie **todos os arquivos e a pasta `icons`** para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, selecione `Deploy from a branch`.
5. Escolha a branch `main` e a pasta `/ (root)`, depois salve.
6. Aguarde a publicação e abra o endereço HTTPS informado pelo GitHub.

## Instalar no Android
1. Abra o endereço publicado no Chrome do celular.
2. Abra o menu ⋮.
3. Toque em **Instalar app** ou **Adicionar à tela inicial**.

## Armazenamento e privacidade
Nesta versão, postos, tanques e medições ficam no `localStorage` do navegador do dispositivo. O cache offline guarda os arquivos da aplicação, não sincroniza os dados entre dispositivos. Faça backups JSON regularmente. Para sincronização entre funcionários/celulares será necessário integrar um banco online (Supabase ou Firebase) com autenticação e regras de acesso.

## Tabelas de arqueação
As tabelas existentes são específicas para S10 20.000 L, gasolina aditivada 10.000 L e gasolina comum 30.000 L. Ao cadastrar um tanque, selecione uma dessas tabelas apenas se ela corresponder à calibração real do tanque. Para capacidades diferentes, deixe "Sem tabela cadastrada"; o sistema bloqueará a medição até que a tabela correta seja cadastrada, evitando conversões incorretas.
