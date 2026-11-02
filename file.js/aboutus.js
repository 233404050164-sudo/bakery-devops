document.addEventListener('DOMContentLoaded', () => {
    const parent = document.querySelector('.ours-story');
    
    // CHANGE: Only select divs that start with "ours-story" class
    // This ignores your label and any other extra elements
    const stories = Array.from(parent.querySelectorAll('[class^="ours-story"]'));

    parent.addEventListener('click', () => {
        const currentIndex = stories.findIndex(story => story.classList.contains('active'));

        // Safety check to ensure an active story exists
        if (currentIndex !== -1) {
            stories[currentIndex].classList.remove('active');
            const nextIndex = (currentIndex + 1) % stories.length;
            stories[nextIndex].classList.add('active');
        }
    });
});

// Cursor Label Logic (Keep this separate)
const label = document.getElementById('cursor-label');
const storySection = document.querySelector('.ours-story');

document.addEventListener('mousemove', (e) => {
    label.style.left = e.clientX + 'px';
    label.style.top = e.clientY + 'px';
});

storySection.addEventListener('mouseenter', () => {
    label.style.display = 'block';
});

storySection.addEventListener('mouseleave', () => {
    label.style.display = 'none';
});