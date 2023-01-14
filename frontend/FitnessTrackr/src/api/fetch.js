const API_URL = "http://localhost:3003/api";

//-------GET-------

//for public routines
export const getRoutines = async () => {
  try {
    const response = await fetch(`${API_URL}/routines`);
    const routines = await response.json();
    return routines;
  } catch (error) {
    throw error;
  }
};

//for use at a user routines endpoint
export const getUserRoutines = async (username, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${username}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const routines = await response.json();
    return routines;
  } catch (error) {
    throw error;
  }
};

export const getActivities = async () => {
  try {
    const response = await fetch(`${API_URL}/activities`);
    const activities = await response.json();
    return activities;
  } catch (error) {
    throw error;
  }
};

export const getRoutinesByActivity = async (activityId) => {
  try {
    const response = await fetch(
      `${API_URL}/activities/${activityId}/routines`
    );
    const routinesByActivity = await response.json();
    console.log(
      "ROUTINES BY ACTIVITY: ",
      routinesByActivity,
      "activity ID HERE:",
      activityId
    );
    return routinesByActivity;
  } catch (error) {
    throw error;
  }
};

//-------POST-------

export const postRoutine = async (body, token) => {
  try {
    const response = await fetch(`${API_URL}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const postActivity = async (body, token) => {
  try {
    const response = await fetch(`${API_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const postActivityToRoutine = async (body, routineId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

//-------PATCH--------

export const modifyRoutine = async (body, routineId, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const modifyRoutineActivities = async (
  body,
  routineActivityId,
  token
) => {
  try {
    const response = await fetch(
      `${API_URL}/routine_activities/${routineActivityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

//-------DELETE-------

export const deleteRoutine = async (routineId, token) => {
  try {
    const response = await fetch(`${API_URL}/routines/${routineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteRoutineActivity = async (routineActivityId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/routine_activities/${routineActivityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
