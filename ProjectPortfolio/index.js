// Projects Data
const projects = [
    {
        id: 1,
        title: "BMI Calculator",
        description: "Calculate your Body Mass Index with detailed health information and category breakdown. Features real-time calculation and visual feedback.",
        tags: ["Health", "Calculator", "Medical", "Utility"],
        icon: "fa-weight-scale",
        category: "utility",
        features: [
            "Real-time BMI calculation",
            "Weight categories with color coding",
            "Health recommendations",
            "Responsive design",
            "Input validation"
        ],
        file: "projects/Bmicalculator.html",
        code: "projects/Bmicalculator.js"
    },
    {
        id: 2,
        title: "Todo List",
        description: "Advanced task manager with local storage, filtering, statistics, and drag & drop functionality.",
        tags: ["Productivity", "Task Management", "Storage", "Utility"],
        icon: "fa-list-check",
        category: "utility",
        features: [
            "Add/Edit/Delete tasks",
            "Local storage persistence",
            "Filter by status",
            "Task statistics",
            "Mark all complete/clear completed"
        ],
        file: "projects/Todolist.html",
        code: "projects/Todolist.js"
    },
    {
        id: 3,
        title: "Registration Form",
        description: "Complete user registration form with real-time validation, preview, and data handling.",
        tags: ["Forms", "Validation", "User Input", "Utility"],
        icon: "fa-file-signature",
        category: "form",
        features: [
            "Form validation",
            "Real-time error messages",
            "Data preview",
            "Responsive design",
            "Success feedback"
        ],
        file: "projects/Form.html",
        code: "projects/Form.js"
    },
    {
        id: 4,
        title: "Box Color Change",
        description: "Interactive color changing boxes with multiple modes, gradients, and color history.",
        tags: ["Interactive", "Colors", "Animation", "Game"],
        icon: "fa-palette",
        category: "game",
        features: [
            "Multiple color modes",
            "Gradient generator",
            "Color history",
            "Click statistics",
            "Custom color picker"
        ],
        file: "projects/Boxcolor-change.html",
        code: "projects/Boxcolor-change.js"
    },
    {
        id: 5,
        title: "All-in-One Clock App",
        description: "Feature-rich clock application with alarm, timer, stopwatch, and world time zones.",
        tags: ["Time", "Utility", "Alarm", "Productivity"],
        icon: "fa-clock",
        category: "utility",
        features: [
            "Digital clock",
            "Multiple alarms",
            "Stopwatch with laps",
            "Countdown timer",
            "World time zones"
        ],
        file: "projects/Clockapp.html",
        code: "projects/Clockapp.js"
    },
    {
        id: 6,
        title: "Box Swap",
        description: "Drag and drop box swapping puzzle with animations, statistics, and history.",
        tags: ["Games", "Interactive", "Animation", "Puzzle"],
        icon: "fa-arrows-alt",
        category: "game",
        features: [
            "Drag & drop swapping",
            "Swap history",
            "Statistics tracking",
            "Undo functionality",
            "Multiple patterns"
        ],
        file: "projects/Boxswap.html",
        code: "projects/Boxswap.js"
    },
    {
        id: 7,
        title: "Box Swap Pro",
        description: "Advanced box swapping puzzle with multiple game modes, patterns, and auto-solve.",
        tags: ["Games", "Puzzle", "Advanced", "Interactive"],
        icon: "fa-shuffle",
        category: "game",
        features: [
            "Multiple game modes",
            "Different patterns",
            "Auto-solve algorithm",
            "Move statistics",
            "Time tracking"
        ],
        file: "projects/Boxswappro.html",
        code: "projects/Boxswappro.js"
    },
    {
        id: 8,
        title: "Box Color Swap",
        description: "Color swapping game where you match patterns by swapping box colors.",
        tags: ["Games", "Colors", "Matching", "Interactive"],
        icon: "fa-exchange-alt",
        category: "game",
        features: [
            "Color matching",
            "Pattern recognition",
            "Score tracking",
            "Multiple difficulty levels",
            "Color palette"
        ],
        file: "projects/Boxcolorswap.html",
        code: "projects/Boxcolorswap.js"
    },
    {
        id: 9,
        title: "API Fetch Demo",
        description: "Fetch and display data from various public APIs with loading states and error handling.",
        tags: ["API", "Data", "JavaScript", "Network"],
        icon: "fa-database",
        category: "api",
        features: [
            "Multiple API endpoints",
            "Loading states",
            "Error handling",
            "Response statistics",
            "Data visualization"
        ],
        file: "projects/Apifetch.html",
        code: "projects/Apifetch.js"
    },
    {
        id: 10,
        title: "Power Calculator",
        description: "Advanced scientific calculator with memory functions, unit converter, and calculation history.",
        tags: ["Calculator", "Math", "Scientific", "Utility"],
        icon: "fa-calculator",
        category: "calculator",
        features: [
            "Scientific functions",
            "Memory operations",
            "Unit conversion",
            "Calculation history",
            "Responsive design"
        ],
        file: "projects/Calculator.html",
        code: "projects/Calculator.js"
    },
    {
        id: 11,
        title: "Stopwash",
        description: "Advanced scientific Stopwash with memory functions, unit converter, and calculation history.",
        tags: ["Stopwash", "Math", "Scientific", "Utility"],
        icon: "fa-Stopwash",
        category: "Stopwash",
        features: [
            "Scientific functions",
            "Memory operations",
            "Unit conversion",
            "Calculation history",
            "Responsive design"
        ],
        file: "projects/Stopwatch.html",
        code: "projects/Stopwatch.js"
    },
     {
        id: 12,
        title: "Quiz",
        description: "Advanced scientific Stopwash with memory functions, unit converter, and calculation history.",
        tags: ["Quiz", "Math", "Scientific", "Utility"],
        icon: "fa-Quiz",
        category: "Quiz",
        features: [
            "Scientific functions",
            "Memory operations",
            "Unit conversion",
            "Calculation history",
            "Responsive design"
        ],
        file: "projects/Quiz.html",
        code: "projects/Quiz.js"
    },
    {
        id: 13,
        title: "Election",
        description: "Advanced scientific Stopwash with memory functions, unit converter, and calculation history.",
        tags: ["Election", "Math", "Scientific", "Utility"],
        icon: "fa-Election",
        category: "Election",
        features: [
            "Scientific functions",
            "Memory operations",
            "Unit conversion",
            "Calculation history",
            "Responsive design"
        ],
        file: "projects/Election.html",
        code: "projects/Election.js"
    },
    {
        id: 14,
           title: "Banking System",
    description: "Complete banking simulation with deposit, withdrawal, transaction history, and account management.",
    tags: ["Banking", "Finance", "Transaction", "Management", "Utility"],
    icon: "fa-university",
    category: "Finance",
    features: [
        "Deposit and withdrawal functionality",
        "Transaction history tracking",
        "Real-time balance updates",
        "Data export and statements",
        "Responsive design",
        "Local storage persistence"
    ],
        file: "projects/Banking.html",
        code: "projects/Banking.js"
    },
    {
        id: 15,
        title: "square",
        description: "Advanced scientific Stopwash with memory functions, unit converter, and calculation history.",
        tags: ["square", "Math", "Scientific", "Utility"],
        icon: "fa-square",
        category: "square",
        features: [
            "Scientific functions",
            "Memory operations",
            "Unit conversion",
            "Calculation history",
            "Responsive design"
        ],
        file: "projects/Sqaure.html",
        code: "projects/Square.js"
    }




];

// DOM Elements
const projectsContainer = document.getElementById('projects-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const filterTags = document.querySelectorAll('.filter-tag');
const projectModal = document.getElementById('project-modal');
const closeModal = document.getElementById('close-modal');
const launchBtn = document.getElementById('launch-project');
const viewCodeBtn = document.getElementById('view-code');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

// State
let currentFilter = 'all';
let currentSearch = '';
let selectedProject = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    setupEventListeners();
    setupFilterTags();
});

// Event Listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    resetBtn.addEventListener('click', handleReset);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    closeModal.addEventListener('click', closeModalHandler);
    launchBtn.addEventListener('click', launchProject);
    viewCodeBtn.addEventListener('click', viewCode);
    
    // Close modal on outside click
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeModalHandler();
    });
}

// Filter Tags
function setupFilterTags() {
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');
            // Update current filter
            currentFilter = tag.dataset.filter;
            // Reload projects
            loadProjects();
        });
    });
}

// Load Projects
function loadProjects() {
    projectsContainer.innerHTML = '';
    
    let filteredProjects = projects;
    
    // Apply search filter
    if (currentSearch.trim()) {
        const searchTerm = currentSearch.toLowerCase();
        filteredProjects = filteredProjects.filter(project =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            project.features.some(feature => feature.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredProjects = filteredProjects.filter(project =>
            project.category === currentFilter
        );
    }
    
    // Display results
    if (filteredProjects.length === 0) {
        displayNoResults();
        return;
    }
    
    // Create project cards
    filteredProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Create Project Card
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.dataset.id = project.id;
    card.dataset.category = project.category;
    
    card.innerHTML = `
        <div class="project-icon">
            <i class="fas ${project.icon}"></i>
        </div>
        <div class="project-content">
            <div class="project-badge">Project ${project.id}</div>
            <h3><i class="fas ${project.icon}"></i> ${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => openModal(project));
    return card;
}

// Display No Results
function displayNoResults() {
    projectsContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 20px; color: #ccc;"></i>
            <h3>No Projects Found</h3>
            <p>Try a different search term or filter</p>
            <button class="reset-btn" onclick="handleReset()" style="margin-top: 20px; padding: 10px 30px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                Reset Filters
            </button>
        </div>
    `;
}

// Open Modal
function openModal(project) {
    selectedProject = project;
    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
        <div class="project-details">
            <p><strong>Description:</strong> ${project.description}</p>
            
            <p><strong>Features:</strong></p>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <p><strong>Technologies:</strong></p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            
            <p><strong>Project Details:</strong></p>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-top: 10px;">
                <p style="margin: 5px 0;"><i class="fas fa-folder"></i> <strong>Category:</strong> ${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                <p style="margin: 5px 0;"><i class="fas fa-code"></i> <strong>Files:</strong> HTML, CSS, JavaScript</p>
                <p style="margin: 5px 0;"><i class="fas fa-hashtag"></i> <strong>Project ID:</strong> ${project.id}</p>
            </div>
        </div>
    `;
    
    projectModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close Modal
function closeModalHandler() {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Launch Project
function launchProject() {
    if (selectedProject) {
        window.open(selectedProject.file, '_blank');
    }
}

// View Code
function viewCode() {
    if (selectedProject) {
        alert(`JavaScript code for ${selectedProject.title} would be displayed here.\n\nIn a real implementation, this would show the actual code or link to GitHub.`);
    }
}

// Search Handler
function handleSearch() {
    currentSearch = searchInput.value.trim();
    loadProjects();
}

// Reset Handler
function handleReset() {
    searchInput.value = '';
    currentSearch = '';
    currentFilter = 'all';
    
    // Reset filter tags
    filterTags.forEach(tag => {
        tag.classList.remove('active');
        if (tag.dataset.filter === 'all') {
            tag.classList.add('active');
        }
    });
    
    loadProjects();
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape' && projectModal.style.display === 'flex') {
        closeModalHandler();
    }
    
    // Ctrl+F to focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Add loading animation
function showLoading() {
    projectsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
            <h3>Loading Projects...</h3>
        </div>
    `;
}

// Initial load with animation
showLoading();
setTimeout(loadProjects, 500);