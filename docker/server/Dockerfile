FROM node:12

# SET WORKING DIRECTORY
WORKDIR /app_code

# Copy runtime script & make it executable
COPY /docker/server/runtime.sh /runtime.sh
RUN chmod +x /runtime.sh

# Copy Application code into a directory called `app_code`
COPY ./server /app_code

# install latex packages
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends \
    texlive \
    pandoc

# Install ALL Dependencies
RUN yarn install

# ========================================
# ---- Executed at Container Runtime ----
# ========================================

# CMD commands get executed at container runtime!
CMD ["/runtime.sh"]
