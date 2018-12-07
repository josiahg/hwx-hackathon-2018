# Cloudbreak Cuisine v0.1
<div align="center">
<img src="https://github.com/josiahg/hwx-hackathon-2018/blob/master/CLOUBREAK_CUISINE_LOGO.png" width="500" height="500" align="middle">
</div>

# Overview

Cloudbreak Cuisine is a self contained application allowing easier use of Hortonworks Cloudbreak, by offering the following functionalities:
- [x] Choose from a Library Of Pre-Built Blueprints & Recipes combinations (a.k.a. Bundles)
- [x] Generate your own Bundles
- [ ] Deploy your Bundles

# Installation 

## Create A Local Storage Location for Mongo
``` bash
mkdir /data/db
```

**_Note:_** If using a different storage location, update docker-compose.yml

## Add Local Storage Location To Docker File Sharing

```
Docker -> Preferences -> File Sharing
```

## Clone this repo
``` bash
git clone https://github.com/josiahg/hwx-hackathon-2018.git
cd hwx-hackathon-2018
```

## Launch in Docker
``` bash
docker-compose up
```

## Have Fun!

Open a browser to [<http://localhost:3000/>](http://localhost:3000/)


# Authors

* **Josiah Goodson** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/josiahgoodson/)
* **Paul Vidal** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/paulvid/)