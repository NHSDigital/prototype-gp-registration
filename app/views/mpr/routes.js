const express = require('express');
const router = express.Router();

router.use('/:sprint', (req, res, next) => {
  res.locals.basePath = `/mpr/${req.params.sprint}`;
  res.locals.sprint = req.params.sprint;
  next();
});

router.post('/redmoor/patient-detail-new-residential-institute', (req, res) => {
  const answer = req.body['patient-in-nursing-or-care-home'];

  if (answer !== 'yes' && answer !== 'no') {
    return res.status(400).render('mpr/redmoor/patient-detail-new-residential-institute', {
      careHomeError: true
    });
  }

  return res.redirect('/mpr/redmoor/confirm-approved');
});

// Reject reasons routing
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

// On-hold reasons routing 
router.post('/:sprint/confirm-on-hold', (req, res) => {
  const selected = req.body['on-hold-reason'] || '';
  const selectedLabel = typeof selected === 'string' ? selected.split('~')[0] : '';
  const hasOnHoldReasonInBody = typeof req.body['on-hold-reason'] === 'string';

  // Only clear free-text reason when the on-hold reason was explicitly posted
  // and it's not the "Other" option.
  if (hasOnHoldReasonInBody && selectedLabel !== 'Other') {
    delete req.session.data['reason-details'];
  }

  if (typeof selected === 'string' && selected.includes('~')) {
    const [, nextPath] = selected.split('~');
    const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
    return res.redirect(normalized);
  }

  return res.redirect(`/mpr/${req.params.sprint}/confirm-on-hold`);
});

module.exports = router;
