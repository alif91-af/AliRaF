// বোতামে ক্লিক হলে মেসেজ দেখানো
document.getElementById("contactButton").addEventListener("click", function() {
    alert("Thanks for clicking! You can email me at alif@example.com.");
});

// পেজ লোড হলে সংরক্ষিত ছবি লোড করা
window.addEventListener("load", function() {
    const uploadMessage = document.getElementById("uploadMessage");
    const savedPhotos = localStorage.getItem("uploadedPhotos");
    
    if (savedPhotos) {
        const photos = JSON.parse(savedPhotos);
        photos.forEach(function(photoData, index) {
            addPhotoElement(uploadMessage, photoData, index);
        });
    }
});

// ছবি element তৈরি করার ফাংশন
function addPhotoElement(container, photoData, index) {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo-item';
    photoDiv.innerHTML = '<img src="' + photoData + '" alt="photo"><button class="delete-btn" data-index="' + index + '">×</button>';
    container.prepend(photoDiv);
    
    // Delete button এ ইভেন্ট লিসেনার যোগ করা
    photoDiv.querySelector('.delete-btn').addEventListener('click', function() {
        deletePhoto(index);
    });
}

// ছবি delete করার ফাংশন
function deletePhoto(index) {
    let savedPhotos = localStorage.getItem("uploadedPhotos");
    if (savedPhotos) {
        const photos = JSON.parse(savedPhotos);
        photos.splice(index, 1);
        localStorage.setItem("uploadedPhotos", JSON.stringify(photos));
        
        // সব ছবি রিলোড করা
        const uploadMessage = document.getElementById("uploadMessage");
        uploadMessage.innerHTML = '';
        photos.forEach(function(photoData, idx) {
            addPhotoElement(uploadMessage, photoData, idx);
        });
    }
}

// ফটো আপলোড বোতামে ক্লিক হলে
document.getElementById("uploadButton").addEventListener("click", function() {
    const photoInput = document.getElementById("photoUpload");
    const uploadMessage = document.getElementById("uploadMessage");
    
    if (photoInput.files.length === 0) {
        uploadMessage.innerHTML = '<p style="color: red; width: 100%;">Please select a photo first!</p>';
        return;
    }
    
    let savedPhotos = localStorage.getItem("uploadedPhotos");
    savedPhotos = savedPhotos ? JSON.parse(savedPhotos) : [];
    
    // সব ছবি loop করে দেখাব
    for (let i = 0; i < photoInput.files.length; i++) {
        const file = photoInput.files[i];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const photoData = e.target.result;
            savedPhotos.unshift(photoData);
            localStorage.setItem("uploadedPhotos", JSON.stringify(savedPhotos));
            
            addPhotoElement(uploadMessage, photoData, 0);
        };
        
        reader.readAsDataURL(file);
    }
    
    // ফাইল ইনপুট ক্লিয়ার করা
    photoInput.value = '';
});