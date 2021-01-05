/* eslint-disable new-cap */
const assert = require('assert');

Feature('Disliking Restaurant');

Before(async ({I}) => {
  I.amOnPage('/#/favorites');
  I.see('No restaurant listed', '.resto__empty');

  I.amOnPage('/');
  I.seeElement('.resto-item__title a');

  const firstResto = locate('.resto-item__title a').first();
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');
});

Scenario('showing at least one liked restaurant', ({I}) => {
  I.amOnPage('/#/favorites');
  I.dontSee('No restaurant listed', '#restaurants');
});

Scenario('disliking one restaurant', async ({I}) => {
  I.amOnPage('/#/favorites');
  I.seeElement('.resto-item');
  I.seeElement('.resto-item__title a');

  const likedResto = locate('.resto-item__title a').first();
  I.click(likedResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.see('No restaurant listed', '.resto__empty');
});


