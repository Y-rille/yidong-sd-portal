FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY dist dist/
COPY mock mock/
COPY app.json package.json
COPY app.js .
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al

EXPOSE 8765

CMD [ "pm2-runtime", "start", "pm2.json" ]