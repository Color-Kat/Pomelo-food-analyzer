## Pomelo - анализ состава продуктов

### Installation


1. Clone repository
```bash
git clone https://github.com/Color-Kat/Pomelo-food-analyzer.git ./Pomelo-food-analyzer
```

2. Copy `.env.example` to `.env` and fill in the necessary environment variables.
You can request secret keys from @ColorKat.

3. **Development mode:**
```bash
docker compose up --build
```

4. **Production mode:**
```bash
docker compose -f docker-compose.prod.yml up --build
```

5. Wait until message `Application is running on: http://localhost:3000` appears in the console.

6. Ping all microservices through kafka: open in browser [http://localhost:3000/ping](http://localhost:3000/ping)

### Troubleshooting
For development mode you should disable docker WSL2 in Docker desktop settings
(**Use the WSL 2 based engine**)
for correct file sharing and hot reload working.

### Microservices
All microservices are located in the `./apps` directory.
- [web](./apps/web/readme.md) (NextJS)
- [api-gateway](./apps/api-gateway/readme.md) (NestJS)
- [account](./apps/account/readme.md) (NestJS)
- [scan](./apps/scan/readme.md) (NestJS)
- [product-analyzer](./apps/product-analyzer/readme.md) (NestJS)
- [ingredients-recognition](./apps/ingredients-recognition/readme.md) (Python, OCR)

### Architecture
[figma](https://www.figma.com/design/puJfactcNzWSTbfW4iuSxL/%D0%90%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0?node-id=0-1&p=f&t=qaFGUs4wJW01w8yu-0)

### Logging and metrics
I use grafana stack for logs and metrics (Grafana, Loki, Promtail, Prometheus).
To run application with logs and metrics, add corresponding flag:
```bash
docker compose --prodile monitoring up
```