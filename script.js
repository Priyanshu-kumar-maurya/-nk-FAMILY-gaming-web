// Registration form JS
document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('reg-success').style.display = 'block';
            regForm.reset();
            setTimeout(() => {
                document.getElementById('reg-success').style.display = 'none';
            }, 3000);
        });
    }

    // ---- LIVE YOUTUBE EMBED ----
    // Replace with your YouTube Data API v3 key and Channel ID
    const apiKey = 'YOUR_API_KEY';
    const channelId = 'UCk6vG7w3uRkU6Nw1g7A6r2g'; // Example Channel ID, replace with yours

    function loadLiveClasses() {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}&maxResults=1`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('live-classes');
                container.innerHTML = '';
                if (data.items && data.items.length > 0) {
                    const videoId = data.items[0].id.videoId;
                    container.innerHTML = `
                        <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;box-shadow:0 2px 12px rgba(0,123,255,0.08);margin-bottom:16px;">
                            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                                frameborder="0"
                                allow="autoplay; encrypted-media"
                                allowfullscreen
                                style="position:absolute;top:0;left:0;width:100%;height:100%;">
                            </iframe>
                        </div>
                        <a href="https://youtube.com/@nolanink?si=eNyXA0rg-26FE6cu" target="_blank" class="yt-info-btn">Watch on YouTube</a>
                    `;
                } else {
                    container.innerHTML = '<p>No live MATCHSES right now.</p>';
                }
            })
            .catch(() => {
                document.getElementById('live-classes').innerHTML = '<p>Unable to load live GAMES.</p>';
            });
    }

    loadLiveClasses(); // Call this function on page load

    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Section animation on scroll

    // Add animation class to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animate');
    });

    function revealSections() {
        document.querySelectorAll('.section-animate').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealSections);
    revealSections(); // Initial check

    // Lightbox for gallery images
    const galleryImgs = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    galleryImgs.forEach(img => {
        img.style.cursor = "pointer";
        img.addEventListener('click', function () {
            lightbox.classList.add("show");
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
        });
    });

    closeBtn.addEventListener('click', function () {
        lightbox.classList.remove("show");
        lightboxImg.src = "";
    });

    // Close on background click
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove("show");
            lightboxImg.src = "";
        }
    });
});