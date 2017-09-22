FROM artprod.dev.bloomberg.com/webops/webops-nodejs:6.10

RUN useradd --user-group --create-home --shell /bin/false synusr

ARG version
ENV version=$version

RUN mkdir -p /var/www/syndication-admin
COPY . /var/www/syndication-admin

WORKDIR /var/www/syndication-admin/gui
RUN npm prune --production

WORKDIR /var/www/syndication-admin/server
RUN npm prune --production

# Open Ports
EXPOSE 8080

# Start Server
CMD NODE_PORT=8080 node start
