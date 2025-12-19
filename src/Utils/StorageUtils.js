export const saveCasesToStorage = (cases) => {
  try {
    localStorage.setItem('forensicCases', JSON.stringify(cases));
    return true;
  } catch (error) {
    console.error('Error saving cases:', error);
    return false;
  }
};

export const loadCasesFromStorage = () => {
  try {
    const cases = localStorage.getItem('forensicCases');
    return cases ? JSON.parse(cases) : null;
  } catch (error) {
    console.error('Error loading cases:', error);
    return null;
  }
};

export const saveUserToStorage = (user) => {
  try {
    localStorage.setItem('forensicUser', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

export const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('forensicUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading user:', error);
    return null;
  }
};

export const clearStorage = () => {
  localStorage.removeItem('forensicUser');
};
