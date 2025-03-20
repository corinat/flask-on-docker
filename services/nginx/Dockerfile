FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY ./static /usr/share/nginx/html/static
COPY ./static/favicon.ico /usr/share/nginx/html/favicon.ico