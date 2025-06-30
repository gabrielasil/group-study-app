# Lista de Estudo Colaborativa

![Demonstração do App](https://i.imgur.com/rS7zP2W.png)

Este é um aplicativo web para gerenciamento colaborativo de listas de estudo, construído com React e Material-UI. A plataforma permite que estudantes, organizados em grupos, criem, compartilhem e gerenciem listas de tópicos de estudo de forma dinâmica e interativa.

O objetivo é facilitar a organização de conteúdo, incentivar a colaboração entre pares e aumentar a eficiência dos estudos em grupo.

## Principais Funcionalidades

- **Autenticação e Grupos Privados**: Simulação de um ambiente seguro onde os usuários podem criar e participar de grupos de estudo privados.
- **Criação e Gestão de Grupos**: Usuários podem criar novos grupos ou entrar em grupos existentes através de um código único.
- **Listas de Estudo Colaborativas**: Dentro de cada grupo, os membros podem criar múltiplas listas de estudo.
- **Gerenciamento de Tópicos**: Adicione tópicos a uma lista, atribua um responsável, defina a prioridade e atualize o status ("Não iniciado", "Em revisão", "Estudado").
- **Seção de Comentários**: Cada tópico possui uma área de comentários para discussões, utilizando a biblioteca `react-comments-section`.
- **Avatares Dinâmicos**: Avatares de usuário são gerados dinamicamente com base no nome, utilizando a API `ui-avatars.com` para uma identificação visual clara.
- **Visualização de Membros**: Veja facilmente todos os membros de um grupo.
- **Sair de um Grupo**: Os usuários podem sair dos grupos dos quais não desejam mais fazer parte.

## Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)

### Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/gabrielasil/group-study-app.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd group-study-app
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm start
    ```

5.  Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

---

_Este projeto foi desenvolvido como parte de um trabalho acadêmico, utilizando dados mockados para simular a interação com um backend._
