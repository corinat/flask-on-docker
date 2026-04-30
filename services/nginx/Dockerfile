FROM nginx:1.25

# Remove default site
RUN rm /etc/nginx/conf.d/default.conf

# Copy template into nginx's automatic template directory
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Static files
COPY ./static /usr/share/nginx/html/static
