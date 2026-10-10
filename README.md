# Mentalist Academy v0.2 — base web + Android

Aplicação de formação em português, com lições, missões de escolha múltipla, feedback explicativo e progresso guardado localmente.

## O que já existe
- Painel e navegação: Painel, Lições, Missões e Progresso.
- Cinco lições e cinco casos de treino.
- Feedback explicativo após cada resposta.
- Progresso local e exportação/importação manual de backup JSON.
- Manifesto e service worker para a versão web/PWA.
- Configuração inicial do Capacitor para criar uma aplicação Android a partir da mesma base de código.

## Requisitos para gerar o APK
- Node.js LTS e npm.
- Android Studio com Android SDK instalado.
- Ligação à internet na primeira instalação das dependências.

## Testar a versão web
Na pasta do projeto:

```bash
npm install
npm run web:serve
```

Abra no navegador o endereço local apresentado pelo Vite. Para instalar a PWA noutro dispositivo, a versão web precisa de ser publicada num endereço HTTPS.

## Preparar o projeto Android
Na pasta do projeto:

```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```

No Android Studio, aguarde a sincronização do Gradle e use Build > Build Bundle(s) / APK(s) > Build APK(s). O APK de depuração normalmente aparece em `android/app/build/outputs/apk/debug/app-debug.apk`.

Para atualizar o conteúdo web depois de alterações, execute `npx cap sync android` antes de gerar outro APK. O APK pode ser instalado noutros dispositivos Android compatíveis; ao distribuir publicamente, use assinatura de lançamento e teste em vários aparelhos.

## Limitações atuais
- A sincronização automática entre dispositivos ainda não está implementada.
- O progresso é guardado localmente em cada instalação. Para já, transfira-o com Exportar/Importar progresso.
- O service worker da PWA funciona em HTTPS ou localhost; abrir `index.html` diretamente não oferece o modo offline completo.
- A geração de APK requer Android Studio/SDK e ainda não foi executada neste ambiente.

## Princípio pedagógico
Treinar observação e raciocínio sem tratar linguagem corporal como detector de mentiras nem afirmar que é possível saber com certeza o que alguém pensa.

## Compilação automática na nuvem (sem Termux)

O projeto inclui o workflow `.github/workflows/android-apk.yml`, que compila o APK num runner do GitHub Actions. Para o usar, é necessário colocar o conteúdo desta pasta num repositório GitHub e abrir o separador **Actions**. Depois de uma execução terminar com sucesso, abrir a execução e descarregar o artefacto **Mentalist-Academy-debug-apk**. O artefacto contém `app-debug.apk`, que pode ser transferido para o Android e instalado. A primeira execução pode demorar alguns minutos. O ambiente de compilação tem de conseguir aceder à internet para obter as dependências.

Nota: este workflow automatiza a compilação, mas não publica o projeto no GitHub nem cria uma conta/repositório em nome do utilizador.
