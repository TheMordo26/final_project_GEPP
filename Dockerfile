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

RUN curl -sS https://symfony.com/installer -o /usr/local/bin/symfony \
    && chmod +x /usr/local/bin/symfony

RUN docker-php-ext-install pdo pdo_pgsql opcache

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY . /var/www/html/

WORKDIR /var/www/html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader --no-plugins --no-scripts \
    && php bin/console cache:clear --env=prod --no-warmup \
    && php bin/console assets:install public --env=prod --symlink --relative \
    && php bin/console doctrine:migrations:migrate --no-interaction --env=prod

RUN npm install
RUN npm run build

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