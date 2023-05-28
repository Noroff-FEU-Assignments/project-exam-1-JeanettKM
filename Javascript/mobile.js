const mobileViewContainer = document.querySelector('.mobileview');

fetch('https://www.melsom-development.no/wp-json/wp/v2/posts?per_page=12')
  .then(response => response.json())
  .then(posts => {
    posts.forEach(post => {
      const postCard = document.createElement('a');
      postCard.classList.add('postCard');
      postCard.href = 'html/blogspecific.html?id=' + post.id;

      fetch(`https://www.melsom-development.no/wp-json/wp/v2/media/${post.featured_media}`)
        .then(response => response.json())
        .then(media => {
          const featuredMedia = document.createElement('img');
          featuredMedia.src = media.source_url;
          featuredMedia.alt = media.alt_text;
          postCard.appendChild(featuredMedia);
        });

      const title = document.createElement('h2');
      title.textContent = post.title.rendered;
      postCard.appendChild(title);

      mobileViewContainer.appendChild(postCard);
    });
  })
  .catch(error => {
    console.log('Error fetching blog posts:', error);
  });
