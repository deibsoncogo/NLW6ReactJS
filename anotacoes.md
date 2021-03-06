# Rocketseat - Next Level Week 6 Together - Trilha React JS
Conteúdo aprendido no Next Level Week 6 Together na trilha de React JS (Frontend) com o Diego Fernandes onde foi criado um site para lidar com a demanda de perguntas onde os usuários precisam realizar um login da Google para enviar suas duvidas e votar para assim criar nível de importância

## Aula 01 - Liftoff
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

## Aula 03 - In Orbit
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
        "question": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "like": {
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

## Aula 04 - Landing
>É hora de pousar em um novo planeta

Temos o comando abaixo que vai executar a formatação a partir do segundo item da lista
```ts
// os itens ter essa formatação exceto o primeiro
& + .question {
  margin-top: 8px;
}
```

Quando criamos um código isolado para utilizar várias vezes e ele gerar algo visual estaremos criando um componente e quando não estamos criando um hook

Podemos usar o `&` para conseguir definir tipagens manuais junto de padrões da linguagem
```ts
type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}
```

Conseguimos trocar a cor de um `svg` somente se ele estiver dentro da nossa aplicação sem a realização de uma importação

Para ativar itens nativos no `HTML` podemos a dependência do `React` chamada de `ReactNode`
O `some` realiza uma busca e retornar um booleano

## Aula 05 - Surface exploration
>Etapa final da nossa missão, em um novo planeta, vamos explorar a superfície e assimilar novos conhecimentos

Para lidar com várias classes de estilização podemos usar a dependência abaixo
```bs
yarn add classnames
```

Para hospedar o projeto no `Firebase` usamos a opção `Hosting`, clicamos em primeiros passo e depois instalamos a dependência abaixo de forma global
```bs
yarn global add firebase-tools
```

Depois executamos este comando para realizar o login, damos sim a pergunta e selecionamos a conta
```bs
firebase login
```

Agora dentro do projeto executamos este comando e responsemos algumas perguntas
  Selecionamos as ferramentas que está sendo utilizado
  Informamos se já existe um projeto no firebase
  Agora confirmamos o nome do arquivo de regras do banco de dados
  Alteramos o nome da pasta `public` para `build`
  Confirmamos que existe uma página principal
  Por último temos a opção de fazer o site se sincronizar ao `Github`

```bs
firebase init
```

Agora criamos a versão build do projeto
```bs
yarn build
```

Por fim para enviar o protejo para a nuvem usamos este comando
```bs
firebase deploy
```
