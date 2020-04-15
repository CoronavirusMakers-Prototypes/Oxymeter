const { logger } = require('./../util/logger')

class DataCache {
  constructor(fetchFunction, minutesToLive = 2) {
    this.millisecondsToLive = minutesToLive * 60 * 1000;
    this.fetchFunction = fetchFunction;
    this.cache = null;
    this.getData = this.getData.bind(this);
    this.resetCache = this.resetCache.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.fetchDate = new Date(0);
  }
  isCacheExpired() {
    return (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime();
  }
  getData() {
    if (!this.cache || this.isCacheExpired()) {
      logger.debug('expired - fetching new data');
      return this.fetchFunction()
        .then((data) => {
        this.cache = data;
        this.fetchDate = new Date();
        return data;
      });
    } else {
      logger.debug('cache hit');
      return Promise.resolve(this.cache);
    }
  }
  resetCache() {
   this.fetchDate = new Date(0);
  }
}