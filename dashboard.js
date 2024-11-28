document.addEventListener("DOMContentLoaded", () => {
    // Hero Image Upload
    const heroUploadBtn = document.getElementById("hero-upload-btn");
    heroUploadBtn.addEventListener("click", () => {
        const heroImage = document.getElementById("hero-image").files[0];
        if (heroImage) {
            alert(`Hero image "${heroImage.name}" ready for upload!`);
            // Backend upload logic here
        } else {
            alert("Please select a hero image first.");
        }
    });

    // Music Section Upload
    const musicUploadBtn = document.getElementById("music-upload-btn");
    musicUploadBtn.addEventListener("click", () => {
        const musicTitle = document.getElementById("music-title").value;
        const musicArtist = document.getElementById("music-artist").value;
        const musicImage = document.getElementById("music-image").files[0];
        const musicAudio = document.getElementById("music-audio").files[0];

        if (musicTitle && musicArtist && musicImage && musicAudio) {
            alert(`Music "${musicTitle}" by ${musicArtist} ready for upload!`);
            // Backend upload logic here
        } else {
            alert("Please fill out all fields and upload files.");
        }
    });

    // Gallery Image Upload
    const galleryUploadBtn = document.getElementById("gallery-upload-btn");
    galleryUploadBtn.addEventListener("click", () => {
        const galleryImages = document.getElementById("gallery-image").files;
        if (galleryImages.length > 0) {
            alert(`${galleryImages.length} gallery images ready for upload!`);
            // Backend upload logic here
        } else {
            alert("Please select gallery images first.");
        }
    });
});
