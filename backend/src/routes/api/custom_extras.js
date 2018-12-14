// Template file for api route
var router = require('express').Router();
var getDb = require('../../pg-db').getDb;
var db = getDb();

router.route('/').get((req, res) => {
    db.any("select recipe_description as name, extra_type, case when pre_ambari_start is not null then 'Pre Ambari Start' when post_ambari_start is not null then 'Post Ambari Start' when post_cluster_install is not null then 'Post Cluster Install' else 'Pre Termination' end as recipe_type, case when pre_ambari_start is not null then pre_ambari_start when post_ambari_start is not null then post_ambari_start when post_cluster_install is not null then post_cluster_install else on_termination end as code from cloudbreak_cuisine.components_recipes where extra_type != 'Standard'")
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
});

module.exports = router;