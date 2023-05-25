async function fetchBlogPosts() {
  try {
    const response = await fetch('https://www.melsom-development.no/wp-json/wp/v2/posts');
    const posts = await response.json();

    const postPromises = posts.map(async (post) => {
      if (post.featured_media) {
        const mediaResponse = await fetch(`https://www.melsom-development.no/wp-json/wp/v2/media/${post.featured_media}`);
        const media = await mediaResponse.json();
        const imageUrl = media.source_url;
        return { id: post.id, title: post.title.rendered, image: imageUrl };
      } else {
        return { id: post.id, title: post.title.rendered, image: '' };
      }
    });

    return Promise.all(postPromises);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

async function renderCarousel() {
  const slidesContainer = document.querySelector('.slides');
  slidesContainer.innerHTML = '';

  try {
    const posts = await fetchBlogPosts();
    const carouselSize = Math.ceil(posts.length / 4) * 4;

    for (let i = 0; i < carouselSize; i++) {
      const slide = document.createElement('div');
      slide.classList.add('slide');

      if (i < posts.length) {
        const post = posts[i];
        slide.innerHTML = `
          <a href="/html/blogspecific.html?id=${post.id}">
            <img src="${post.image}" alt="Post Image">
            <h3>${post.title}</h3>
          </a>`;
      }

      slidesContainer.appendChild(slide);
    }
  } catch (error) {
    console.error('Error rendering carousel:', error);
  }
}

  
  // Handle navigation
  function handleNavigation(direction) {
    const slidesContainer = document.querySelector('.slides');
    const slideWidth = slidesContainer.querySelector('.slide').offsetWidth;
  
    const currentPosition = slidesContainer.scrollLeft;
    let newPosition;
  
    if (direction === 'prev') {
      newPosition = currentPosition - slideWidth * 4;
      if (newPosition < 0) {
        newPosition = 0;
      }
    } else {
      newPosition = currentPosition + slideWidth * 4;
      if (newPosition > slidesContainer.scrollWidth - slidesContainer.offsetWidth) {
        newPosition = slidesContainer.scrollWidth - slidesContainer.offsetWidth;
      }
    }
  
    slidesContainer.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  }
  
  // Event listeners for navigation buttons
  const leftButton = document.querySelector('.leftButton');
  const rightButton = document.querySelector('.rightButton');
  
  leftButton.addEventListener('click', () => handleNavigation('prev'));
  rightButton.addEventListener('click', () => handleNavigation('next'));
  
  // Initial rendering of the carousel
  renderCarousel();
  