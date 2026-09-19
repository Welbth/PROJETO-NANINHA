# Site — Dra. Adriana Orneles (Nutrição Clínica)

Landing page estática (HTML + Tailwind CSS + JavaScript puro) com quiz de avaliação metabólica que envia os contatos por e-mail (Formspree) e direciona para o WhatsApp.

## Estrutura de Arquivos

- `index.html`: a página inteira (seções, quiz e política de privacidade).
- `assets/css/style.css`: estilos próprios (animações, efeitos de vidro, menu mobile).
- `assets/css/tailwind.css`: CSS do Tailwind **gerado automaticamente** — não edite à mão.
- `assets/css/tailwind.input.css`: arquivo de entrada do Tailwind.
- `tailwind.config.js`: cores e fontes da marca.
- `assets/js/main.js`: animações de rolagem, menu mobile, vídeo e parallax.
- `assets/images/` e `assets/videos/`: imagens (WebP otimizado) e vídeo (MP4 comprimido).

## ⚠️ Importante: ao editar classes do Tailwind

O Tailwind não roda mais pelo CDN (era lento). O CSS é gerado uma vez e fica pronto no site.
**Sempre que adicionar ou trocar classes do Tailwind no HTML**, rode:

```bash
npm install        # só na primeira vez
npm run build:css  # gera assets/css/tailwind.css
```

Durante a edição, `npm run watch:css` atualiza o CSS automaticamente a cada alteração.
Mudar só textos não exige rodar nada.

## Mídia

- Imagens: prefira **WebP** no tamanho em que aparecem na tela.
- Vídeo do topo: 720p, H.264, sem áudio. Para comprimir um vídeo novo com o FFmpeg:

```bash
ffmpeg -i video-original.mp4 -vf "scale=720:-2" -c:v libx264 -preset veryslow -crf 23 -pix_fmt yuv420p -movflags +faststart -an assets/videos/hero_video.mp4
```

## Como Fazer o Deploy

Hospede a pasta em qualquer serviço estático (Vercel, Netlify ou GitHub Pages). Eles já aplicam compressão e cache automaticamente.
A pasta `node_modules/` não precisa ir para o servidor.
