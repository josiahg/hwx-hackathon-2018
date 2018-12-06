echo '' >  /var/lib/pgsql/9.6/data/pg_hba.conf
echo 'local all druid           trust		' >> /var/lib/pgsql/9.6/data/pg_hba.conf
echo 'host  all druid 0.0.0.0/0 trust		' >> /var/lib/pgsql/9.6/data/pg_hba.conf
echo 'host  all druid ::/0      trust		' >> /var/lib/pgsql/9.6/data/pg_hba.conf

systemctl restart postgresql-9.6.service

if [[ $(cat /etc/system-release|grep -Po Amazon) == "Amazon" ]]; then       		
	echo '' >  /var/lib/pgsql/9.5/data/pg_hba.conf
	echo 'local all druid           trust		' >> /var/lib/pgsql/9.5/data/pg_hba.conf
	echo 'host  all druid 0.0.0.0/0 trust		' >> /var/lib/pgsql/9.5/data/pg_hba.conf
	echo 'host  all druid ::/0      trust		' >> /var/lib/pgsql/9.5/data/pg_hba.conf
	
	sudo -u postgres /usr/pgsql-9.5/bin/pg_ctl -D /var/lib/pgsql/9.5/data/ reload
else
	echo '' >  /var/lib/pgsql/data/pg_hba.conf
	echo 'local all druid           trust		' >> /var/lib/pgsql/data/pg_hba.conf
	echo 'host  all druid 0.0.0.0/0 trust		' >> /var/lib/pgsql/data/pg_hba.conf
	echo 'host  all druid ::/0      trust		' >> /var/lib/pgsql/data/pg_hba.conf
	
	sudo -u postgres pg_ctl -D /var/lib/pgsql/data/ reload
fi