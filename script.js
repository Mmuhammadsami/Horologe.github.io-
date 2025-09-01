// Change this to your PC's IPv4 address from ipconfig
const SERVER_URL = "http://192.168.18.127:3000/ask";  
 

async function sendMessage() {
  const userInput = document.getElementById("userInput");
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  userInput.value = "";

  try {
    const response = await fetch("http://192.168.18.127:3000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
  } catch (err) {
    console.error("⚠️ Error:", err);
    addMessage("⚠️ Could not connect to AI server.", "bot");
  }
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chatBox");
  const messageDiv = document.createElement("div");
  messageDiv.className = sender;
  messageDiv.textContent = (sender === "user" ? "You: " : "AI: ") + text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

  /* CART FUNCTIONS */
  let cart = [];

  function closeCart() {
    document.getElementById("cart").style.display = "none";
  }

  function addToCart(product, price, size) {
    if (!size) size = "N/A";
    cart.push({ product, price, size });
    document.getElementById("cart-count").innerText = cart.length;
    alert(`${product} added to cart.`);
  }

  function showCart() {
    const cartDiv = document.getElementById("cart");
    const itemsDiv = document.getElementById("cart-items");
    itemsDiv.innerHTML = "";

    if (cart.length === 0) {
      itemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        itemsDiv.innerHTML += `
        <p>
          ${item.product} (Size ${item.size}) - $${item.price}
          <button onclick="removeFromCart(${index})" style="margin-left:10px; background:red; color:white; border:none; border-radius:5px;">Remove</button>
        </p>`;
      });
    }
    cartDiv.style.display = "block";
  }

  function submitOrder() {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    if (!name || !address || !phone) {
      alert("Please fill in required details.");
      return;
    }
    document.getElementById("popupMsg").style.display = "block";
    document.getElementById("cart").style.display = "none";
    document.getElementById("cart-count").innerText = "0";
    cart = [];
  }

  function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById("cart-count").innerText = cart.length;
    showCart();
  }

  // Toggle chatbox visibility
const supportLogo = document.getElementById('support-logo');
const chatbox = document.getElementById('chatbox');

supportLogo.addEventListener('click', () => {
    chatbox.style.display = (chatbox.style.display === 'flex') ? 'none' : 'flex';
});

// Send message to AI server
async function sendMessage() {
    const userInputEl = document.getElementById("userInput");
    const chatBody = document.getElementById("chatbox-body");
    const userMessage = userInputEl.value.trim();

    if (!userMessage) return;

    // Add user's message
    chatBody.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
    userInputEl.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
        const response = await fetch("http://192.168.18.127:3000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        chatBody.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
    } catch (err) {
        chatBody.innerHTML += `<p style="color:red;"><b>AI:</b> Could not connect to server.</p>`;
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}


function showContact(event) {
    event.preventDefault();
    document.getElementById("contact-popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("contact-popup").style.display = "none";
}



 let currentWatch = "";

// Watches data
const watches = {
  "Rolex Diamond Ice": {
    img: "images/orient.jpg",
    desc: "A luxurious watch with diamond accents.",
    reviews: [
      { name: "Ali", text: "Bohat zabardast watch hai!" },
      { name: "Sara", text: "Design classy hai, worth it!" }
    ]
  },
  "Round Silver Chrono": {
    img: "images/Round silver chrono.jpg",
    desc: "Stylish silver chrono with premium design.",
    reviews: [
      { name: "Hamza", text: "Solid build quality." },
      { name: "Amna", text: "Looks very elegant!" }
    ]
  },
  "Fossil Nate": {
    img: "images/blue.jpg",
    desc: "Trendy Fossil Nate watch with modern design.",
    reviews: [
      { name: "Usman", text: "Budget friendly and stylish." }
    ]
  },
  "Dragon Cave": {
    img: "images/Dragon Cave.jpeg",
    desc: "Unique Dragon Cave edition watch with bold looks.",
    reviews: [
      { name: "Zara", text: "Really cool design, love it!" }
    ]
  },
  "Rolex Sky": {
    img: "images/rolex sky.jpg",
    desc: "Premium Rolex Sky edition with timeless design.",
    reviews: [
      { name: "Bilal", text: "Classic look, worth every penny." }
    ]
  }
};

// Open Popup
function openWatchPopup(title) {
  currentWatch = title;
  const watch = watches[title];

  if (!watch) {
    alert("Watch data not found!");
    return;
  }

  // Set content
  document.getElementById("watch-title").innerText = title;
  document.getElementById("watch-image").src = watch.img;
  document.getElementById("watch-description").innerText = watch.desc;

  // Render reviews
  renderReviews(watch.reviews);

  // Show popup
  document.getElementById("watch-popup").style.display = "flex";
}

// Render Customer Reviews
function renderReviews(reviews) {
  const reviewsDiv = document.getElementById("watch-reviews-list");
  reviewsDiv.innerHTML = "";
  reviews.forEach(r => {
    const li = document.createElement("li");
    li.classList.add("review-item");
    li.innerHTML = `<span>${r.name}</span><p>${r.text}</p>`;
    reviewsDiv.appendChild(li);
  });
}

// Add New Review
function addReview() {
  const name = document.getElementById("reviewer-name").value.trim();
  const text = document.getElementById("review-text").value.trim();

  if (name && text) {
    watches[currentWatch].reviews.push({ name, text });
    renderReviews(watches[currentWatch].reviews);

    // Clear inputs
    document.getElementById("reviewer-name").value = "";
    document.getElementById("review-text").value = "";
  } else {
    alert("Please enter your name and review.");
  }
}

// Close Popup
function closeWatchPopup() {
  document.getElementById("watch-popup").style.display = "none";
}

