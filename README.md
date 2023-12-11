# **WebCars**

O WebCarros é um projeto inspirado no site WebMotors, construído utilizando Vite como framework inicial e uma pilha de tecnologias que inclui ReactJS, Typescript, tailwindcss e Firebase. A plataforma Firebase é utilizada para autenticação, Firestore para armazenamento de dados e Firebase Storage para armazenar imagens dos carros. 

## **Recursos**

- **Autenticação:** O login do usuário é obrigatório para acessar determinadas páginas, garantindo uma experiência personalizada.
- **Registro:** Novos usuários podem se cadastrar, fornecendo seu nome, email e senha.
- **Home:** Exibe uma lista de todos os carros de diferentes usuários, acessível sem fazer login.
- **Dashboard:** Os usuários podem gerenciar seus anúncios de carros, excluir anúncios e navegar para outras páginas.
- **Cadastrar Carro:** Permite que os usuários adicionem um novo carro à plataforma com imagens, detalhes e preço.
- **Detalhes do Carro:** Oferece uma visão detalhada de um carro específico, incluindo um swiper para imagens e um botão para entrar em contato com o vendedor via WhatsApp.

## **Como Começar**

Para executar o projeto localmente, siga estas etapas:

1. Clone o repositório:

```bash
bashCopy code
git clone https://github.com/oMatheus-Farias/WebCars.git
cd WebCars

```

1. Instale as dependências:

```bash
bashCopy code
npm install

```

1. Inicie o servidor de desenvolvimento:

```bash
bashCopy code
npm run dev

```

1. Abra seu navegador e acesse o localhost que será disponibilizado

## **Autenticação**

- Os usuários precisam fazer login usando um email e senha válidos.
- Novos usuários podem se cadastrar fornecendo um nome, email e senha.
- O acesso a determinadas páginas é restrito a usuários autenticados.

## **Páginas**

### **Login**

- Exige um email e senha válidos para autenticação.
- Utiliza a biblioteca **`react-hook-form`** com **`zod`** para validação de formulários.

### **Cadastro**

- Novos usuários fornecem nome, email e senha para se cadastrar.
- A validação do formulário é implementada usando **`react-hook-form`**.

### **Home**

- Exibe uma lista de todos os carros adicionados por vários usuários.
- Acessível sem fazer login.

### **Dashboard**

- Usuários autenticados podem visualizar e gerenciar seus anúncios de carros.
- Apresenta uma barra de navegação para facilitar o acesso a outras páginas.
- Opções incluem navegar para a página de cadastro, voltar para o dashboard e fazer logout.

### **Cadastrar Carro**

- Permite que os usuários adicionem um novo anúncio de carro.
- Inclui um recurso de upload de imagem com armazenamento automático no Firebase.
- A validação do formulário é implementada usando **`react-hook-form`**.

### **Detalhes do Carro**

- Fornece informações detalhadas sobre um carro específico.
- Utiliza a biblioteca Swiper para um slide show de imagens do carro.
- Inclui detalhes do vendedor e um botão para iniciar uma conversa no WhatsApp.

## **Header**

- Persiste em todas as páginas para facilitar a navegação.
- Clicar no logotipo direciona os usuários para a página inicial.

## **Licença**

Este projeto é licenciado sob a [Licença MIT](https://chat.openai.com/c/LICENSE).
