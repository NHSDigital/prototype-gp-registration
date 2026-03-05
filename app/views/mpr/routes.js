const express = require('express');
const router = express.Router();

router.use('/:sprint', (req, res, next) => {
  res.locals.basePath = `/mpr/${req.params.sprint}`;
  res.locals.sprint = req.params.sprint;
  next();
});

router.post('/:sprint/confirm-rejected', (req, res) => {
  const selected = req.body['reject-reason'] || '';
  const selectedLabel = typeof selected === 'string' ? selected.split('~')[0] : '';
  const hasRejectReasonInBody = typeof req.body['reject-reason'] === 'string';

  // Only clear free-text reason when the reject reason was explicitly posted
  // and it's not the "Other" option.
  if (hasRejectReasonInBody && selectedLabel !== 'Other') {
    delete req.session.data['reason-details'];
  }

  if (typeof selected === 'string' && selected.includes('~')) {
    const [, nextPath] = selected.split('~');
    const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
    return res.redirect(normalized);
  }

  return res.redirect(`/mpr/${req.params.sprint}/confirm-rejected`);
});

module.exports = router;
