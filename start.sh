#!/bin/sh
sed -i  "s|<body>|<body  envCrmHref=\"$CRM_HREF\"  envApiPrefix=\"$API_PREFIX\" envApiBaseUrl=\"$BASE_URL\" envHostName=\"$HOSTNAME\" env=\"$ENV\">|"  /usr/share/nginx/html/index.html
nginx -g "daemon off;"