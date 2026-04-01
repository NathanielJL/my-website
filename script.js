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

const categories = ['personal', 'machine-learning'];
const categoryNames = {
    'personal': 'Personal Projects',
    'machine-learning': 'Machine-Learning Projects'
};
let currentCategoryIndex = 0;

const prevButton = document.getElementById('prevCategory');
const nextButton = document.getElementById('nextCategory');
const categoryLabel = document.getElementById('categoryLabel');
const projectsContainer = document.getElementById('projectsContainer');
const projectItems = document.querySelectorAll('.project-item');

function showCategory(categoryIndex) {
    currentCategoryIndex = categoryIndex;
    const currentCategory = categories[categoryIndex];
    
    // Update label
    categoryLabel.textContent = categoryNames[currentCategory];
    
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

prevButton.addEventListener('click', function() {
    let newIndex = currentCategoryIndex - 1;
    if (newIndex < 0) {
        newIndex = categories.length - 1; // Loop to end
    }
    showCategory(newIndex);
});

nextButton.addEventListener('click', function() {
    let newIndex = currentCategoryIndex + 1;
    if (newIndex >= categories.length) {
        newIndex = 0; // Loop to start
    }
    showCategory(newIndex);
});

// Initialize with first category
showCategory(0);