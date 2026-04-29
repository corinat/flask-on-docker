FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY ./static /usr/share/nginx/html/static
COPY ./static/favicon.ico /usr/share/nginx/html/favicon.ico

# Install gettext for envsubst
RUN apt-get update && apt-get install -y gettext-base

# Entrypoint script to generate nginx.conf from template
CMD envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'