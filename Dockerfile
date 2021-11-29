FROM nginx:1.19-alpine
LABEL author=vincentmi type=vue project=admin-web
COPY --chown=nginx:nginx ./dist/ /usr/share/nginx/html/
COPY ./start.sh /app/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
ENV ENV=prod BASE_URL=/ API_PREFIX=https://localhost
EXPOSE 80
ENTRYPOINT ["/app/start.sh"]