FROM node:18
ENV PORT=80
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["node", "dist/index.js"]
