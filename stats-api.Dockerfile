FROM nginx:1.27.3-alpine3.20-slim@sha256:60cb9a93aeae7179b14f1b7791c6e3535799134ccfc167e9b7485e03a3854209

COPY stats-api-nginx.conf /etc/nginx/conf.d/default.conf
# The stats.json file should be provided in a volume, as /data/stats.json.

EXPOSE 8080
