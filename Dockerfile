# Build Stage Start

# Specify a base image
FROM node:16-alpine as builder 

# Specify a working directory
WORKDIR '/app'

# Copy the dependencies file
COPY package.json .
# Needed because of build err
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy remaining files
COPY . .

# Build the project for production
RUN yarn run build 

# Run Stage Start
FROM nginx

# Copy production build files from builder phase to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy nginx config (needed for react-router -- SPA)
COPY nginx/nginx.conf /etc/nginx/conf.d
