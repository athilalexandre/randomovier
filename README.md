# Randomovier

Uma aplicação web para gerenciar listas compartilhadas de filmes, séries, animes e desenhos com funcionalidade de sorteio aleatório.

## Funcionalidades

- 🔐 Autenticação com Google
- 👥 Sistema de grupos com códigos de convite
- 📝 Gerenciamento de lista de mídia (CRUD)
- 🎲 Sorteio aleatório de títulos
- 🎬 Integração com TMDb para metadados e provedores de streaming
- 📱 Interface responsiva

## Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
Crie um arquivo `.env.local` na raiz do projeto com:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# The Movie Database API
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### 3. Configurar Firebase
- Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
- Ative Authentication com provedor Google
- Crie um banco Firestore
- Configure as regras de segurança

### 4. Obter chave da API TMDb
- Registre-se em [TMDb](https://www.themoviedb.org/settings/api)
- Gere uma chave de API

## Executar

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Build para produção

```bash
npm run build
npm start
```