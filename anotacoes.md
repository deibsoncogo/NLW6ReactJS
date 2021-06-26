# Rocketseat - Next Level Week 6 Together - Trilha React JS
Conteúdo aprendido no Next Level Week 6 Together na trilha de React JS (Frontend) com o Diego Fernandes onde foi criado um site para lidar com a demanda de perguntas onde os usuários precisam realizar um login da Google para enviar suas duvidas e votar para assim criar nível de importância

## Aula 01 – Liftoff
>We're go for launch, é hora de decolar e partir rumo ao próximo nível. Esse é o começo da nossa missão

O `Firebase` é um backend pronto completo para lidar com diversas funcionalidades a partir de uma plataforma online, ele é recomendado para dar agilidade no projeto ou é na aplicação de funcionalidade especifica como a criação de uma autenticação

Para criar os arquivos iniciais iremos usar este comando
```bash
yarn create react-app nlw6togetherreactjs --template typescript
```

Para configurar a autenticação precisamos clicar em criação, autenticação, primeiros passos, selecionar o mecanismo que iremos utilizar para o login preencher alguns campos e pronto

Para configurar o banco de dados temos que clicar em criação, realtime database, criar banco de dados, escolher o local do servidor e o tipo como bloqueado ou teste

Agora temos que criar o vinculo com o Firebase onde para isso vamos precisar da dependência abaixo
Na plataforma do Firebase em visão geral definimos o formato da aplicação onde neste caso é web, clicamos em registrar o app, e copiamos as informações de configurações para colocar dentro do arquivo `services/firebase.ts`
```bash
yarn add firebase
```

## Aula 02 - Maximum Speed
>A decolagem foi um sucesso e agora é hora de avançar com velocidade máxima rumo ao nosso objetivo

Todo componente precisa conter a primeira letra maiúscula
Devemos importar todos os arquivo como imagem para ter um bom funcionamento

Na criação da estilização vamos usar a dependência baixo pois ela possui vantagens, a versão mais recente não suporta o `create react app`
```bash
yarn add node-sass@^5.0.0
```

Para lidar com as rotas iremos usar esta dependência e suas tipagens
```bash
yarn add react-router-dom
yarn add @types/react-router-dom -D
```

Para navegar entre páginas a partir de um item que possui ancora como a tag `a` podemos usar o item `Link` que o `react-router-dom` possui, caso contrario temos usar o `useHistory` que o próprio `react-router-dom` possui com a combinação de uma função como abaixo
```ts
const history = useHistory();

  function handleNavigateToNewRoom() {
    history.push("/room/new");
  }
```

Agora iremos usar a metodologia de `context` onde a partir dele conseguiremos jogar informações em toda aplicação

## Aula 03 – In Orbit
>Estamos em órbita, explorando um universo infinito, repleto de novos conhecimentos

A importação abaixo impede que mais de uma rota seja carregada
```bash
import { Switch } from "react-router-dom";
```

Conseguimos criar regras de negocio para o nosso banco de dados acessando a plataforma
```ts
{
  "rules": {
    "room": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
          }
        }
      }
    }
  }
}
```

Temos a dependência `React Hot Toast` que permite criar notificação incríveis
