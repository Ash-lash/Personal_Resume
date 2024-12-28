document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    loadProjects();  // Modified function name
    setupProjectModal();
    smoothScroll();
    animateSkills();
    animateContactIcons();
    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);
    initTextAnimations();

});

function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: '#ffc107' },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' }, polygon: { nb_sides: 5 } },
            opacity: { value: 0.6, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
             line_linked: { enable: true, distance: 150, color: '#ffc107', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });
}


function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// New function to load projects from local server data
function loadProjects() {
    fetch('/project-details') // Fetch project details
        .then(response => response.json())
        .then(projectDetails => {
              const projectsContainer = document.querySelector('.projects-container');
               projectsContainer.innerHTML = '';
                for (const projectName in projectDetails) {
                    if(projectDetails.hasOwnProperty(projectName)){
                       const project = projectDetails[projectName];
                       const projectCard = document.createElement('div');
                        projectCard.classList.add('project');
                        projectCard.dataset.project = projectName;

                        projectCard.innerHTML = `
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-summary">${project.description}</p>
                            <button class="project-btn">Learn More</button>
                        `;
                         projectsContainer.appendChild(projectCard);

                    }
                 }


          })

        .catch(error => console.error('Error fetching projects:', error));
}

function setupProjectModal() {
    const projectsContainer = document.querySelector('.projects-container');
    const projectDetailsModal = document.getElementById('project-details');
    const projectDetailsContent = document.getElementById('project-details-content');

    projectsContainer.addEventListener('click', (event) => {
        const projectCard = event.target.closest('.project');
        if (projectCard) {
            const projectId = projectCard.dataset.project;
            loadProjectDetails(projectId);
            projectDetailsModal.style.display = 'flex';
       }
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.classList.add('close-btn');
    closeButton.onclick = function() {
        projectDetailsModal.style.display = 'none';
        projectDetailsContent.innerHTML = '';
    };
    projectDetailsContent.appendChild(closeButton);

    projectDetailsModal.addEventListener('click', function(event) {
       if (event.target === projectDetailsModal) {
           projectDetailsModal.style.display = 'none';
           projectDetailsContent.innerHTML = '';
        }
    });
}
function loadProjectDetails(projectId) {
    fetch(`/project-details/${projectId}`)
        .then(response => response.json())
        .then(data => {
            const projectDetailsContent = document.getElementById('project-details-content');
            projectDetailsContent.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            `;
        })
        .catch(error => console.error('Error:', error));
}

function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${0.3 + index * 0.1}s`;
        item.style.opacity = 0;
        item.classList.add('slideInFromLeft');
    });
}
function animateContactIcons() {
   const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${0.3 + index * 0.1}s`;
        item.style.opacity = 0;
        item.classList.add('slideInFromLeft');
    });
}

function handleScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight && sectionBottom >= 0) {
            section.querySelectorAll('.text-animation, .skill-category, .skill-item, .project-title, .project-summary, .project-btn, .contact-item, .home-title, .home-text, .cta-button').forEach((element, index) => {
                if (!element.style.animationName) {
                    const delay = element.dataset.animationDelay || '0s';
                    element.style.animationDelay = delay;
                    if (element.classList.contains('text-animation')) {
                          element.style.animation = `slideInFromRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    }else if (element.classList.contains('home-text')) {
                         element.style.animation = `slideInFromRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    }else if (element.classList.contains('home-title')) {
                         element.style.animation = `fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    } else if (element.classList.contains('skill-category') || element.classList.contains('project-title')) {
                        element.style.animation = `fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    } else if (element.classList.contains('skill-item') || element.classList.contains('contact-item')) {
                        element.style.animation = `slideInFromLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    } else if (element.classList.contains('project-summary')) {
                          element.style.animation = `fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    } else if (element.classList.contains('project-btn') || element.classList.contains('cta-button')) {
                       element.style.animation = `fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}`;
                    }

                    element.style.opacity = 1;
                }
            });
        } else {
             section.querySelectorAll('.text-animation, .skill-category, .skill-item, .project-title, .project-summary, .project-btn, .contact-item, .home-title, .home-text, .cta-button').forEach(element => {
                element.style.animation = '';
                element.style.opacity = 0;
           });
        }
    });
}

function initTextAnimations() {
  const nameElement = document.querySelector('.name-animation');
  const titleElement = document.querySelector('.title-animation');

  nameElement.style.animation = '';
    nameElement.offsetHeight;
  nameElement.style.animation = 'type 3s steps(40, end) forwards, blink-caret .75s step-end infinite';

  titleElement.style.animation = '';
  titleElement.offsetHeight;
  titleElement.style.animation = 'slideInFromLeft 1s ease-out forwards';
  titleElement.style.animationDelay = '2s'
}