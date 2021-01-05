const createRestoContainer = (title) => `
    <section class="content">
      <div id="maincontent">
        <h1 tabindex="0" class="maincontent__label">
          ${title}
        </h1>
        <div id="restaurants">
          ${createEmptyRestoItem(20)}
        </div>
        </div>
    </section>
  `;

const createStarRating = (rating) => {
  let star = ``;
  let icon;
  for (let i = 0; i<5; i++) {
    if (rating < 0.25) {
      icon = 'star_border';
    } else if (rating > 0.75) {
      icon = `star`;
    } else {
      icon = 'star_half';
    }
    star += `<i class="material-icons">${icon}</i>`;
    rating = rating - 1;
  }
  return star;
};

const createEmptyRestoItem = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
    <article class="resto-item">
        <img tabindex="0" class="resto-item__thumbnail"
             src="./images/placeholder.png"
             srcset="./images/placeholder-small.jpg 480w, 
                     ./images/placeholder-large.jpg 800w"
             sizes="(max-width: 600px) 480px, 800px"
             crossorigin="anonymous" 
             alt="restaurant_picture">
        <div class="resto-item__content">
            <h1 tabindex="0" class="resto-item__title">Restaurant</h1>
            <p tabindex="0" class="resto-item__city">City
            </p>
            <p tabindex="0" class="resto-item__description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              A adipisci alias aspernatur, assumenda aut consectetur 
              consequuntur debitis deleniti dicta dolorem dolorum 
              eos exercitationem labore laboriosam magni nihil, 
              nobis obcaecati optio perspiciatis placeat qui recusandae 
              saepe sapiente sequi totam ullam ut.
            </p>
            <p tabindex="0" id="rating">
                <i class="material-icons">star</i> 
                0.0
            </p>
        </div>
    </article>
  `;
  }
  return template;
};

const createRestoItem = (resto, imageUrl) => `
    <article class="resto-item">
        <img tabindex="0" 
             class="lazyload resto-item__thumbnail"
             data-src="${imageUrl}"
             crossorigin="anonymous"
             alt="${resto.name}">
        <div class="resto-item__content">
            <h1 tabindex="0" class="resto-item__title">
                <a href="${`#/detail/${resto.id}`}">
                    ${resto.name}
                </a>
            </h1>
            <p tabindex="0" class="resto-item__city">${resto.city}
            </p>
            <p tabindex="0" class="resto-item__description">
              ${resto.description}
            </p>
            <p tabindex="0" class="rating">
                <i class="material-icons">star</i> 
                ${resto.rating}
            </p>
        </div>
    </article>
    `;

const createMenuList = (items) => {
  let itemsHtml = ``;
  items.forEach((item) => {
    itemsHtml += `<li>${item.name}</li>`;
  });
  return itemsHtml;
};

const createCategories = (categories) => {
  let catHtml = ``;
  categories.forEach((cat) => {
    catHtml += `${cat.name}, `;
  });
  return catHtml;
};

const createReviewList = (reviews) => {
  let reviewsHtml = `<h2>Reviews! (${reviews.length})</h2>`;
  reviews.forEach((review) => {
    reviewsHtml += `
      <div class="review">
        <p> 
            <span class="review__name">${review.name}</span> -
            <span class="review__date">${review.date}</span>
        </p>
        <p class="review__content">${review.review}</p>
      </div>
    `;
  });
  return reviewsHtml;
};

const createDetailedResto = (resto, imageUrl) => `
    <h2 tabindex="0" class="resto-detail__name">
        ${resto.name}
    </h2>
    <p tabindex="0" class="resto-detail__city">
        ${resto.address}, ${resto.city}
    </p>
    <div class="resto-detail__content">
      <div class="resto-detail__overview">
        <img tabindex="0" 
            class="resto-detail__thumbnail" 
            src="${imageUrl}"
            crossorigin="anonymous" 
            alt="${resto.name}" />
        <h4>Categories: ${createCategories(resto.categories)}</h4>
        <h3 tabindex="0">Overview</h3>
        <p tabindex="0">${resto.description}</p>
        <p class="rating">
            ${createStarRating(resto.rating)}<br>
            Rating: ${resto.rating}
        </p>
      </div>
      <div tabindex="0" class="resto-detail__menu">
        <h3>Menus</h3>
        <h4>Foods:</h4>
        <ul>${createMenuList(resto.menus.foods)}</ul>
        <h4>Drinks:</h4>
        <li>${createMenuList(resto.menus.drinks)}</li>
      </div>
    </div>
    ${createReviewList(resto.customerReviews)}
`;

const createFavoriteButton = (isFavorite) => {
  let param;
  if (!isFavorite) {
    param = {label: 'like this restaurant', icon: 'heart-o'};
  } else {
    param = {label: 'unlike this restaurant', icon: 'heart'};
  }
  return `
    <button aria-label="${param.label}" id="likeButton" class="like">
     <i class="fa fa-${param.icon}" aria-hidden="true"></i>
  </button>`;
};

export {
  createEmptyRestoItem,
  createRestoItem,
  createRestoContainer,
  createDetailedResto,
  createFavoriteButton,
};
