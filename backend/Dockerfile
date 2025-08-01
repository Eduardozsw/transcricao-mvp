FROM python:3.11-slim

WORKDIR /app

# Cria e ativa o ambiente virtual (opcional no Docker, mas pode evitar warnings)
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copia os requisitos e instala
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do backend (tudo que está dentro de /backend)
COPY . .

# Expõe a porta usada pelo FastAPI
EXPOSE 8000

# Comando para iniciar o FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
