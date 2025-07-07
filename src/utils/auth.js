// Mock database
const mockUsers = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@taskflow.com',
    password: 'demo123'
  }
];

// Simulate API delay
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

// Validate user data format
const validateUserData = (data) => {
  return data && typeof data === 'object' && data.username;
};

// Register new user
export const registerUser = async (userData) => {
  await simulateApiDelay();
  
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error('All fields are required');
  }

  if (userData.password !== userData.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const userExists = mockUsers.some(
    user => user.username === userData.username || user.email === userData.email
  );

  if (userExists) {
    throw new Error('User already exists');
  }

  const newUser = {
    id: Date.now().toString(),
    username: userData.username,
    email: userData.email,
    password: userData.password
  };

  mockUsers.push(newUser);
  
  // Store as proper JSON
  const userToStore = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email
  };
  localStorage.setItem('currentUser', JSON.stringify(userToStore));

  return userToStore;
};

// Login user
export const loginUser = async (credentials) => {
  await simulateApiDelay();

  if (!credentials.username || !credentials.password) {
    throw new Error('Username and password are required');
  }

  const user = mockUsers.find(
    u => u.username === credentials.username || u.email === credentials.username
  );

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== credentials.password) {
    throw new Error('Invalid credentials');
  }

  // Store as proper JSON
  const userToStore = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  localStorage.setItem('currentUser', JSON.stringify(userToStore));

  return userToStore;
};

// Social logins (mock implementations)
export const handleGoogleLogin = async () => {
  await simulateApiDelay();
  const userToStore = {
    id: 'google_' + Date.now(),
    username: 'google_user',
    email: 'googleuser@example.com'
  };
  localStorage.setItem('currentUser', JSON.stringify(userToStore));
  return userToStore;
};

export const handleGitHubLogin = async () => {
  await simulateApiDelay();
  const userToStore = {
    id: 'github_' + Date.now(),
    username: 'github_user',
    email: 'githubuser@example.com'
  };
  localStorage.setItem('currentUser', JSON.stringify(userToStore));
  return userToStore;
};

// Auth helpers
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('currentUser');
    if (!userData) return null;
    
    // Handle legacy string format
    if (!userData.startsWith('{')) {
      const migratedData = {
        username: userData,
        email: '',
        id: 'migrated_' + Date.now()
      };
      localStorage.setItem('currentUser', JSON.stringify(migratedData));
      return migratedData;
    }
    
    return JSON.parse(userData);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

// Alias for loginUser
export const authenticateUser = loginUser;

// For development only
export const clearAuthData = () => {
  localStorage.removeItem('currentUser');
};