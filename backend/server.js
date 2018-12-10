import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Recipe from './models/Recipe'

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

var pgp = require('pg-promise')({});
var db = pgp('postgres://postgres:pg_pass123!@db:5432/postgres');
var request = require('request');
    

const connection = mongoose.connection;

function connectWithRetry(url) {
    mongoose.connect(url).then(
        () => { connection.once('open', () => {
                    console.log('MongoDB database connection to ' + url + ' established successfully!');
                });},
        err => { 
            console.log('Could not connect to ' + url + ' - Retrying in 5 seconds.');
            setTimeout(connectWithRetry.bind(null, url), 5000);
        }
    );        
};

connectWithRetry('mongodb://mongo/recipes');

router.route('/cluster').get((req,res) => {
    db.any('select * from cloudbreak_cuisine.clusters')
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/cluster/:id').get((req,res) => {
    db.any('select * from cloudbreak_cuisine.clusters where id = ' + req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});


router.get('/load_blueprint/:cb_url/:cluster_name/:bp_base64/:token', function(req, res){ 

    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

    var request = require("request");

var options = { method: 'POST',
  url: 'https://'+req.params.cb_url+'/cb/api/v1/blueprints/user',
  headers: 
   { 'cache-control': 'no-cache',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImxlZ2FjeS10b2tlbi1rZXkiLCJ0eXAiOiJKV1QifQ.eyJqdGkiOiI4OTRiMTZjNDU2NjI0ZjRmYTY5ZDY0ZDY1MTVlYWIzMiIsInN1YiI6ImFiZTVkYjA4LWI2OWMtNDQ5OC1hYTFiLTg1YzQ5OWMyYTk1YyIsInNjb3BlIjpbImNsb3VkYnJlYWsubmV0d29ya3MucmVhZCIsInBlcmlzY29wZS5jbHVzdGVyIiwiY2xvdWRicmVhay51c2FnZXMudXNlciIsImNsb3VkYnJlYWsucmVjaXBlcyIsImNsb3VkYnJlYWsudXNhZ2VzLmdsb2JhbCIsIm9wZW5pZCIsImNsb3VkYnJlYWsucGxhdGZvcm1zIiwiY2xvdWRicmVhay50ZW1wbGF0ZXMucmVhZCIsImNsb3VkYnJlYWsudXNhZ2VzLmFjY291bnQiLCJjbG91ZGJyZWFrLnN0YWNrcy5yZWFkIiwiY2xvdWRicmVhay5ldmVudHMiLCJjbG91ZGJyZWFrLmJsdWVwcmludHMiLCJjbG91ZGJyZWFrLm5ldHdvcmtzIiwiY2xvdWRicmVhay50ZW1wbGF0ZXMiLCJjbG91ZGJyZWFrLnNzc2Rjb25maWdzIiwiY2xvdWRicmVhay5wbGF0Zm9ybXMucmVhZCIsImNsb3VkYnJlYWsuY3JlZGVudGlhbHMucmVhZCIsImNsb3VkYnJlYWsuc2VjdXJpdHlncm91cHMucmVhZCIsImNsb3VkYnJlYWsuc2VjdXJpdHlncm91cHMiLCJjbG91ZGJyZWFrLnN0YWNrcyIsImNsb3VkYnJlYWsuY3JlZGVudGlhbHMiLCJjbG91ZGJyZWFrLnJlY2lwZXMucmVhZCIsImNsb3VkYnJlYWsuc3NzZGNvbmZpZ3MucmVhZCIsImNsb3VkYnJlYWsuYmx1ZXByaW50cy5yZWFkIl0sImNsaWVudF9pZCI6ImNsb3VkYnJlYWtfc2hlbGwiLCJjaWQiOiJjbG91ZGJyZWFrX3NoZWxsIiwiYXpwIjoiY2xvdWRicmVha19zaGVsbCIsInVzZXJfaWQiOiJhYmU1ZGIwOC1iNjljLTQ0OTgtYWExYi04NWM0OTljMmE5NWMiLCJvcmlnaW4iOiJ1YWEiLCJ1c2VyX25hbWUiOiJwdmlkYWxAaG9ydG9ud29ya3MuY29tIiwiZW1haWwiOiJwdmlkYWxAaG9ydG9ud29ya3MuY29tIiwiYXV0aF90aW1lIjoxNTQ0NDUyNDcyLCJyZXZfc2lnIjoiNmUzNWNmOTkiLCJpYXQiOjE1NDQ0NTI0NzIsImV4cCI6MTU0NDQ5NTY3MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3VhYS9vYXV0aC90b2tlbiIsInppZCI6InVhYSIsImF1ZCI6WyJjbG91ZGJyZWFrX3NoZWxsIiwiY2xvdWRicmVhay5yZWNpcGVzIiwib3BlbmlkIiwiY2xvdWRicmVhayIsImNsb3VkYnJlYWsucGxhdGZvcm1zIiwiY2xvdWRicmVhay5ibHVlcHJpbnRzIiwiY2xvdWRicmVhay50ZW1wbGF0ZXMiLCJjbG91ZGJyZWFrLm5ldHdvcmtzIiwicGVyaXNjb3BlIiwiY2xvdWRicmVhay5zc3NkY29uZmlncyIsImNsb3VkYnJlYWsudXNhZ2VzIiwiY2xvdWRicmVhay5zZWN1cml0eWdyb3VwcyIsImNsb3VkYnJlYWsuc3RhY2tzIiwiY2xvdWRicmVhay5jcmVkZW50aWFscyJdfQ.9tntG4okV7tg0br8ve555jn6zcc-YgHCLT2c3Um3y9s',
     'Content-Type': 'application/json' },
  body: 
   { ambariBlueprint: 'CnsKICAiY29uZmlndXJhdGlvbnMiOiBbCiAgICB7CiAgICAgICJ5YXJuLXNpdGUiOiB7CiAgICAgICAgInByb3BlcnRpZXMiOiB7CiAgICAgICAgICAieWFybi5ub2RlbWFuYWdlci5yZXNvdXJjZS5jcHUtdmNvcmVzIjogIjYiLAogICAgICAgICAgInlhcm4ubm9kZW1hbmFnZXIucmVzb3VyY2UubWVtb3J5LW1iIjogIjIzMjk2IiwKICAgICAgICAgICJ5YXJuLnNjaGVkdWxlci5tYXhpbXVtLWFsbG9jYXRpb24tbWIiOiAiMjMyOTYiCiAgICAgICAgfQogICAgICB9CiAgICB9LAogICAgewogICAgICAiY29yZS1zaXRlIjogewogICAgICAgICJwcm9wZXJ0aWVzX2F0dHJpYnV0ZXMiOiB7fSwKICAgICAgICAicHJvcGVydGllcyI6IHsKICAgICAgICAgICJmcy5zM2EudGhyZWFkcy5tYXgiOiAiMTAwMCIsCiAgICAgICAgICAiZnMuczNhLnRocmVhZHMuY29yZSI6ICI1MDAiLAogICAgICAgICAgImZzLnMzYS5tYXgudG90YWwudGFza3MiOiAiMTAwMCIsCiAgICAgICAgICAiZnMuczNhLmNvbm5lY3Rpb24ubWF4aW11bSI6ICIxNTAwIgogICAgICAgIH0KICAgICAgfQogICAgfSwKICAgIHsKICAgICAgImNhcGFjaXR5LXNjaGVkdWxlciI6IHsKICAgICAgICAicHJvcGVydGllcyI6IHsKICAgICAgICAgICJ5YXJuLnNjaGVkdWxlci5jYXBhY2l0eS5yb290LnF1ZXVlcyI6ICJkZWZhdWx0IiwKICAgICAgICAgICJ5YXJuLnNjaGVkdWxlci5jYXBhY2l0eS5yb290LmNhcGFjaXR5IjogIjEwMCIsCiAgICAgICAgICAieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5tYXhpbXVtLWNhcGFjaXR5IjogIjEwMCIsCiAgICAgICAgICAieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5kZWZhdWx0LmNhcGFjaXR5IjogIjEwMCIsCiAgICAgICAgICAieWFybi5zY2hlZHVsZXIuY2FwYWNpdHkucm9vdC5kZWZhdWx0Lm1heGltdW0tY2FwYWNpdHkiOiAiMTAwIgogICAgICAgIH0KICAgICAgfQogICAgfSwKICAgIHsKICAgICAgInNwYXJrMi1kZWZhdWx0cyI6IHsKICAgICAgICAicHJvcGVydGllc19hdHRyaWJ1dGVzIjoge30sCiAgICAgICAgInByb3BlcnRpZXMiOiB7CiAgICAgICAgICAic3Bhcmsuc3FsLmhpdmUuaGl2ZXNlcnZlcjIuamRiYy51cmwiOiAiamRiYzpoaXZlMjovLyVIT1NUR1JPVVA6Om1hc3RlciU6MjE4MS87c2VydmljZURpc2NvdmVyeU1vZGU9em9vS2VlcGVyO3pvb0tlZXBlck5hbWVzcGFjZT1oaXZlc2VydmVyMiIsCiAgICAgICAgICAic3Bhcmsuc3FsLmhpdmUuaGl2ZXNlcnZlcjIuamRiYy51cmwucHJpbmNpcGFsIjogImhpdmUvX0hPU1RARUMyLklOVEVSTkFMIiwKICAgICAgICAgICJzcGFyay5kYXRhc291cmNlLmhpdmUud2FyZWhvdXNlLm1ldGFzdG9yZVVyaSI6ICJ0aHJpZnQ6Ly8lSE9TVEdST1VQOjptYXN0ZXIlOjkwODMiLAogICAgICAgICAgInNwYXJrLmRhdGFzb3VyY2UuaGl2ZS53YXJlaG91c2UubG9hZC5zdGFnaW5nLmRpciI6ICIvdG1wIiwKICAgICAgICAgICJzcGFyay5oYWRvb3AuaGl2ZS56b29rZWVwZXIucXVvcnVtIjogIiVIT1NUR1JPVVA6Om1hc3RlciU6MjE4MSIKICAgICAgICB9CiAgICAgIH0KICAgIH0sCiAgICB7CiAgICAgICJyYW5nZXItaGl2ZS1hdWRpdCI6IHsKICAgICAgICAicHJvcGVydGllc19hdHRyaWJ1dGVzIjoge30sCiAgICAgICAgInByb3BlcnRpZXMiOiB7CiAgICAgICAgICAieGFzZWN1cmUuYXVkaXQuZGVzdGluYXRpb24uaGRmcy5maWxlLnJvbGxvdmVyLnNlYyI6ICI2MDAiCiAgICAgICAgfQogICAgICB9CiAgICB9LAogICAgewogICAgICAiaGl2ZS1pbnRlcmFjdGl2ZS1lbnYiOiB7CiAgICAgICAgImVuYWJsZV9oaXZlX2ludGVyYWN0aXZlIjogImZhbHNlIiwKICAgICAgICAiaGl2ZV9zZWN1cml0eV9hdXRob3JpemF0aW9uIjogIlJhbmdlciIKICAgICAgfQogICAgfSwKICAgIHsKICAgICAgImhpdmUtaW50ZXJhY3RpdmUtc2l0ZSI6IHsKICAgICAgICAiaGl2ZS5leGVjLm9yYy5zcGxpdC5zdHJhdGVneSI6ICJCSSIsCiAgICAgICAgImhpdmUuc3RhdHMuZmV0Y2guYml0dmVjdG9yIjogInRydWUiLAogICAgICAgICJoaXZlLm1ldGFzdG9yZS5yYXdzdG9yZS5pbXBsIjogIm9yZy5hcGFjaGUuaGFkb29wLmhpdmUubWV0YXN0b3JlLmNhY2hlLkNhY2hlZFN0b3JlIgogICAgICB9CiAgICB9LAogICAgewogICAgICAiaGl2ZS1zaXRlIjogewogICAgICAJImhpdmUubWV0YXN0b3JlLndhcmVob3VzZS5kaXIiOiAiL2FwcHMvaGl2ZS93YXJlaG91c2UiLAogICAgICAgICJoaXZlLmV4ZWMuY29tcHJlc3Mub3V0cHV0IjogInRydWUiLAogICAgICAgICJoaXZlLm1lcmdlLm1hcGZpbGVzIjogInRydWUiLAogICAgICAgICJoaXZlLnNlcnZlcjIudGV6LmluaXRpYWxpemUuZGVmYXVsdC5zZXNzaW9ucyI6ICJ0cnVlIiwKICAgICAgICAiaGl2ZS5zZXJ2ZXIyLnRyYW5zcG9ydC5tb2RlIjogImh0dHAiLAogICAgICAgICJoaXZlLm1ldGFzdG9yZS5kbG0uZXZlbnRzIjogInRydWUiLAogICAgICAgICJoaXZlLm1ldGFzdG9yZS50cmFuc2FjdGlvbmFsLmV2ZW50Lmxpc3RlbmVycyI6ICJvcmcuYXBhY2hlLmhpdmUuaGNhdGFsb2cubGlzdGVuZXIuRGJOb3RpZmljYXRpb25MaXN0ZW5lciIsCiAgICAgICAgImhpdmUucmVwbC5jbS5lbmFibGVkIjogInRydWUiLAogICAgICAgICJoaXZlLnJlcGwuY21yb290ZGlyIjogIi9hcHBzL2hpdmUvY21yb290IiwKICAgICAgICAiaGl2ZS5yZXBsLnJvb3RkaXIiOiAiL2FwcHMvaGl2ZS9yZXBsIgogICAgICB9CiAgICB9LAogICAgewogICAgICAicmFuZ2VyLWFkbWluLXNpdGUiOiB7CiAgICAgICAgInByb3BlcnRpZXNfYXR0cmlidXRlcyI6IHt9LAogICAgICAgICJwcm9wZXJ0aWVzIjogewogICAgICAgICAgInJhbmdlci5qcGEuamRiYy51cmwiOiAiamRiYzpwb3N0Z3Jlc3FsOi8vbG9jYWxob3N0OjU0MzIvcmFuZ2VyIgogICAgICAgIH0KICAgICAgfQogICAgfSwKICAgIHsKICAgICAgInJhbmdlci1lbnYiOiB7CiAgICAgICAgInByb3BlcnRpZXNfYXR0cmlidXRlcyI6IHt9LAogICAgICAgICJwcm9wZXJ0aWVzIjogewogICAgICAgICAgInhhc2VjdXJlLmF1ZGl0LmRlc3RpbmF0aW9uLmhkZnMuZGlyIjogIi9hcHBzL3Jhbmdlci9hdWRpdCIsCiAgICAgICAgICAicmFuZ2VyX2FkbWluX3Bhc3N3b3JkIjogInt7eyBnZW5lcmFsLnBhc3N3b3JkIH19fSIsCiAgICAgICAgICAia2V5YWRtaW5fdXNlcl9wYXNzd29yZCI6ICJ7e3sgZ2VuZXJhbC5wYXNzd29yZCB9fX0iLAogICAgICAgICAgInJhbmdlcnRhZ3N5bmNfdXNlcl9wYXNzd29yZCI6ICJ7e3sgZ2VuZXJhbC5wYXNzd29yZCB9fX0iLAogICAgICAgICAgInJhbmdlcnVzZXJzeW5jX3VzZXJfcGFzc3dvcmQiOiAie3t7IGdlbmVyYWwucGFzc3dvcmQgfX19IiwKICAgICAgICAgICJpc19zb2xyQ2xvdWRfZW5hYmxlZCI6ICJ0cnVlIiwKICAgICAgICAgICJyYW5nZXItaGRmcy1wbHVnaW4tZW5hYmxlZCI6ICJZZXMiLAogICAgICAgICAgInJhbmdlci1oaXZlLXBsdWdpbi1lbmFibGVkIjogIlllcyIsCiAgICAgICAgICAicmFuZ2VyLWF0bGFzLXBsdWdpbi1lbmFibGVkIjogIk5vIiwKICAgICAgICAgICJyYW5nZXIta25veC1wbHVnaW4tZW5hYmxlZCI6ICJZZXMiCiAgICAgICAgfQogICAgICB9CiAgICB9LAogICAgewogICAgICAiaGRmcy1zaXRlIjogewogICAgICAgICJwcm9wZXJ0aWVzX2F0dHJpYnV0ZXMiOiB7fSwKICAgICAgICAicHJvcGVydGllcyI6IHsKICAgICAgICB9CiAgICAgIH0KICAgIH0KICBdLAogICJob3N0X2dyb3VwcyI6IFsKICAgIHsKICAgICAgIm5hbWUiOiAibWFzdGVyIiwKICAgICAgImNhcmRpbmFsaXR5IjogIjEiLAogICAgICAiY29tcG9uZW50cyI6IFsKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJSQU5HRVJfVEFHU1lOQyIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIlJBTkdFUl9VU0VSU1lOQyIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIlJBTkdFUl9BRE1JTiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIklORlJBX1NPTFIiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJaT09LRUVQRVJfU0VSVkVSIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIm5hbWUiOiAiTkFNRU5PREUiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJTRUNPTkRBUllfTkFNRU5PREUiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJSRVNPVVJDRU1BTkFHRVIiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJISVNUT1JZU0VSVkVSIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIm5hbWUiOiAiQVBQX1RJTUVMSU5FX1NFUlZFUiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIkxJVlkyX1NFUlZFUiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIlNQQVJLMl9DTElFTlQiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJTUEFSSzJfSk9CSElTVE9SWVNFUlZFUiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIlpFUFBFTElOX01BU1RFUiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIk1FVFJJQ1NfR1JBRkFOQSIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIk1FVFJJQ1NfTU9OSVRPUiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIkRBVEFOT0RFIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIm5hbWUiOiAiSElWRV9TRVJWRVIiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJISVZFX01FVEFTVE9SRSIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIkhJVkVfQ0xJRU5UIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIm5hbWUiOiAiWUFSTl9DTElFTlQiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJIREZTX0NMSUVOVCIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIlpPT0tFRVBFUl9DTElFTlQiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJURVpfQ0xJRU5UIgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgIm5hbWUiOiAiSU5GUkFfU09MUl9DTElFTlQiCiAgICAgICAgfSwKICAgICAgICB7CiAgICAgICAgICAibmFtZSI6ICJOT0RFTUFOQUdFUiIKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgICJuYW1lIjogIk1BUFJFRFVDRTJfQ0xJRU5UIgogICAgICAgIH0KICAgICAgXQogICAgfQoKICBdLAogICJCbHVlcHJpbnRzIjogewogICAgImJsdWVwcmludF9uYW1lIjogImRhdGEtc2NpZW5jZS13b3Jrc2hvcCIsCiAgICAic3RhY2tfbmFtZSI6ICJIRFAiLAogICAgInN0YWNrX3ZlcnNpb24iOiAiMy4wIgogIH0KfQ==',
     description: 'Blueprint for ' + req.params.cluster_name,
     inputs: [],
     tags: {},
     name: ''+req.params.cluster_name,
     hostGroupCount: 1,
     status: 'USER_MANAGED',
     public: true },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  res.send(body)
});

})


router.route('/services').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services')
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/services/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' order by mandatory, service_description')
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/services/:id/mandatory').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.services where associated_cluster = ' + req.params.id + ' and mandatory = 1')
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/components_blueprints').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints')
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/components_blueprints/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints where id = ' + req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/components_blueprints/service/:id').get((req, res) => {
    db.any('select * from cloudbreak_cuisine.components_blueprints where service_id = ' + req.params.id)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.log('ERROR:', error)
    })
});

router.route('/recipes').get((req, res) => {
    Recipe.find((err, recipes) => {
        if (err)
            console.log(err);
        else
            res.json(recipes);
    });
});

router.route('/recipes/:id').get((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (err)
            console.log(err);
        else
            res.json(recipe);
    })
});

router.route('/recipes/add').post((req, res) => {
    let recipe = new Recipe(req.body);
    recipe.save()
        .then(recipe => {
            res.status(200).json({'recipe': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new recipe');
        });
});

router.route('/recipes/update/:id').post((req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if (!recipe)
            return next(new Error('Could not load Document'));
        else {
            recipe.name = req.body.name;
            recipe.description = req.body.description;
            recipe.code = req.body.code;
            recipe.save().then(recipe => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/recipes/delete/:id').get((req, res) => {
    Recipe.findByIdAndRemove({_id: req.params.id}, (err, recipe) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));