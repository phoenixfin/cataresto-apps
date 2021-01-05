/* eslint-disable new-cap */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({I}) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty liked restaurants', ({I}) => {
  I.see('No restaurant listed', '.resto__empty');
});

Scenario('liking one restaurant', async ({I}) => {
  I.see('No restaurant listed', '.resto__empty');

  I.amOnPage('/');

  I.seeElement('.resto-item__title a');

  const firstResto = locate('.resto-item__title a').first();
  const firstRestoName = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.resto-item');
  const likedRestoTitle = await I.grabTextFrom('.resto-item__title');

  assert.strictEqual(likedRestoTitle, firstRestoName);
});


