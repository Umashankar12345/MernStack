
        // DOM Elements
        const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const markAllBtn = document.getElementById('markAllBtn');
        const clearCompletedBtn = document.getElementById('clearCompletedBtn');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');
        
        // State
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        let currentFilter = 'all';
        
        // Initialize
        renderTodos();
        updateStats();
        
        // Add Task
        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTask();
        });
        
        function addTask() {
            const taskText = taskInput.value.trim();
            if (!taskText) {
                alert('Please enter a task!');
                return;
            }
            
            const newTodo = {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            todos.push(newTodo);
            saveTodos();
            renderTodos();
            updateStats();
            
            taskInput.value = '';
            taskInput.focus();
        }
        
        // Toggle Complete
        function toggleComplete(id) {
            todos = todos.map(todo => 
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            saveTodos();
            renderTodos();
            updateStats();
        }
        
        // Edit Task
        function editTask(id) {
            const todo = todos.find(t => t.id === id);
            const newText = prompt('Edit task:', todo.text);
            if (newText && newText.trim()) {
                todo.text = newText.trim();
                saveTodos();
                renderTodos();
            }
        }
        
        // Delete Task
        function deleteTask(id) {
            if (confirm('Are you sure you want to delete this task?')) {
                todos = todos.filter(todo => todo.id !== id);
                saveTodos();
                renderTodos();
                updateStats();
            }
        }
        
        // Mark All Complete
        markAllBtn.addEventListener('click', () => {
            todos = todos.map(todo => ({ ...todo, completed: true }));
            saveTodos();
            renderTodos();
            updateStats();
        });
        
        // Clear Completed
        clearCompletedBtn.addEventListener('click', () => {
            if (confirm('Clear all completed tasks?')) {
                todos = todos.filter(todo => !todo.completed);
                saveTodos();
                renderTodos();
                updateStats();
            }
        });
        
        // Filter Tasks
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderTodos();
            });
        });
        
        // Render Todos
        function renderTodos() {
            // Filter todos based on current filter
            let filteredTodos = todos;
            if (currentFilter === 'pending') {
                filteredTodos = todos.filter(todo => !todo.completed);
            } else if (currentFilter === 'completed') {
                filteredTodos = todos.filter(todo => todo.completed);
            }
            
            // Show/hide empty state
            if (filteredTodos.length === 0) {
                emptyState.style.display = 'block';
                todoList.innerHTML = '';
                todoList.appendChild(emptyState);
            } else {
                emptyState.style.display = 'none';
                todoList.innerHTML = '';
                
                filteredTodos.forEach(todo => {
                    const todoItem = document.createElement('div');
                    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                    
                    todoItem.innerHTML = `
                        <input type="checkbox" class="task-checkbox" ${todo.completed ? 'checked' : ''}
                               onclick="toggleComplete(${todo.id})">
                        <div class="task-text">${todo.text}</div>
                        <div class="task-actions">
                            <button class="action-btn edit-btn" onclick="editTask(${todo.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteTask(${todo.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    
                    todoList.appendChild(todoItem);
                });
            }
        }
        
        // Update Stats
        function updateStats() {
            const total = todos.length;
            const completed = todos.filter(todo => todo.completed).length;
            const pending = total - completed;
            
            totalTasksEl.textContent = total;
            completedTasksEl.textContent = completed;
            pendingTasksEl.textContent = pending;
        }
        
        // Save to Local Storage
        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    