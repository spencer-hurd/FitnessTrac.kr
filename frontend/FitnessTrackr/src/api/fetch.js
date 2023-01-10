const API_URL = 'http://localhost:3003/api'

//for public routines auth'd or unauth'd
export const getRoutines = async (token) => {
  try {
    const response = await fetch(`${API_URL}/routines`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		});
		const routines = await response.json();
    console.log(routines)
		return routines;
  } catch (error) {
    throw error
  }
}

//for use at a user routines endpoint
export const getUserRoutines = async (username) => {

}