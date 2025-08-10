# Guia de Deploy - Randomovier

## 1. Configuração do Firebase

### 1.1 Criar Projeto Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Digite um nome para o projeto (ex: "randomovier-app")
4. Siga os passos de configuração

### 1.2 Ativar Authentication
1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Na aba "Sign-in method", clique em "Google"
4. Ative o provedor Google e configure o nome do projeto
5. Salve as configurações

### 1.3 Criar Banco Firestore
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Modo de teste" para desenvolvimento
4. Escolha uma localização (recomendado: us-central1)
5. Clique em "Próximo" e depois "Ativar"

### 1.4 Configurar Regras de Segurança
1. Na aba "Regras" do Firestore
2. Substitua o conteúdo pelo arquivo `firestore.rules` deste projeto
3. Clique em "Publicar"

### 1.5 Obter Configuração
1. Clique na engrenagem (⚙️) ao lado de "Visão geral do projeto"
2. Selecione "Configurações do projeto"
3. Role para baixo até "Seus aplicativos"
4. Clique no ícone da web (</>) para adicionar um app web
5. Digite um nome para o app
6. Copie as configurações fornecidas

## 2. Configuração do TMDb

### 2.1 Obter API Key
1. Acesse [TMDb](https://www.themoviedb.org/)
2. Crie uma conta ou faça login
3. Vá para "Configurações" > "API"
4. Solicite uma chave de API
5. Copie a chave fornecida

## 3. Configuração das Variáveis de Ambiente

### 3.1 Criar arquivo .env.local
1. Na raiz do projeto, crie um arquivo chamado `.env.local`
2. Adicione as seguintes variáveis:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id

# The Movie Database API
NEXT_PUBLIC_TMDB_API_KEY=sua_tmdb_api_key_aqui
```

## 4. Instalação e Execução

### 4.1 Instalar Dependências
```bash
npm install
```

### 4.2 Executar em Desenvolvimento
```bash
npm run dev
```

### 4.3 Build para Produção
```bash
npm run build
npm start
```

## 5. Deploy para Produção

### 5.1 Vercel (Recomendado)
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no painel do Vercel
3. Deploy automático a cada push

### 5.2 Firebase Hosting
1. Instale Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Inicialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### 5.3 Netlify
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Build command: `npm run build`
4. Publish directory: `.next`

## 6. Configurações Adicionais

### 6.1 Domínio Personalizado
- Configure no painel do seu provedor de hosting
- Adicione o domínio nas configurações do Firebase Authentication

### 6.2 SSL/HTTPS
- Vercel e Netlify fornecem SSL automaticamente
- Firebase Hosting também inclui SSL

## 7. Monitoramento e Manutenção

### 7.1 Firebase Console
- Monitore o uso do Firestore
- Verifique logs de autenticação
- Acompanhe o uso da API

### 7.2 Analytics (Opcional)
- Adicione Google Analytics
- Configure Firebase Analytics
- Monitore métricas de usuários

## 8. Troubleshooting

### 8.1 Erros Comuns
- **"Firebase not initialized"**: Verifique as variáveis de ambiente
- **"Permission denied"**: Verifique as regras do Firestore
- **"API key invalid"**: Verifique a chave do TMDb

### 8.2 Logs
- Use `console.log` para debug
- Verifique o console do navegador
- Monitore os logs do Firebase

## 9. Segurança

### 9.1 Boas Práticas
- Nunca exponha chaves de API no código
- Use as regras de segurança do Firestore
- Valide dados no frontend e backend
- Implemente rate limiting se necessário

### 9.2 Atualizações
- Mantenha as dependências atualizadas
- Monitore vulnerabilidades de segurança
- Atualize as regras do Firestore conforme necessário
