# build stage
FROM node:14.12.0 as build-stage

RUN apt-get update && apt-get install -y jq python

WORKDIR /app
RUN mkdir /app/build
COPY package.json .
RUN yarn install
COPY . .

RUN yarn build
RUN mv /app/dist /app/build/web

# Generate & Upload sourcemaps
# RUN chmod 755 upload-sourcemap.sh
# RUN ./upload-sourcemap.sh

# production stage
FROM nginx:1.16.0-alpine as production-stage

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx-conf/default.conf /etc/nginx/conf.d/
COPY nginx-conf/security.conf /etc/nginx/conf.d/

# Remove sourcemap from final image
RUN rm -rf /usr/share/nginx/html/web/js/*.map

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
