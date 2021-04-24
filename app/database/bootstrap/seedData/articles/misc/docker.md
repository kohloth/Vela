# Information

## Concepts

```
image
A blueprint for a container. A dormant definition for a lightweight virtual machine.

container
A running instance of an image.

dockerfile
A declarative script that defines a custom container setup.
```

## Installation

```
sudo apt-get install docker
sudo usermod -a -G docker $USER
```

A log out / in may be required after adjusting docker user permissions.

## Commands

### General

`docker &lt;command&gt; --help`

Displays usage info for <command>

`docker network ls`

Lists all networks that have been created for the interoparation of docker containers.

### Images

`docker search lamp`

Searches the docker repo for containers that match the phrase "lamp".

`docker pull linode/lamp`

Downloads the docker image (from the docker hub) that is identified by the ID "linode/lamp", so that it becomes available for running. By default, the latest commited version is pulled, but a specific <strong>tag version</strong> can be specified with the syntax: `docker pull ubuntu:18.04` or `docker pull python:3-onbuild` for example.

`docker run linode/lamp`

Fires up an instance of the linode/lamp image. (A docker container). If the container does not exist locally, it will run the command `docker pull linode/lamp` first. Note that each call to `run` creates an entirely new instance from the image.

`docker run -it linode/lamp`

Fires up an instance of the linode/lamp image with the `--interactive` and `--tty` flags. This will keep the container running and attach a terminal to it.

`docker run --rm -d -P --name static-site prakhar1989/static-site`

Runs the image `prakhar1989/static-site`, fully removing the container once it stops (so it doesn't hang around in the list that is shown by `docker ps -a`. The flag `-d` runs the container in a way that is detatched from the terminal. The `-P` flag will ensure that all exposed ports are published to random ports on the host machine. You can also specify ports with the syntax: `-p &lt;host machine port&gt;:&lt;container port&gt;` i.e. `-p 8888:80`. `--name static-site` attaches an arbitrary name to the container, which can be used to refer to it in the future - i.e. when trying to kill the process, or view a list of ports.

`docker rmi &lt;image name&gt;`

Removes image from disk that matches the specified name.

### Containers

`docker exec -it linode/lamp /bin/bash`

Attaches a terminal to an already-running container. Note that this can also be used to run arbitrary commands.

`docker ps`

Shows a list of all running containers

`docker ps -a`

Shows a list of all containers, including those that were ran and then exited

`docker port static-site`

Lists all ports that are connected to the container that is identified by the string `static-site`.

`docker stop static-site`

Stops the running of the container that is identified by the string `static-site`.

`docker rm 305297d7a235 ff0a5c3750b9`

Deletes the containers that are identified by the ID 305297d7a235 or ff0a5c3750b9.

`docker rm $(docker ps -a -q -f status=exited)`

Deletes all containers that have exited.

`docker container prune`

Same as above.

### Building

`docker export &lt;containerID&gt; > /tmp/container.tar`

Saves a container to file, (as an image).

`cat /home/export.tar | sudo docker import - busybox-1-export:latest`

Imports the container to images.

`docker save &lt;imageName&gt; > /tmp/image.tar`

Saves an image to file.

`docker load &lt; /tmp/image.tar`

Imports image tar file into docker images.

`docker build -t &lt;tagname&gt; .`

Builds an image with an image of tagname, and looks for Dockerfile in . path.

`docker push dockerusername/imagename:tag`

Pushes image to dockerhub, where it will be available to the public. Docker images can be made private by also specifying the name of a (private) repo.</td>

### Docker compose

`docker-compose up`

Starts containers en-masse, as per configuration within docker-compose.yml file. A `-d` flag can be used to detach the process from the terminal.

`docker-compose down`

Stops containers en-masse. A `-v` flag can be supplied to destroy data volumes.

`docker-compose run linode/lamp &gt;command&lt;`

Running arbitrary commands via docker-compose.

# Creating custom images

## Info

Custom images are created with a `Dockerfile`. Sometimes a `docker-compose.yml` is also required. The latter is used to circumvent the need to write many termainal commands to get many containers running. We can then simply run `docker-compose`.

Note the differences between the following:

* `RUN`: An image build step. Run can be layered multiple times to build an image. Runs linux commands like apt-get and curl etc.
* `CMD`: The default command to run when an image starts up. Can only appear once in the Dockerfile. Can be overridden from the CLI with `docker run &lt;image&gt; &lt;supercedingCommand&gt;`
* `ENTRYPOINT`: Similar to `CMD`. `CMD` is the list of arguments that are fed to `ENTRYPOINT`. The invention of the latter gave devs greater control.

Making a repo private: From [docker documentation](https://docs.docker.com/docker-hub/repos/#private-repositories): You can name your local images either when you build it, using docker build -t <hub-user><repo-name><tag> by re-tagging an existing local image docker tag <existing-image> <hub-user><repo-name><tag> or by using docker commit <existing-container> <hub-user><repo-name><tag> to commit changes.

## Sample configs

### Simple LAMP stack

```
FROM php:7.2.1-apache
MAINTAINER egidio docile
RUN docker-php-ext-install pdo pdo_mysql mysqli
EXPOSE 1337
```

### Interconnected LAMP stack

#### docker-compose.yml

```
version: '3'
services:
  app:
	build:
	  context: .
	  dockerfile: .docker/php/DockerFile
	image: laravel-docker
	ports:
	  - 8080:80
	volumes:
	  - .:/var/www/html
	links:
	  - mysql
	  - redis
	environment:
	  DB_HOST: mysql
	  DB_DATABASE: laravel_docker
	  DB_USERNAME: app
	  DB_PASSWORD: password
	  REDIS_HOST: redis
	  SESSION_DRIVER: redis
	  CACHE_DRIVER: redis
  mysql:
	image: mysql:5.7
	ports:
	  - 13306:3306
	environment:
	  MYSQL_DATABASE: laravel_docker
	  MYSQL_USER: app
	  MYSQL_PASSWORD: password
	  MYSQL_ROOT_PASSWORD: password
  redis:
	image: redis:4.0-alpine
	ports:
	  - 16379:6379
```

#### DockerFile

```
FROM php:7.1.8-apache

COPY . /var/www/html
COPY .docker/php/vhost.conf /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

RUN docker-php-ext-install mbstring pdo pdo_mysql \
&& pecl install -o -f redis \
&&  rm -rf /tmp/pear \
&&  docker-php-ext-enable redis \
&& chown -R www-data:www-data /var/www/html \
&& a2enmod rewrite
```

#### vhost.conf

```
<VirtualHost *:80>
DocumentRoot /var/www/html/public

<Directory "/var/www/html/public">
AllowOverride all
Require all granted
</Directory>

ErrorLog ${APACHE_LOG_DIR}/error.log
CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

# Managed services

* Google Kubernetes Engine. The best.
* Amazon Elastic Container service for Kubernetes (EKS). Not quite as good as GKE.
* The rest: IBM, Heptio, Azure, Openshift...

# References

* [Cheat sheet](https://github.com/wsargent/docker-cheat-sheet)
* [Good simple tutorial](https://docker-curriculum.com)
* [Building a custom LAMP stack](https://medium.com/code-kings/docker-building-a-lamp-stack-9503c62d9214)
