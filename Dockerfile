# Dockerfile

FROM php:8.2-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-client \
    postgresql-dev \
    git \
    curl \
    unzip \
    nodejs \
    npm

RUN docker-php-ext-install pdo pdo_pgsql opcache

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY . /var/www/html/

WORKDIR /var/www/html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

RUN npm install
RUN npm run build # Este comando es crucial para compilar los assets de React para producción

RUN chown -R www-data:www-data var public
RUN setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX var
RUN setfacl -R -m o:rX var
RUN setfacl -R -m u:www-data:rwX -m u:"$(whoami)":rwX var/cache var/log
RUN setfacl -R -m o:rX var/cache var/log

RUN mkdir -p /run/nginx /var/log/supervisor

COPY ./docker/supervisor/supervisord.conf /etc/supervisord.conf
COPY ./docker/supervisor/conf.d/nginx.conf /etc/supervisor/conf.d/nginx.conf
COPY ./docker/supervisor/conf.d/php-fpm.conf /etc/supervisor/conf.d/php-fpm.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]