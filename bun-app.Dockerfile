# Use the latest LTS version of Node.js as the base image
FROM node:lts

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to the PATH environment variable
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app
COPY ./ .

WORKDIR /app/bun-app
RUN bun install
HEALTHCHECK --interval=5m --start-period=5s CMD curl -f http://localhost:${APP_PORT}/_/healthcheck
EXPOSE ${APP_PORT}

CMD ["npm", "run" ,"dev"]