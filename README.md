## Pomelo - анализ состава продуктов

### Installation

```bash
git clone https://github.com/Color-Kat/Pomelo-food-analyzer.git ./Pomelo-food-analyzer
```

**Development mode:**
```bash
docker compose up --build
```

**Production mode:**
```bash
docker compose -f docker-compose.prod.yml up --build
```

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