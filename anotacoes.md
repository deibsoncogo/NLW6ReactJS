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
