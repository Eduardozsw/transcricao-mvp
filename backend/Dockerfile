FROM python:3.11-slim

# Instala ffmpeg e remove cache do apt
RUN apt update && \
    apt install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Cria venv e ativa
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copia apenas o requirements primeiro (melhor uso de cache)
COPY backend/requirements.txt .

# Instala dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código
COPY backend/. .

# Expõe a porta usada pela API
EXPOSE 8000

# Comando de inicialização
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
