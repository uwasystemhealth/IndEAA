FROM node:12

# SET WORKING DIRECTORY
WORKDIR /app_code

# Copy runtime script & make it executable
COPY /docker/client/runtime.sh /runtime.sh
RUN chmod +x /runtime.sh

# Copy Application code into a directory called `app_code`
COPY ./client /app_code

# Install ALL Dependencies
RUN yarn install --production=false 

# ========================================
# ---- Executed at Container Runtime ----
# ========================================

# CMD commands get executed at container runtime!
CMD ["/runtime.sh"]
