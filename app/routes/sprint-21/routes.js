// Add your routes here - above the module.exports line

//**************
// SPRINT-21
//**************


module.exports = function (router) {

var version = "sprint-21"

// name
  router.post('/gp-registration/' + version + '/what-is-your-name-post/', function (req, res) {
    if (req.session.data['return'] === 'true') {
      res.redirect('/gp-registration/' + version + '/check-answers-1')
      req.session.data['return'] = ''
    } else {
      res.redirect('/gp-registration/' + version + '/what-is-your-date-of-birth')
    }
  })