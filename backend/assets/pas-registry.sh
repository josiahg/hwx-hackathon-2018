mysql --execute="CREATE DATABASE registry DEFAULT CHARACTER SET utf8"
mysql --execute="GRANT ALL PRIVILEGES ON *.* TO 'registry'@'localhost'"
mysql --execute="GRANT ALL PRIVILEGES ON *.* TO 'registry'@'%'"
mysql --execute="GRANT ALL PRIVILEGES ON *.* TO 'registry'@'localhost' WITH GRANT OPTION"
mysql --execute="GRANT ALL PRIVILEGES ON *.* TO 'registry'@'%' WITH GRANT OPTION"
mysql --execute="FLUSH PRIVILEGES"
mysql --execute="COMMIT"