const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id');

async function fetchBlogPost() {
  try {
    const response = await fetch(`https://www.melsom-development.no/wp-json/wp/v2/posts/${postId}`);
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

  try {
    const post = await fetchBlogPost();
    document.title = `Jeanett's 5 minute break | ${post.title.rendered}`; // Update the page title
    blogTitle.textContent = post.title.rendered;
    blogContent.innerHTML = post.content.rendered;

    // Add event listeners for image modals
    const images = blogContent.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener('click', openModal);
    }
  } catch (error) {
    console.error('Error rendering blog post:', error);
  }
}

function closeModal(event) {
  event.target.remove();
}

renderBlogPost();
