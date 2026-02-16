# Desafio Fullstack â€“ Plataforma de Tarefas (Frontend)

Este projeto Ã© o frontend da Plataforma de Tarefas, desenvolvido para o Desafio Fullstack da UFF. Ele consome a API RESTful do [backend](https://github.com/RafaelAlmeida00/desafio-uff-backend) e oferece uma interface de usuÃ¡rio reativa, segura e moderna para o gerenciamento de tarefas.

## DescriÃ§Ã£o Geral

### Objetivo do Projeto
O objetivo Ã© fornecer uma experiÃªncia de usuÃ¡rio fluida e intuitiva para que usuÃ¡rios possam se cadastrar, autenticar e gerenciar suas listas de tarefas. A aplicaÃ§Ã£o foi construÃ­da com foco em boas prÃ¡ticas de desenvolvimento, componentizaÃ§Ã£o, gerenciamento de estado e seguranÃ§a.

### Tecnologias Utilizadas

- **Framework:** React 18 (com Hooks)
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **EstilizaÃ§Ã£o:** Tailwind CSS v4 + `shadcn/ui` para componentes base
- **Roteamento:** React Router DOM v6
- **FormulÃ¡rios:** React Hook Form + Zod para validaÃ§Ã£o de esquemas
- **RequisiÃ§Ãµes HTTP:** Axios
- **Gerenciamento de Estado:** React Context API
- **AnimaÃ§Ãµes:** Framer Motion
- **NotificaÃ§Ãµes:** Sonner (Toasts)

---

## InstalaÃ§Ã£o e ExecuÃ§Ã£o

### 1. PrÃ©-requisitos
- Node.js v20+
- pnpm (ou npm/yarn)
- O [servidor backend](https://github.com/example/repo/tree/main/backend) deve estar em execuÃ§Ã£o.

### 2. Passo a Passo

1.  **Clone o repositÃ³rio e navegue atÃ© a pasta:**
    ```bash
    git clone https://github.com/RafaelAlmeida00/desafio-uff-backend.git
    cd <pasta gerada do clone>
    ```

2.  **Instale as dependÃªncias:**
    ```bash
    pnpm install
    ```

3.  **Configure as variÃ¡veis de ambiente:**
    Crie um arquivo `.env.local` na raiz da pasta `frontend` copiando o exemplo:
    ```bash
    cp .env.example .env.local
    ```
    Altere a variÃ¡vel `VITE_API_URL` para o endereÃ§o onde o backend estÃ¡ rodando (por padrÃ£o, `http://localhost:3000`).

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    A aplicaÃ§Ã£o estarÃ¡ disponÃ­vel em `http://localhost:5173`.

---

## Estrutura de Pastas e Arquivos

O projeto segue uma arquitetura modular e componentizada, visando a separaÃ§Ã£o de responsabilidades e o reuso de cÃ³digo.

```
frontend/
â””â”€â”€ src/
    â”œâ”€â”€ components/         # Componentes React reutilizÃ¡veis (UI e de layout)
    â”‚   â”œâ”€â”€ layout/         # Componentes estruturais (Header, PageTransition)
    â”‚   â”œâ”€â”€ tasks/          # Componentes para a funcionalidade de tarefas (TaskList)
    â”‚   â””â”€â”€ ui/             # Componentes de UI genÃ©ricos (Button, Input, Card)
    â”œâ”€â”€ contexts/           # Contextos React para gerenciamento de estado global
    â”œâ”€â”€ hooks/              # Hooks customizados com lÃ³gica de negÃ³cio
    â”œâ”€â”€ lib/                # FunÃ§Ãµes utilitÃ¡rias genÃ©ricas
    â”œâ”€â”€ pages/              # Componentes que representam as pÃ¡ginas da aplicaÃ§Ã£o
    â”œâ”€â”€ routes/             # DefiniÃ§Ã£o e proteÃ§Ã£o das rotas
    â”œâ”€â”€ schemas/            # Esquemas de validaÃ§Ã£o (Zod) para formulÃ¡rios
    â”œâ”€â”€ services/           # MÃ³dulos para interagir com APIs externas
    â”‚   â”œâ”€â”€ api/            # ConfiguraÃ§Ã£o do cliente Axios e chamadas Ã  API
    â”œâ”€â”€ styles/             # Estilos globais
    â””â”€â”€ types/              # DefiniÃ§Ãµes de tipos e interfaces TypeScript
```

---

## FunÃ§Ãµes Principais e Fluxo de Uso

A aplicaÃ§Ã£o oferece um fluxo completo de autenticaÃ§Ã£o e gerenciamento de tarefas.

### 1. AutenticaÃ§Ã£o de UsuÃ¡rio
- **Cadastro (`/signup`):** Novos usuÃ¡rios podem se registrar fornecendo nome, e-mail e senha. O formulÃ¡rio valida os dados em tempo real.
- **Login (`/login`):** UsuÃ¡rios existentes podem se autenticar. Em caso de sucesso, o backend define um cookie HTTP-only e o usuÃ¡rio Ã© redirecionado para o dashboard.

### 2. Dashboard de Tarefas (`/`)
- **VisualizaÃ§Ã£o:** Exibe a lista de tarefas do usuÃ¡rio logado.
- **CriaÃ§Ã£o:** Um formulÃ¡rio permite adicionar novas tarefas.
- **AtualizaÃ§Ã£o:** Ã‰ possÃ­vel marcar tarefas como "concluÃ­das" ou "pendentes".
- **ExclusÃ£o:** Tarefas podem ser removidas da lista.
- **Filtros:** O usuÃ¡rio pode filtrar a visualizaÃ§Ã£o entre tarefas "Todas", "Pendentes" e "ConcluÃ­das".
- **Feedback Visual:** A interface Ã© atualizada dinamicamente sem recarregar a pÃ¡gina, e notificaÃ§Ãµes (toasts) informam o resultado das aÃ§Ãµes.

---

## SeguranÃ§a no Frontend

A seguranÃ§a no lado do cliente foi um pilar do desenvolvimento, com foco em proteger os dados do usuÃ¡rio e prevenir ataques comuns.

### 1. AutenticaÃ§Ã£o Segura com Cookies
A aplicaÃ§Ã£o **nÃ£o utiliza `localStorage` ou `sessionStorage`** para guardar tokens de sessÃ£o, o que Ã© uma prÃ¡tica vulnerÃ¡vel a ataques XSS. Em vez disso, a autenticaÃ§Ã£o Ã© gerenciada por **cookies HTTP-only** configurados pelo backend.

- **Como Funciona:** ApÃ³s o login, o servidor envia um cookie seguro que o navegador armazena e anexa automaticamente a todas as requisiÃ§Ãµes futuras para a API.
- **ProteÃ§Ã£o XSS:** A flag `HttpOnly` no cookie impede que ele seja acessado por qualquer script JavaScript no frontend. Isso significa que, mesmo que um invasor conseguisse injetar um script malicioso, ele nÃ£o conseguiria roubar o token de sessÃ£o do usuÃ¡rio.
- **Gerenciamento de Estado:** O `AuthContext` do React simplesmente verifica o estado da autenticaÃ§Ã£o fazendo uma chamada Ã  API. O sucesso ou falha dessa chamada (que depende do cookie enviado pelo navegador) determina se o usuÃ¡rio estÃ¡ logado.

### 2. ProteÃ§Ã£o Nativa contra XSS (Cross-Site Scripting)
A principal defesa contra a execuÃ§Ã£o de scripts maliciosos injetados nos dados (como no tÃ­tulo ou descriÃ§Ã£o de uma tarefa) Ã© o comportamento padrÃ£o do React.

- **Escapando Dados:** O React (JSX) **escapa automaticamente** todo o conteÃºdo dinÃ¢mico renderizado na tela. Se uma string de dados contiver `<script>alert('XSS')</script>`, o React a tratarÃ¡ como texto literal e exibirÃ¡ a tag como um simples texto, em vez de executÃ¡-la como um script. Isso neutraliza a grande maioria dos vetores de ataque de XSS.

### 3. Rotas Protegidas
- O componente `ProtectedRoute.tsx` envolve as pÃ¡ginas que exigem autenticaÃ§Ã£o (como o Dashboard).
- Ele verifica o estado de autenticaÃ§Ã£o do `AuthContext` antes de renderizar a pÃ¡gina. Se o usuÃ¡rio nÃ£o estiver logado, ele Ã© automaticamente redirecionado para a pÃ¡gina de `/login`, garantindo que apenas usuÃ¡rios autenticados possam acessar as rotas de dados.

### 4. ValidaÃ§Ã£o de FormulÃ¡rios com Zod
- Nenhum dado Ã© enviado para a API sem antes passar por uma rigorosa validaÃ§Ã£o no frontend.
- Utilizamos **Zod** em conjunto com **React Hook Form** para definir esquemas de validaÃ§Ã£o (`src/schemas`). Isso garante a integridade dos dados (ex: formato de e-mail, comprimento mÃ­nimo de senha) e fornece feedback instantÃ¢neo ao usuÃ¡rio.
- Essa prÃ¡tica tambÃ©m atua como uma primeira linha de defesa, reduzindo a carga no backend ao bloquear requisiÃ§Ãµes malformadas ou invÃ¡lidas antes mesmo de serem enviadas.

---

## Ideias Futuras

Esta seÃ§Ã£o descreve possÃ­veis melhorias e novas funcionalidades que podem ser implementadas para evoluir a plataforma.

### Funcionalidades
- **GamificaÃ§Ã£o:** Adicionar um sistema de pontos, medalhas ou recompensas pela conclusÃ£o de tarefas para aumentar o engajamento.
- **Temas e CustomizaÃ§Ã£o:** Implementar um seletor de temas (como modo claro/escuro jÃ¡ existente) e permitir que os usuÃ¡rios personalizem a aparÃªncia da interface.
- **Suporte Multi-idioma (i18n):** Adaptar a aplicaÃ§Ã£o para suportar mÃºltiplos idiomas, expandindo seu alcance global.
- **Compartilhamento de Tarefas:** Permitir que usuÃ¡rios convidem outros para colaborar em listas de tarefas especÃ­ficas.

### SeguranÃ§a
- **AutenticaÃ§Ã£o de Dois Fatores (2FA):** Adicionar uma camada extra de seguranÃ§a no login, exigindo um cÃ³digo de um aplicativo autenticador (TOTP).
- **Content Security Policy (CSP):** Implementar um cabeÃ§alho CSP rigoroso para mitigar ainda mais os riscos de ataques XSS e de injeÃ§Ã£o de dados, controlando quais recursos o navegador pode carregar.
- **Scanner de DependÃªncias Automatizado:** Integrar ferramentas como Snyk ou GitHub Dependabot para monitorar continuamente as dependÃªncias do projeto em busca de vulnerabilidades conhecidas.
