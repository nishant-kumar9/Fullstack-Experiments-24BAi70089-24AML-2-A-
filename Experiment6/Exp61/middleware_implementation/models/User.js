// models/User.js
// In-memory user storage (data lost on server restart)
let usersCache = [];
let isInitialized = false;

// User model class
// This User class serves as a simple in-memory model for user data. It includes methods for initializing the user cache with a default user
// finding users by username or ID, saving users to the cache, and creating new users. The toPublicData() method is used to return a version
// of the user object that excludes sensitive information (like the password) when sending responses to clients.
class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    // Initialize with default user
    static init() {
        if (isInitialized) return;

        // Add default test user
        const defaultUser = new User(1, 'testuser', '$2a$10$0Diw5Az0CHfrXWUiQy/vo..75w9aQOWx140bxmkxVo/5fXG.IDYeW');
        usersCache.push(defaultUser);
        isInitialized = true;

        console.log(`Initialized ${usersCache.length} users in memory`);
    }

    // Get all users from cache
    static findAll() {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }
        return [...usersCache]; // Return a copy to prevent external modification
    }

    // Static method to find user by username
    static findByUsername(username) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }
        return usersCache.find(user => user.username === username);
    }

    // Static method to find user by ID
    static findById(id) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }
        return usersCache.find(user => user.id === id);
    }

    // Static method to save user to cache only
    static save(user) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }

        // Update cache
        const existingIndex = usersCache.findIndex(u => u.id === user.id);
        if (existingIndex >= 0) {
            usersCache[existingIndex] = user;
        } else {
            usersCache.push(user);
        }

        return user;
    }

    // Static method to create new user
    static create(username, password) {
        if (!isInitialized) {
            throw new Error('User model not initialized. Call User.init() first.');
        }

        const newId = usersCache.length > 0 ? Math.max(...usersCache.map(u => u.id)) + 1 : 1;
        const user = new User(newId, username, password);
        this.save(user);
        return user;
    }

    // Convert to plain object (without password for responses)
    toPublicData() {
        return {
            id: this.id,
            username: this.username
        };
    }
}

export default User;