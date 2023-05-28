const blogContainer = document.getElementById('blogContainer');
const loadMoreButton = document.getElementById('loadMoreButton');
let page = 1;
const perPage = 9;

async function fetchBlogPosts() {
  try {
    const response = await fetch(`https://www.melsom-development.no/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}`);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

function renderBlogPosts(posts) {
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('blogPost');
      const featuredMedia = post.featured_media;
  
      fetch(`https://www.melsom-development.no/wp-json/wp/v2/media/${featuredMedia}`)
        .then((response) => response.json())
        .then((media) => {
          const imageUrl = media.source_url;
  
          const blogLink = document.createElement('a');
          blogLink.href = `blogSpecific.html?id=${post.id}`;
          blogLink.classList.add('blogLink');
  
          const blogImage = document.createElement('div');
          blogImage.classList.add('blogImage');
          blogImage.style.backgroundImage = `url(${imageUrl})`;
  
          const blogTitle = document.createElement('h3');
          blogTitle.classList.add('blogTitle');
          blogTitle.textContent = post.title.rendered;
  
          blogLink.appendChild(blogImage);
          blogLink.appendChild(blogTitle);

          postElement.appendChild(blogLink);
          blogContainer.appendChild(postElement);
        })
        .catch((error) => {
          console.error('Error fetching featured media:', error);
        });
    });
  }
  

async function loadMorePosts() {
  page++;
  try {
    const posts = await fetchBlogPosts();
    renderBlogPosts(posts);
    if (posts.length < perPage) {
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error loading more posts:', error);
  }
}

loadMoreButton.addEventListener('click', loadMorePosts);

fetchBlogPosts().then(renderBlogPosts);
