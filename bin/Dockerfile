# Set the base image to node
FROM node:7

MAINTAINER Max Campbell <maxc@maxc.in>

# copy npm permissions
COPY ./bin/.npmrc /root/.npmrc

# create cache layers for each library with dependencies
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
# rm from line above --production

# remove npm permissions
RUN rm -f /root/.npmrc

# import the rest
WORKDIR /app
ADD . /app

# create symlink
RUN if [ ! -L ./node_modules/_ ]; then cd node_modules && ln -s ../lib _ && cd ..; fi;

# Build app
RUN npm run build

# Expose port
EXPOSE 8080

# Run app using npm
CMD ["npm", "start"]
