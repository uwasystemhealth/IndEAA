
# RILA NGINX_TECHDOCS  (Multistage Dockerfile)

# ===================================
# ---- Executed at Image Build ----
# ===================================

# ------------------------------------------------------------------------------------
# "BUILD/COMPILE" USER DOCS IMAGE
# ------------------------------------------------------------------------------------
FROM python:3.8.6-slim-buster AS docsbuild
ENV PYTHONUNBUFFERED 1

# Install mkdocs-material requirements
COPY /mkdocs /mkdocs

RUN pip install -r /mkdocs/requirements.txt

WORKDIR /mkdocs/

# Install PDF Dependencies for Mkdocs
RUN apt-get update && apt-get install -y libcairo2-dev libpangocairo-1.0-0

RUN ENABLE_PDF_EXPORT=1 mkdocs build

# ------------------------------------------------------------------------------------
# "FINAL/PROD" IMAGE
# ------------------------------------------------------------------------------------
FROM nginx:1.19

RUN apt-get update && apt-get install -y figlet apache2-utils && rm -rf /var/lib/apt/lists/*

# Set working directory for container runtime
WORKDIR /mkdocs

# Record build timestamp
RUN date > build_timestamp.txt
RUN figlet RILA - NGINX mkdocs
RUN cat build_timestamp.txt

# Copy compiled Tech doco from 'docsbuild' image into this image
COPY --from=docsbuild /mkdocs/site /mkdocs

# Remove default nginx config and copy in our custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY /docker/nginx_mkdocs/custom.conf /etc/nginx/conf.d/custom.conf

# Copy runtime script & make it executable
COPY /docker/nginx_mkdocs/runtime.sh /runtime.sh
RUN chmod +x /runtime.sh

# ========================================
# ---- Executed at Container Runtime ----
# ========================================

# CMD commands get executed at container runtime!
CMD ["/runtime.sh"]
