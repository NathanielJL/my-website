console.log('Script loaded!');

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

console.log('Hamburger:', hamburger); 
console.log('Nav:', nav); 

if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
        console.log('Hamburger clicked!'); 
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ========== PROJECT CATEGORY NAVIGATION ==========

const categories = Array.from(new Set(
    Array.from(document.querySelectorAll('.project-item'), item => item.dataset.category)
));
let currentCategoryIndex = 0;

const prevButton = document.getElementById('prevCategory');
const nextButton = document.getElementById('nextCategory');
const categoryLabel = document.getElementById('categoryLabel');
const projectsContainer = document.getElementById('projectsContainer');
const projectItems = document.querySelectorAll('.project-item');

if (categoryLabel && projectItems.length) {
    function showCategory(categoryIndex) {
        currentCategoryIndex = categoryIndex;
        const currentCategory = categories[categoryIndex];
        
        // Update label
        categoryLabel.textContent = currentCategory;
        
        // Show/hide projects with fade effect
        projectItems.forEach(item => {
            if (item.dataset.category === currentCategory) {
                item.style.display = 'grid';
                item.offsetHeight; // Trigger reflow
                item.classList.remove('fade-out');
                item.classList.add('fade-in');
            } else {
                item.classList.remove('fade-in');
                item.classList.add('fade-out');
                setTimeout(() => {
                    if (item.dataset.category !== currentCategory) {
                        item.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentCategoryIndex - 1;
            if (newIndex < 0) {
                newIndex = categories.length - 1; // Loop to end
            }
            showCategory(newIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            let newIndex = currentCategoryIndex + 1;
            if (newIndex >= categories.length) {
                newIndex = 0; // Loop to start
            }
            showCategory(newIndex);
        });
    }

    // Initialize with first category
    showCategory(0);
}

// ========== IMAGE LIGHTBOX ==========
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('imageModalClose');
const resultImages = document.querySelectorAll('.results-gallery img');
const resumeButton = document.querySelector('.cv-button');
const resumeModal = document.getElementById('resumeModal');
const resumeModalClose = document.getElementById('resumeModalClose');

function closeImageModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

resultImages.forEach(image => {
    image.addEventListener('click', function() {
        if (!modal || !modalImage || !modalCaption) return;

        modalImage.src = image.src;
        modalImage.alt = image.alt;

        const caption = image.closest('.project-image')?.querySelector('.caption');
        modalCaption.textContent = caption ? caption.textContent.replace(/^Results:\s*/i, '') : image.alt;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
});

if (resumeButton && resumeModal) {
    resumeButton.addEventListener('click', function() {
        resumeModal.classList.add('active');
        resumeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });
}

if (modalClose) {
    modalClose.addEventListener('click', closeImageModal);
}

if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
}

if (modal) {
    modal.addEventListener('click', function(event) {
        if (event.target === modal || event.target.hasAttribute('data-close-modal')) {
            closeImageModal();
        }
    });
}

if (resumeModal) {
    resumeModal.addEventListener('click', function(event) {
        if (event.target === resumeModal || event.target.hasAttribute('data-close-resume')) {
            closeResumeModal();
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (modal && modal.classList.contains('active')) {
            closeImageModal();
        }
        if (resumeModal && resumeModal.classList.contains('active')) {
            closeResumeModal();
        }
    }
});