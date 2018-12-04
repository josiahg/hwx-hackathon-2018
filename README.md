# hwx-hackathon-2018

# Running The Generator

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