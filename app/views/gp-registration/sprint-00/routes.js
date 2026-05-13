// Route for weight page in sprint-00
module.exports = function(router) {
  router.post('/gp-registration/sprint-00/weight', function(req, res) {
    // Redirect to the next page after weight
    res.redirect('do-you-smoke');
  });
};
