/* ===== KindHeart Paws — shared logic ===== */

// ---- shared pet data ----
const SEED_PETS = [
  { id: 1, name: "Bruno", type: "Dog", breed: "Golden Retriever", age: "2 years", gender: "Male", price: 12000, tags: ["Vaccinated", "Friendly"], img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600" },
  { id: 2, name: "Milo", type: "Cat", breed: "British Shorthair", age: "1 year", gender: "Female", price: 8000, tags: ["Playful", "Sterilized"], img: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600" },
  { id: 3, name: "Coco", type: "Dog", breed: "Pomeranian", age: "8 months", gender: "Female", price: 0, tags: ["Free Adoption", "Vaccinated"], img: "https://images.unsplash.com/photo-1605568427561-40dd23c2f1b4?w=600" },
  { id: 4, name: "Kiwi", type: "Bird", breed: "Cockatiel", age: "1.5 years", gender: "Male", price: 3500, tags: ["Tamed"], img: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600" },
  { id: 5, name: "Luna", type: "Cat", breed: "Persian", age: "3 years", gender: "Female", price: 15000, tags: ["Sterilized", "Groomed"], img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600" },
  { id: 6, name: "Rocky", type: "Dog", breed: "Beagle", age: "2.5 years", gender: "Male", price: 10000, tags: ["Trained", "Vaccinated"], img: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600" },
  { id: 7, name: "Nemo", type: "Fish", breed: "Goldfish", age: "4 months", gender: "-", price: 500, tags: ["Aquarium-ready"], img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600" },
  { id: 8, name: "Thumper", type: "Rabbit", breed: "Holland Lop", age: "6 months", gender: "Male", price: 2500, tags: ["Friendly"], img: "https://images.unsplash.com/photo-1591561432341-144f1785b435?w=600" },
  { id: 9, name: "Bella", type: "Dog", breed: "Labrador", age: "1 year", gender: "Female", price: 9000, tags: ["Vaccinated", "Energetic"], img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600" },
  { id: 10, name: "Whiskers", type: "Cat", breed: "Maine Coon", age: "2 years", gender: "Male", price: 18000, tags: ["Gentle", "Sterilized"], img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600" },
  { id: 11, name: "Ziggy", type: "Bird", breed: "Parakeet", age: "8 months", gender: "Female", price: 2000, tags: ["Colorful", "Tamed"], img: "https://images.unsplash.com/photo-1564326576109-3d83b4a8c8f9?w=600" },
  { id: 12, name: "Shadow", type: "Dog", breed: "German Shepherd", age: "3 years", gender: "Male", price: 16000, tags: ["Trained", "Guard Dog"], img: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e5a?w=600" },
  { id: 13, name: "Pumpkin", type: "Rabbit", breed: "Mini Rex", age: "5 months", gender: "Female", price: 1800, tags: ["Cuddly"], img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b304?w=600" },
  { id: 14, name: "Angel", type: "Cat", breed: "Ragdoll", age: "1.5 years", gender: "Female", price: 22000, tags: ["Affectionate", "Vaccinated"], img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600" },
  { id: 15, name: "Max", type: "Dog", breed: "Pug", age: "1 year", gender: "Male", price: 7000, tags: ["Playful", "Vaccinated"], img: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600" },
  { id: 16, name: "Bubbles", type: "Fish", breed: "Betta", age: "3 months", gender: "Male", price: 800, tags: ["Aquarium-ready", "Colorful"], img: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600" }
];

// ---- auth helpers ----
function getUsers() { return JSON.parse(localStorage.getItem("ph_users") || "[]") }
function setUsers(u) { localStorage.setItem("ph_users", JSON.stringify(u)) }
function currentUser() { return JSON.parse(localStorage.getItem("ph_user") || "null") }
function setCurrentUser(u) { localStorage.setItem("ph_user", JSON.stringify(u)) }
function logout() { localStorage.removeItem("ph_user"); location.href = "index.html" }

// ---- dark mode ----
function isDark() { return localStorage.getItem("ph_dark") === "1" }
function applyTheme() { document.body.classList.toggle("dark", isDark()) }
function toggleTheme() { localStorage.setItem("ph_dark", isDark() ? "0" : "1"); applyTheme() }

// ---- pet storage ----
function getPets() {
  if (!localStorage.getItem("ph_pets")) localStorage.setItem("ph_pets", JSON.stringify(SEED_PETS));
  return JSON.parse(localStorage.getItem("ph_pets"));
}
function setPets(p) { localStorage.setItem("ph_pets", JSON.stringify(p)) }
function getWishlist() { return JSON.parse(localStorage.getItem("ph_wish") || "[]") }
function toggleWish(id) {
  let w = getWishlist(); const i = w.indexOf(id);
  if (i > -1) w.splice(i, 1); else w.push(id);
  localStorage.setItem("ph_wish", JSON.stringify(w));
}

// ---- cart ----
function getCart() { return JSON.parse(localStorage.getItem("ph_cart") || "[]") }
function setCart(c) { localStorage.setItem("ph_cart", JSON.stringify(c)); updateCartBadge() }
function addToCart(item) {
  let cart = getCart();
  if (cart.some(c => c.uid === item.uid)) { toast(item.name + " is already in your cart"); return }
  cart.push(item);
  setCart(cart);
  toast("✓ " + item.name + " added to cart");
  renderCart();
}
function removeFromCart(uid) {
  let cart = getCart().filter(c => c.uid !== uid);
  setCart(cart);
  renderCart();
}
function cartTotal() { return getCart().reduce((s, i) => s + i.price, 0) }
function cartCount() { return getCart().length }
function updateCartBadge() {
  const b = document.getElementById("cartBadge");
  if (!b) return;
  const n = cartCount();
  b.textContent = n;
  b.classList.toggle("hidden", n === 0);
}
function petEmoji(t) { return { Dog: "🐕", Cat: "🐱", Bird: "🐦", Fish: "🐟", Rabbit: "🐰" }[t] || "🐾" }

// ---- toast ----
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) { t = document.createElement("div"); t.id = "toast"; t.className = "toast"; document.body.appendChild(t) }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(window._tt); window._tt = setTimeout(() => t.classList.remove("show"), 2500);
}

// ---- nav builder ----
function buildNav(active) {
  const links = [["index.html", "Home"], ["pets.html", "Pets"], ["services.html", "Services"], ["health-check.html", "🩺 AI Check"], ["sell.html", "Sell"], ["about.html", "About"], ["wishlist.html", "❤"], ["admin.html", "Admin"]];
  const u = currentUser();
  const linksHtml = links.map(l => `<li><a href="${l[0]}" class="${l[0] === active ? "active" : ""}">${l[1]}</a></li>`).join("");
  const rightHtml = u
    ? `<span class="nav-user">Hi, ${u.name.split(' ')[0]}</span>
       <button class="btn btn-outline" style="padding:8px 18px;font-size:.88rem" onclick="logout()">Logout</button>`
    : `<a href="login.html" style="font-weight:600;color:#333;font-size:.9rem;padding:8px 4px">Login</a>
       <a href="login.html?mode=signup" class="btn btn-primary" style="padding:8px 20px;font-size:.88rem">Sign Up</a>`;
  document.querySelector("header").innerHTML = `
    <div class="wrap">
      <nav>
       <a href="index.html" class="logo"><img src="images/logo.png"> <span class="logo-text">KindHeart Paws</span></a>

        <div class="nav-center">
          <ul class="nav-links" id="navLinks">${linksHtml}</ul>
        </div>
        <div class="nav-actions">
          ${rightHtml}
          <button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode"><span class="sun">☀️</span><span class="moon">🌙</span></button>
          <button class="cart-toggle" onclick="openCart()" title="Open cart">🛒<span class="cart-badge hidden" id="cartBadge">0</span></button>
          <button class="hamburger" onclick="document.querySelector('.nav-center').classList.toggle('open')">☰</button>
        </div>
      </nav>
    </div>`;
  updateCartBadge();
}

// ---- footer builder ----
function buildFooter() {
  document.querySelector("footer").innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div class="foot-col">
          <h4>🐾 KindHeart Paws</h4>
          <p>Bringing loving homes and happy pets together. Adopt, shop, and care — all in one place.</p>
          <div class="socials"><span>📘</span><span>📸</span><span>🐦</span><span>▶️</span></div>
        </div>
        <div class="foot-col">
          <h4>Quick Links</h4>
          <a href="index.html">Home</a><a href="pets.html">Pets</a><a href="services.html">Services</a><a href="sell.html">Sell</a><a href="wishlist.html">Wishlist</a><a href="admin.html">Admin</a>
        </div>
        <div class="foot-col">
          <h4>Services</h4>
          <a href="services.html">Grooming</a><a href="services.html">Training</a><a href="services.html">Boarding</a><a href="services.html">Vet Care</a>
        </div>
        <div class="foot-col">
          <h4>Contact</h4>
          <a href="mailto:rathodpawan1224@gmail.com">rathodpawan1224@gmail.com</a><a href="tel:+919322120462">+91 9322120462</a><p>Nagpur, Maharashtra</p>
        </div>
      </div>
      <div class="foot-bottom">© ${new Date().getFullYear()} KindHeart Paws. Built with HTML, CSS & JS.</div>
    </div>`;
}

// ---- pet card renderer ----
function petCard(p) {
  const wish = getWishlist().includes(p.id);
  const safeName = p.name.replace(/'/g, "&#39;");
  return `
  <div class="pet-card" onclick="location.href='pet.html?id=${p.id}'" style="cursor:pointer">
    <div class="imgwrap">
      <span class="tag ${p.price === 0 ? "" : "sell"}">${p.price === 0 ? "Adopt" : "For Sale"}</span>
      <button class="heart ${wish ? "on" : ""}" onclick="event.stopPropagation();toggleWish(${p.id});renderPets()">❤</button>
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x400/ff7a59/fff?text=${safeName}'">
    </div>
    <div class="pet-body">
      <h3>${p.name}</h3>
      <p class="pet-meta">${p.breed} • ${p.age} • ${p.gender}</p>
      <div class="pet-spec">${(p.tags || []).map(t => `<span class="chip">${t}</span>`).join("")}</div>
      <div class="pet-foot">
        <span class="price ${p.price === 0 ? "free" : ""}">${p.price === 0 ? "Free Adoption" : ("₹" + p.price.toLocaleString("en-IN"))}</span>
        <button class="btn btn-primary" onclick='event.stopPropagation();openPetModal(${JSON.stringify(p).replace(/'/g, "&#39;")})'>View</button>
      </div>
      <button class="btn btn-outline cart-add-btn" style="width:100%;margin-top:10px;font-size:.85rem;padding:8px" onclick='event.stopPropagation();addPetToCart(${JSON.stringify(p).replace(/'/g, "&#39;")})'>🛒 Add to Cart</button>
    </div>
  </div>`;
}

// ---- pet modal ----
function openPetModal(p) {
  let m = document.getElementById("petModal");
  if (!m) { m = document.createElement("div"); m.id = "petModal"; m.className = "modal-overlay"; document.body.appendChild(m) }
  m.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="document.getElementById('petModal').classList.remove('show')">×</button>
      <div class="modal-detail">
        <img src="${p.img}" onerror="this.src='https://placehold.co/600x400/ff7a59/fff?text=${p.name}'">
        <h3>${p.name}</h3>
        <p class="mp">${p.breed} • ${p.age} • ${p.gender}</p>
        <div class="modal-spec">${(p.tags || []).map(t => `<span class="chip">${t}</span>`).join("")}</div>
        <div class="modal-contact">
          💰 <strong>${p.price === 0 ? "Free Adoption" : ("₹" + p.price.toLocaleString("en-IN"))}</strong><br>
          📞 Seller: ${p.seller || "KindHeart Paws team"}<br>
          📍 ${p.location || "Nagpur, Maharashtra"}
        </div>
        <button class="btn btn-primary btn-block" onclick="enquire(${p.id})">Enquire Now</button>
      </div>
    </div>`;
  m.classList.add("show");
  m.onclick = e => { if (e.target === m) m.classList.remove("show") };
}
function enquire(id) {
  const u = currentUser();
  if (!u) { toast("Please login first"); setTimeout(() => location.href = "login.html", 1200); return }
  toast("Enquiry sent! The seller will contact you soon.");
}

// ---- add pet to cart ----
function addPetToCart(p) {
  const u = currentUser();
  if (!u) { toast("Please login to add items to cart"); setTimeout(() => location.href = "login.html", 1200); return }
  addToCart({
    uid: "pet-" + p.id,
    name: p.name,
    type: p.breed + " (" + p.type + ")",
    price: p.price,
    emoji: petEmoji(p.type),
    img: p.img,
    category: "Pet"
  });
}

// ---- cart drawer ----
function openCart() { renderCart(); document.getElementById("cartOverlay").classList.add("show"); document.getElementById("cartDrawer").classList.add("show") }
function closeCart() { document.getElementById("cartOverlay").classList.remove("show"); document.getElementById("cartDrawer").classList.remove("show") }

function renderCart() {
  const body = document.getElementById("cartBody");
  const foot = document.getElementById("cartFoot");
  if (!body) return;
  const cart = getCart();
  if (cart.length === 0) {
    body.innerHTML = `<div class="cart-empty"><span class="ico">🛒</span>Your cart is empty.<br>Add some pets or services!</div>`;
    foot.style.display = "none";
    return;
  }
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="pic">${item.img ? `<img src="${item.img}" onerror="this.style.display='none';this.parentElement.textContent='${item.emoji || '🐾'}'">` : item.emoji || "🐾"}</div>
      <div class="info">
        <h4>${item.name}</h4>
        <p class="ctype">${item.type}</p>
        <p class="cprice">${item.price === 0 ? "Free" : "₹" + item.price.toLocaleString("en-IN")}</p>
      </div>
      <button class="rm" onclick="removeFromCart('${item.uid}')">Remove</button>
    </div>`).join("");
  foot.style.display = "block";
  document.getElementById("cartTotalAmt").textContent = "₹" + cartTotal().toLocaleString("en-IN");
}

// ---- checkout ----
function openCheckout() {
  const u = currentUser();
  if (!u) { toast("Please login to checkout"); setTimeout(() => location.href = "login.html", 1200); return }
  if (cartCount() === 0) { toast("Your cart is empty"); return }
  closeCart();
  const cart = getCart();
  const subtotal = cartTotal();
  const delivery = subtotal > 0 ? 499 : 0;
  const total = subtotal + delivery;
  let m = document.getElementById("checkoutModal");
  if (!m) { m = document.createElement("div"); m.id = "checkoutModal"; m.className = "modal-overlay"; document.body.appendChild(m) }
  m.innerHTML = `
    <div class="modal" style="max-width:480px">
      <button class="modal-close" onclick="document.getElementById('checkoutModal').classList.remove('show')">×</button>
      <h3>Checkout</h3>
      <p class="mp">Complete your booking — we'll confirm via email & phone.</p>
      <div class="checkout-summary">
        ${cart.map(i => `<div class="row"><span>${i.name}</span><span>${i.price === 0 ? "Free" : "₹" + i.price.toLocaleString("en-IN")}</span></div>`).join("")}
        <div class="row"><span>Delivery / Handling</span><span>₹${delivery}</span></div>
        <div class="row total"><span>Total</span><span>₹${total.toLocaleString("en-IN")}</span></div>
      </div>
      <form id="checkoutForm">
        <div class="checkout-field"><label>Full Name</label><input type="text" id="coName" value="${u.name}" required></div>
        <div class="checkout-field"><label>Email</label><input type="email" id="coEmail" value="${u.email}" required></div>
        <div class="checkout-field"><label>Phone</label><input type="tel" id="coPhone" placeholder="+91 ......" required></div>
        <div class="checkout-field"><label>Delivery Address</label><textarea id="coAddr" placeholder="Full address..." required></textarea></div>
        <div class="checkout-field"><label>Payment Method</label>
          <select id="coPay"><option>COD (Cash on Delivery)</option><option>UPI</option><option>Card</option></select>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Place Order — ₹${total.toLocaleString("en-IN")}</button>
      </form>
    </div>`;
  m.classList.add("show");
  m.onclick = e => { if (e.target === m) m.classList.remove("show") };
  document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("checkoutModal").classList.remove("show");
    localStorage.removeItem("ph_cart");
    updateCartBadge();
    toast("🎉 Order placed! We'll contact you soon.");
  });
}

// ---- scroll reveal (IntersectionObserver) ----
function initReveal() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    els.forEach(e => e.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(e => io.observe(e));
}

// ---- stagger child reveal helper (for grids) ----
function staggerReveal(container, baseDelay) {
  const items = container.children;
  for (let i = 0; i < items.length; i++) {
    items[i].classList.add("reveal");
    items[i].style.transitionDelay = ((baseDelay || 0) + i * 0.08) + "s";
  }
  initReveal();
}

// run after DOM + nav/footer/pets render
document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  setTimeout(initReveal, 80);
});

// =========================================
// CHATBOT LOGIC
// =========================================
const BOT_KB = [
  { keywords: ["adopt", "adoption", "adopting"], reply: "🐾 Adoption is close to our hearts! Visit our Pets page and use the 'Free Adoption' filter to find pets available for free. You can also add them to your cart and checkout. Some pets like Coco and Thumper are free to adopt!", links: [{ text: "Browse Adoptable Pets", url: "pets.html" }] },
  { keywords: ["buy", "purchase", "price", "cost", "how much"], reply: "💰 You can buy pets directly from the Pets page! Prices range from ₹500 (fish) to ₹22,000 (Ragdoll cat). Each pet listing shows the price, breed, age, and seller details. Add pets to your cart and checkout when ready.", links: [{ text: "View All Pets", url: "pets.html" }] },
  { keywords: ["sell", "list", "listing", "put up"], reply: "🏷️ Want to sell or put up a pet for adoption? Go to our Sell page, fill in the pet details (name, breed, age, price, photo), and your listing will appear instantly on the Pets page! You'll need to login first.", links: [{ text: "List a Pet", url: "sell.html" }] },
  { keywords: ["groom", "grooming", "bath", "haircut", "nail"], reply: "✂️ Our Grooming & Spa service includes bath, haircut, nail trim, ear cleaning, and a relaxing pet massage. Prices start at just ₹499! Book it from the Services page.", links: [{ text: "Book Grooming", url: "services.html" }] },
  { keywords: ["train", "training", "obedience", "behavior"], reply: "🎓 We offer professional training classes for obedience, potty training, and behavior correction by certified canine trainers. Starting at ₹1,499. Check the Services page to book!", links: [{ text: "View Training", url: "services.html" }] },
  { keywords: ["board", "boarding", "stay", "overnight", "hotel"], reply: "🏠 Need a safe place for your pet while you're away? Our Pet Boarding service offers cozy, CCTV-monitored overnight stays starting at ₹699/night. Book from the Services page!", links: [{ text: "Book Boarding", url: "services.html" }] },
  { keywords: ["vet", "veterinary", "doctor", "medical", "health", "vaccin", "sick", "ill"], reply: "🩺 Our Veterinary Care service covers routine checkups, vaccinations, dental care, and emergency consultations. Prices start at ₹399. Book an appointment from the Services page!", links: [{ text: "Book Vet Care", url: "services.html" }] },
  { keywords: ["dog", "puppy", "puppies"], reply: "🐕 We have many dogs available! Breeds include Golden Retriever, Labrador, Beagle, German Shepherd, Pomeranian, Pug and more. Visit the Pets page and filter by 'Dog' to see them all.", links: [{ text: "Browse Dogs", url: "pets.html" }] },
  { keywords: ["cat", "kitten", "kittens"], reply: "🐱 We have lovely cats — Persian, British Shorthair, Maine Coon, and Ragdoll breeds. Filter by 'Cat' on the Pets page to find your feline friend!", links: [{ text: "Browse Cats", url: "pets.html" }] },
  { keywords: ["bird", "parrot", "cockatiel", "parakeet"], reply: "🐦 We have birds like Cockatiels and Parakeets available! Prices start from ₹2,000. Check the Pets page and filter by 'Bird'.", links: [{ text: "Browse Birds", url: "pets.html" }] },
  { keywords: ["fish", "aquarium", "goldfish", "betta"], reply: "🐟 We have Goldfish and Betta fish available from ₹500. Perfect for your aquarium! Filter by 'Fish' on the Pets page.", links: [{ text: "Browse Fish", url: "pets.html" }] },
  { keywords: ["rabbit", "bunny", "bunnies"], reply: "🐰 We have adorable rabbits — Holland Lop and Mini Rex breeds, starting at ₹1,800. Check the Pets page and filter by 'Rabbit'.", links: [{ text: "Browse Rabbits", url: "pets.html" }] },
  { keywords: ["login", "signup", "sign up", "register", "account", "log in"], reply: "🔐 You can create a free account or login from the Login page. You'll need an account to add items to cart, checkout, list pets, and book services. It takes just 10 seconds!", links: [{ text: "Login / Sign Up", url: "login.html" }] },
  { keywords: ["cart", "checkout", "order", "payment", "pay"], reply: "🛒 To buy or book: add items to your cart using the 'Add to Cart' buttons, then click the cart icon in the top bar to open your cart drawer. Click 'Checkout' to enter your details and place the order. We support COD, UPI, and Card payments!", links: [] },
  { keywords: ["wishlist", "favorite", "favourite", "saved", "heart", "wish"], reply: "❤️ Click the heart icon on any pet card to save it to your Wishlist. You can view all your saved pets on the Wishlist page anytime!", links: [{ text: "My Wishlist", url: "wishlist.html" }] },
  { keywords: ["dark", "theme", "night", "light mode"], reply: "🌙 You can toggle between light and dark mode using the sun/moon button in the top navigation bar. Your preference is saved automatically!", links: [] },
  { keywords: ["contact", "email", "phone", "call", "reach", "address"], reply: "📞 You can reach us at rathodpawan1224@gmail.com or +91 9322120462. We're based in Nagpur, Maharashtra. Or just ask me anything here!", links: [] },
  { keywords: ["about", "company", "story", "who", "team"], reply: "🐾 KindHeart Paws is on a mission to give every pet a loving home. We connect shelters, breeders, and individuals with families, while also offering grooming, training, boarding, and vet care. Learn more on our About page!", links: [{ text: "About Us", url: "about.html" }] },
  { keywords: ["health", "disease", "ai check", "detect", "sick pet", "skin", "infection", "ai health"], reply: "🩺 Our AI Health Check feature uses a deep learning model (MobileNetV2) to detect potential pet diseases from photos! Go to the AI Health Check page, upload a photo of your pet, and get an instant prediction.", links: [{ text: "AI Health Check", url: "health-check.html" }] },
  { keywords: ["service", "services", "what do you offer", "help with"], reply: "🤝 We offer 8 services: Grooming & Spa, Training, Boarding, Vet Care, Pet Wash, Dog Walking, Pet Food & Supplies, and Pet Relocation. Visit the Services page to book any of them!", links: [{ text: "View All Services", url: "services.html" }] },
  { keywords: ["admin", "dashboard", "manage"], reply: "🔐 The Admin Dashboard lets you manage pet listings, view registered users, and track orders. It's password protected — the demo password is 'admin123'.", links: [{ text: "Admin Dashboard", url: "admin.html" }] },
  { keywords: ["free", "cheapest", "cheap", "affordable", "budget"], reply: "💚 We have pets available for free adoption! Just filter by 'Free Adoption only' on the Pets page. We also have fish from ₹500 and rabbits from ₹1,800.", links: [{ text: "Browse Free Pets", url: "pets.html" }] },
  { keywords: ["hello", "hi", "hey", "namaste", "hola", "greetings"], reply: "👋 Hi there! Welcome to KindHeart Paws! 🐾 I'm KindBot, your friendly assistant. I can help you with pet adoption, buying pets, services like grooming & vet care, and navigating the site. What can I help you with?", links: [] },
  { keywords: ["thank", "thanks", "thank you", "cool", "awesome", "great", "nice", "wow"], reply: "😊 You're welcome! Happy to help! If you have any more questions, just ask. Wishing you and your furry friend the best! 🐾❤️", links: [] },
  { keywords: ["bye", "goodbye", "see you", "later", "exit", "quit"], reply: "👋 Goodbye! Thanks for visiting KindHeart Paws. Come back anytime — we're always here to help you and your pets! 🐾", links: [] }
];

const QUICK_REPLIES = ["Browse Pets 🐾", "Services 💼", "How to Adopt? ❤️", "Sell a Pet 🏷️", "Contact 📞"];

function botReply(msg) {
  const lower = msg.toLowerCase();
  // find best matching KB entry
  let best = null, bestScore = 0;
  for (const entry of BOT_KB) {
    let score = 0;
    for (const kw of entry.keywords) { if (lower.includes(kw)) score += kw.length; }
    if (score > bestScore) { bestScore = score; best = entry; }
  }
  if (best) return best;
  // fallback
  return { reply: "🤔 I'm not quite sure about that, but I'm always learning! Here are some things I can help with:\n\n• Adopting or buying pets\n• Grooming, training, boarding & vet care\n• Selling a pet\n• Using the cart & checkout\n• Dark mode & navigation\n\nTry asking about any of these, or pick a quick reply below!", links: [] };
}

function toggleChatbot() {
  const w = document.getElementById("chatbotWindow");
  const f = document.getElementById("chatbotFab");
  if (w.classList.contains("show")) {
    w.classList.remove("show");
    f.style.display = "flex";
  } else {
    w.classList.add("show");
    f.style.display = "none";
    // greet on first open
    if (!w.dataset.greeted) {
      w.dataset.greeted = "1";
      setTimeout(function () {
        addBotMsg("👋 Hi! I'm KindBot, your KindHeart Paws assistant! 🐾\n\nI can help you with:\n• 🐾 Adopting & buying pets\n• ✂️ Grooming, training & vet care\n• 🏷️ Selling a pet\n• 🛒 Cart & checkout\n\nWhat would you like to know?", true);
      }, 300);
    }
  }
}

function addBotMsg(text, withQuick) {
  const body = document.getElementById("chatbotBody");
  if (!body) return;
  // typing indicator
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.innerHTML = "<span></span><span></span><span></span>";
  body.appendChild(typing);
  body.scrollTop = body.scrollHeight;
  setTimeout(function () {
    typing.remove();
    const el = document.createElement("div");
    el.className = "chat-msg bot";
    el.innerHTML = text.replace(/\n/g, "<br>");
    // add link buttons
    body.appendChild(el);
    if (withQuick) {
      const qr = document.createElement("div");
      qr.className = "chat-msg quick-replies";
      QUICK_REPLIES.forEach(function (q) {
        const chip = document.createElement("button");
        chip.className = "quick-chip";
        chip.textContent = q;
        chip.onclick = function () { sendChatMessage(q); };
        qr.appendChild(chip);
      });
      body.appendChild(qr);
    }
    body.scrollTop = body.scrollHeight;
  }, 600 + Math.random() * 600);
}

function addUserMsg(text) {
  const body = document.getElementById("chatbotBody");
  if (!body) return;
  const el = document.createElement("div");
  el.className = "chat-msg user";
  el.textContent = text;
  body.appendChild(el);
  body.scrollTop = body.scrollHeight;
}

function sendChatMessage(text) {
  text = text || document.getElementById("chatbotInput").value.trim();
  if (!text) return;
  document.getElementById("chatbotInput").value = "";
  addUserMsg(text);
  const resp = botReply(text);
  setTimeout(function () {
    var msgText = resp.reply;
    if (resp.links && resp.links.length > 0) {
      msgText += "\n\n";
      resp.links.forEach(function (l) { msgText += '<a href="' + l.url + '" style="color:var(--primary);font-weight:700;display:inline-block;margin-top:4px">→ ' + l.text + '</a><br>'; });
    }
    addBotMsg(msgText, false);
  }, 300);
}

// Enter key sends message
document.addEventListener("DOMContentLoaded", function () {
  var inp = document.getElementById("chatbotInput");
  if (inp) {
    inp.addEventListener("keypress", function (e) {
      if (e.key === "Enter") { e.preventDefault(); sendChatMessage(); }
    });
  }
});
