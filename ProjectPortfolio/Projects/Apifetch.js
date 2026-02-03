
        // State
        let currentAPI = 'users';
        let currentData = null;
        let totalRequests = 0;
        let successfulRequests = 0;
        let lastResponseTime = 0;
        let dataLimit = 10;
        
        // API Configuration
        const apiConfig = {
            users: {
                name: 'JSONPlaceholder - Users',
                url: 'https://jsonplaceholder.typicode.com/users',
                description: 'Dummy user data for testing'
            },
            posts: {
                name: 'JSONPlaceholder - Posts',
                url: 'https://jsonplaceholder.typicode.com/posts',
                description: 'Sample blog posts'
            },
            products: {
                name: 'Fake Store API - Products',
                url: 'https://fakestoreapi.com/products',
                description: 'Mock e-commerce products'
            },
            photos: {
                name: 'JSONPlaceholder - Photos',
                url: 'https://jsonplaceholder.typicode.com/photos',
                description: 'Sample photos with metadata'
            },
            todos: {
                name: 'JSONPlaceholder - Todos',
                url: 'https://jsonplaceholder.typicode.com/todos',
                description: 'Todo items data'
            },
            quotes: {
                name: 'Quotes API',
                url: 'https://api.quotable.io/quotes?limit=20',
                description: 'Random inspirational quotes'
            }
        };
        
        // API selection
        function selectAPI(api) {
            currentAPI = api;
            
            // Update UI
            document.querySelectorAll('.api-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Update API details
            const config = apiConfig[api];
            document.getElementById('currentApiName').textContent = config.name;
            document.getElementById('apiUrl').textContent = config.url;
            document.querySelector('.api-details p').textContent = config.description;
        }
        
        // Fetch data from API
        async function fetchData() {
            const startTime = Date.now();
            
            // Update UI to loading state
            setStatus('loading', 'Fetching data from API...');
            document.getElementById('loadingSpinner').style.display = 'block';
            document.getElementById('dataDisplay').innerHTML = '';
            document.getElementById('fetchBtn').disabled = true;
            
            try {
                totalRequests++;
                
                const config = apiConfig[currentAPI];
                const response = await fetch(config.url);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                currentData = data;
                
                // Calculate response time
                lastResponseTime = Date.now() - startTime;
                successfulRequests++;
                
                // Update UI
                setStatus('success', `Data fetched successfully in ${lastResponseTime}ms`);
                displayData(data.slice(0, dataLimit));
                
                // Update stats
                updateStats();
                
            } catch (error) {
                setStatus('error', `Error: ${error.message}`);
                displayError(error);
            } finally {
                document.getElementById('loadingSpinner').style.display = 'none';
                document.getElementById('fetchBtn').disabled = false;
            }
        }
        
        // Display data
        function displayData(data) {
            const dataDisplay = document.getElementById('dataDisplay');
            dataDisplay.innerHTML = '';
            
            if (!data || data.length === 0) {
                dataDisplay.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #666;">
                        <i class="fas fa-exclamation-circle" style="font-size: 3rem;"></i>
                        <h3>No Data Available</h3>
                        <p>The API returned an empty response</p>
                    </div>
                `;
                return;
            }
            
            // Create grid layout
            const grid = document.createElement('div');
            grid.className = 'data-display';
            
            data.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'data-card';
                
                let cardContent = '';
                
                switch(currentAPI) {
                    case 'users':
                        cardContent = `
                            <h4><i class="fas fa-user"></i> ${item.name}</h4>
                            <div class="data-item">
                                <span class="data-label">Username:</span>
                                <span class="data-value">${item.username}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Email:</span>
                                <span class="data-value">${item.email}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Phone:</span>
                                <span class="data-value">${item.phone}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Website:</span>
                                <a href="http://${item.website}" target="_blank" class="data-value">${item.website}</a>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Company:</span>
                                <span class="data-value">${item.company.name}</span>
                            </div>
                        `;
                        break;
                        
                    case 'posts':
                        cardContent = `
                            <h4><i class="fas fa-file-alt"></i> ${item.title.substring(0, 30)}...</h4>
                            <div class="data-item">
                                <span class="data-label">User ID:</span>
                                <span class="data-value">${item.userId}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Body:</span>
                                <span class="data-value">${item.body.substring(0, 100)}...</span>
                            </div>
                        `;
                        break;
                        
                    case 'products':
                        cardContent = `
                            <h4><i class="fas fa-shopping-bag"></i> ${item.title.substring(0, 30)}...</h4>
                            <div class="data-item">
                                <span class="data-label">Price:</span>
                                <span class="data-value">$${item.price}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Category:</span>
                                <span class="data-value">${item.category}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Rating:</span>
                                <span class="data-value">${item.rating.rate} (${item.rating.count} reviews)</span>
                            </div>
                            <img src="${item.image}" alt="${item.title}" style="width: 100px; height: 100px; object-fit: contain; margin-top: 10px;">
                        `;
                        break;
                        
                    case 'photos':
                        cardContent = `
                            <h4><i class="fas fa-image"></i> Photo ${item.id}</h4>
                            <img src="${item.thumbnailUrl}" alt="${item.title}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;">
                            <div class="data-item">
                                <span class="data-label">Title:</span>
                                <span class="data-value">${item.title}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Album ID:</span>
                                <span class="data-value">${item.albumId}</span>
                            </div>
                        `;
                        break;
                        
                    case 'todos':
                        cardContent = `
                            <h4><i class="fas fa-tasks"></i> ${item.title.substring(0, 30)}...</h4>
                            <div class="data-item">
                                <span class="data-label">User ID:</span>
                                <span class="data-value">${item.userId}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Completed:</span>
                                <span class="data-value" style="color: ${item.completed ? '#28a745' : '#dc3545'}">
                                    ${item.completed ? '✓ Yes' : '✗ No'}
                                </span>
                            </div>
                        `;
                        break;
                        
                    case 'quotes':
                        cardContent = `
                            <h4><i class="fas fa-quote-left"></i> Quote ${index + 1}</h4>
                            <div class="data-item" style="flex-direction: column; align-items: flex-start;">
                                <span class="data-label">Content:</span>
                                <span class="data-value" style="font-style: italic; margin-top: 5px;">"${item.content}"</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Author:</span>
                                <span class="data-value">${item.author}</span>
                            </div>
                            <div class="data-item">
                                <span class="data-label">Tags:</span>
                                <span class="data-value">${item.tags.join(', ')}</span>
                            </div>
                        `;
                        break;
                }
                
                card.innerHTML = cardContent;
                grid.appendChild(card);
            });
            
            dataDisplay.appendChild(grid);
        }
        
        // Display error
        function displayError(error) {
            const dataDisplay = document.getElementById('dataDisplay');
            dataDisplay.innerHTML = `
                <div class="error-display">
                    <h4><i class="fas fa-exclamation-triangle"></i> Error Fetching Data</h4>
                    <p><strong>Message:</strong> ${error.message}</p>
                    <p><strong>API:</strong> ${apiConfig[currentAPI].url}</p>
                    <p>Please check your internet connection and try again.</p>
                </div>
            `;
        }
        
        // Clear data
        function clearData() {
            document.getElementById('dataDisplay').innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-database" style="font-size: 3rem; margin-bottom: 15px;"></i>
                    <h3>No Data Loaded</h3>
                    <p>Select an API and click "Fetch Data" to load information</p>
                </div>
            `;
            setStatus('ready', 'Data cleared');
        }
        
        // View raw JSON
        function viewRawJSON() {
            if (!currentData) {
                alert('No data loaded yet! Please fetch data first.');
                return;
            }
            
            document.getElementById('dataDisplay').innerHTML = `
                <div class="json-viewer">
                    <h4><i class="fas fa-code"></i> Raw JSON Response</h4>
                    <pre id="jsonOutput"></pre>
                </div>
            `;
            
            const jsonOutput = document.getElementById('jsonOutput');
            jsonOutput.textContent = JSON.stringify(currentData.slice(0, dataLimit), null, 2);
        }
        
        // Update data limit
        function updateLimit() {
            dataLimit = parseInt(document.getElementById('dataLimit').value);
            if (currentData) {
                displayData(currentData.slice(0, dataLimit));
            }
        }
        
        // Status updates
        function setStatus(state, message) {
            const indicator = document.getElementById('statusIndicator');
            const statusText = document.getElementById('statusText');
            const responseTime = document.getElementById('responseTime');
            
            indicator.className = 'status-indicator';
            indicator.classList.add(state);
            
            statusText.textContent = message;
            
            if (state === 'success' && lastResponseTime > 0) {
                responseTime.textContent = `Response time: ${lastResponseTime}ms`;
            } else {
                responseTime.textContent = '';
            }
        }
        
        // Update stats
        function updateStats() {
            document.getElementById('totalRequests').textContent = totalRequests;
            
            const successRate = totalRequests > 0 
                ? Math.round((successfulRequests / totalRequests) * 100) 
                : 100;
            document.getElementById('successRate').textContent = `${successRate}%`;
            
            document.getElementById('lastResponseTime').textContent = `${lastResponseTime}ms`;
            
            const itemCount = currentData ? Math.min(currentData.length, dataLimit) : 0;
            document.getElementById('dataItems').textContent = itemCount;
        }
        
        // Initialize
        updateStats();
    