const { logger } = require('./../util/logger')
const db         = require('../db');
const queries    = require('./../queries');

// checks if the probe is legitimate
const _pukka = async (req, id) => {
  console.log(queries.meassurement.pukka);
  const p = await db.query(queries.meassurement.pukka,[req.body.auth_id, id]);
  if (p.rows.length == 0) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}

const _checkContent = (req) => {
  if (typeof req.body.auth_id === 'undefined' || req.body.auth_id === null) {
    return false;
  } else {
    return true;
  }
}

const legitimate = async (req) => {
  try {
    const { id } = req.params;
    if (await !_checkContent(req)) {
      return Promise.resolve(false);
    } else {
      return await _pukka(req, id);
    }
  } catch (e) {
    logger.error(e);
  }
}

module.exports = {
  legitimate,
}
