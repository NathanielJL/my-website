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