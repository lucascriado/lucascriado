FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
# SPA: qualquer rota desconhecida cai no index.html, senão um F5 fora da raiz da 404.
RUN printf '%s\n' \
  'server {' \
  '  listen 80;' \
  '  root /usr/share/nginx/html;' \
  '  index index.html;' \
  '  location / { try_files $uri $uri/ /index.html; }' \
  '}' > /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
