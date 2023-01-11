const API_URL = "http://localhost:3003/api"

export const registerUser = async (username, password) => {
	try {
		const response = await fetch(`${API_URL}/users/register`, {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
        username,
        password,
			}),
		});

		const result = await response.json();
    return result
	} catch (err) {
    //if this error is thrown, show a notification
		console.error("Can't register that user. Bummer", err)
    alert('registration error')
	}
};

export const logInUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
        username,
        password,
			}),
		});
		const result = await response.json();
    console.log(result)
		return result;
	} catch (error) {
		console.error(
			"This username and password combination does not exist. Please try again or click Register to create a new account.", error
		);
    alert('login error')
	}
};

export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot fetch that user. Invalid token", err)
  }
};