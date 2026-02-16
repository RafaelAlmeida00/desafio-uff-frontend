# Desafio Fullstack – Plataforma de Tarefas (Frontend)

Este projeto é o frontend da Plataforma de Tarefas, desenvolvido para o Desafio Fullstack da UFF. Ele consome a API RESTful do [backend](https://github.com/RafaelAlmeida00/desafio-uff-backend) e oferece uma interface de usuário reativa, segura e moderna para o gerenciamento de tarefas.

## Descrição Geral

### Objetivo do Projeto
O objetivo é fornecer uma experiência de usuário fluida e intuitiva para que usuários possam se cadastrar, autenticar e gerenciar suas listas de tarefas. A aplicação foi construída com foco em boas práticas de desenvolvimento, componentização, gerenciamento de estado e segurança.

### Tecnologias Utilizadas

- **Framework:** React 18 (com Hooks)
- **Linguagem:** TypeScript
- **Build Tool:** Vite
- **Estilização:** Tailwind CSS v4 + `shadcn/ui` para componentes base
- **Roteamento:** React Router DOM v6
- **Formulários:** React Hook Form + Zod para validação de esquemas
- **Requisições HTTP:** Axios
- **Gerenciamento de Estado:** React Context API
- **Animações:** Framer Motion
- **Notificações:** Sonner (Toasts)

---

## Instalação e Execução

### 1. Pré-requisitos
- Node.js v20+
- pnpm (ou npm/yarn)
- O [servidor backend](https://github.com/RafaelAlmeida00/desafio-uff-backend) deve estar em execução.

### 2. Passo a Passo

1.  **Clone o repositório e navegue até a pasta:**
    ```bash
    git clone https://github.com/RafaelAlmeida00/desafio-uff-frontend.git
    cd <pasta gerada do clone>
    ```

2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz da pasta `frontend` copiando o exemplo:
    ```bash
    cp .env.example .env.local
    ```
    Altere a variável `VITE_API_URL` para o endereço onde o backend está rodando (por padrão, `http://localhost:3000`).

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    A aplicação estará disponível em `http://localhost:5173`.

---

## Estrutura de Pastas e Arquivos

O projeto segue uma arquitetura modular e componentizada, visando a separação de responsabilidades e o reuso de código.

```
frontend/
└── src/
    ├── components/         # Componentes React reutilizáveis (UI e de layout)
    │   ├── layout/         # Componentes estruturais (Header, PageTransition)
    │   ├── tasks/          # Componentes para a funcionalidade de tarefas (TaskList)
    │   └── ui/             # Componentes de UI genéricos (Button, Input, Card)
    ├── contexts/           # Contextos React para gerenciamento de estado global
    ├── hooks/              # Hooks customizados com lógica de negócio
    ├── lib/                # Funções utilitárias genéricas
    ├── pages/              # Componentes que representam as páginas da aplicação
    ├── routes/             # Definição e proteção das rotas
    ├── schemas/            # Esquemas de validação (Zod) para formulários
    ├── services/           # Módulos para interagir com APIs externas
    │   ├── api/            # Configuração do cliente Axios e chamadas à API
    ├── styles/             # Estilos globais
    └── types/              # Definições de tipos e interfaces TypeScript
```

---

## Funções Principais e Fluxo de Uso

A aplicação oferece um fluxo completo de autenticação e gerenciamento de tarefas.

### 1. Autenticação de Usuário
- **Cadastro (`/signup`):** Novos usuários podem se registrar fornecendo nome, e-mail e senha. O formulário valida os dados em tempo real.
- **Login (`/login`):** Usuários existentes podem se autenticar. Em caso de sucesso, o backend define um cookie HTTP-only e o usuário é redirecionado para o dashboard.

### 2. Dashboard de Tarefas (`/`)
- **Visualização:** Exibe a lista de tarefas do usuário logado.
- **Criação:** Um formulário permite adicionar novas tarefas.
- **Atualização:** É possível marcar tarefas como "concluídas" ou "pendentes".
- **Exclusão:** Tarefas podem ser removidas da lista.
- **Filtros:** O usuário pode filtrar a visualização entre tarefas "Todas", "Pendentes" e "Concluídas".
- **Feedback Visual:** A interface é atualizada dinamicamente sem recarregar a página, e notificações (toasts) informam o resultado das ações.

---

## Segurança no Frontend

A segurança no lado do cliente foi um pilar do desenvolvimento, com foco em proteger os dados do usuário e prevenir ataques comuns.

### 1. Autenticação Segura com Cookies
A aplicação **não utiliza `localStorage` ou `sessionStorage`** para guardar tokens de sessão, o que é uma prática vulnerável a ataques XSS. Em vez disso, a autenticação é gerenciada por **cookies HTTP-only** configurados pelo backend.

- **Como Funciona:** Após o login, o servidor envia um cookie seguro que o navegador armazena e anexa automaticamente a todas as requisições futuras para a API.
- **Proteção XSS:** A flag `HttpOnly` no cookie impede que ele seja acessado por qualquer script JavaScript no frontend. Isso significa que, mesmo que um invasor conseguisse injetar um script malicioso, ele não conseguiria roubar o token de sessão do usuário.
- **Gerenciamento de Estado:** O `AuthContext` do React simplesmente verifica o estado da autenticação fazendo uma chamada à API. O sucesso ou falha dessa chamada (que depende do cookie enviado pelo navegador) determina se o usuário está logado.

### 2. Proteção Nativa contra XSS (Cross-Site Scripting)
A principal defesa contra a execução de scripts maliciosos injetados nos dados (como no título ou descrição de uma tarefa) é o comportamento padrão do React.

- **Escapando Dados:** O React (JSX) **escapa automaticamente** todo o conteúdo dinâmico renderizado na tela. Se uma string de dados contiver `<script>alert('XSS')</script>`, o React a tratará como texto literal e exibirá a tag como um simples texto, em vez de executá-la como um script. Isso neutraliza a grande maioria dos vetores de ataque de XSS.

### 3. Rotas Protegidas
- O componente `ProtectedRoute.tsx` envolve as páginas que exigem autenticação (como o Dashboard).
- Ele verifica o estado de autenticação do `AuthContext` antes de renderizar a página. Se o usuário não estiver logado, ele é automaticamente redirecionado para a página de `/login`, garantindo que apenas usuários autenticados possam acessar as rotas de dados.

### 4. Validação de Formulários com Zod
- Nenhum dado é enviado para a API sem antes passar por uma rigorosa validação no frontend.
- Utilizamos **Zod** em conjunto com **React Hook Form** para definir esquemas de validação (`src/schemas`). Isso garante a integridade dos dados (ex: formato de e-mail, comprimento mínimo de senha) e fornece feedback instantâneo ao usuário.
- Essa prática também atua como uma primeira linha de defesa, reduzindo a carga no backend ao bloquear requisições malformadas ou inválidas antes mesmo de serem enviadas.

---

## Ideias Futuras

Esta seção descreve possíveis melhorias e novas funcionalidades que podem ser implementadas para evoluir a plataforma.

### Funcionalidades
- **Gamificação:** Adicionar um sistema de pontos, medalhas ou recompensas pela conclusão de tarefas para aumentar o engajamento.
- **Temas e Customização:** Implementar um seletor de temas (como modo claro/escuro já existente) e permitir que os usuários personalizem a aparência da interface.
- **Suporte Multi-idioma (i18n):** Adaptar a aplicação para suportar múltiplos idiomas, expandindo seu alcance global.
- **Compartilhamento de Tarefas:** Permitir que usuários convidem outros para colaborar em listas de tarefas específicas.

### Segurança
- **Autenticação de Dois Fatores (2FA):** Adicionar uma camada extra de segurança no login, exigindo um código de um aplicativo autenticador (TOTP).
- **Content Security Policy (CSP):** Implementar um cabeçalho CSP rigoroso para mitigar ainda mais os riscos de ataques XSS e de injeção de dados, controlando quais recursos o navegador pode carregar.
- **Scanner de Dependências Automatizado:** Integrar ferramentas como Snyk ou GitHub Dependabot para monitorar continuamente as dependências do projeto em busca de vulnerabilidades conhecidas.

