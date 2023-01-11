const API_URL = 'http://localhost:3003/api'

//for public routines
export const getRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines`);
		const routines = await response.json();
		return routines;
  } catch (error) {
    throw error
  }
}

//for use at a user routines endpoint
export const getUserRoutines = async (username, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${username}/routines`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		});
		const routines = await response.json();
		return routines;
  } catch (error) {
    throw error
  }
}

export const getActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`)
    const activities = await response.json()
    return activities    
  } catch (error) {
    throw error
  }
}