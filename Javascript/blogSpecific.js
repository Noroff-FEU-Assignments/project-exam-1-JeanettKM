// Get the 'id' parameter from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

async function fetchBlogPost() {
  try {
    const response = await fetch(`https://www.melsom-development.no/wp-json/wp/v2/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }
    const post = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

async function renderBlogPost() {
  const blogTitle = document.getElementById('blogTitle');
  const blogContent = document.getElementById('blogContent');
  const blogImage = document.getElementById('blogImage');

  try {
    const post = await fetchBlogPost();
    document.title = `Jeanett's 5 minute break | ${post.title.rendered}`; // Update the page title
    blogTitle.textContent = post.title.rendered;
    blogContent.innerHTML = post.content.rendered;

    // Remove existing images from the blogContent container
    const imagesInContent = blogContent.getElementsByTagName('img');
    while (imagesInContent.length > 0) {
      imagesInContent[0].remove();
    }

    // Get the first image from the post content
    const images = post.content.rendered.match(/<img[^>]+>/);
    if (images) {
      const imageElement = document.createElement('div');
      imageElement.innerHTML = images[0];
      const image = imageElement.querySelector('img');
      const imageSrc = image.src;
      const clonedImage = image.cloneNode(true);
      blogImage.innerHTML = '';
      blogImage.appendChild(clonedImage);
      clonedImage.addEventListener('click', openModal);
    } else {
      blogImage.innerHTML = '';
    }
  } catch (error) {
    console.error('Error rendering blog post:', error);
  }
}

// Call the renderBlogPost function to display the blog post
renderBlogPost();
