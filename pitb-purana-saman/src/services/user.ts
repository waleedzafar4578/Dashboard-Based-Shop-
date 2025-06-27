import { User } from "../commonTypes/user";


export async function getUsers(token: string): Promise<User[]> {
  try {
    const response = await fetch('http://localhost:5154/v1/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'text/plain'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function deleteUser(
  user: User,
  token: string
): Promise<void> {
  const response = await fetch(`http://localhost:5154/v1/users?userId=${user.id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Delete failed (${response.status}): ${errorText}`);
  }
}
export async function updateUser(user: User, token: string) {
  const response = await fetch(`http://localhost:5154/v1/users?userId=${user.id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    },
    body: JSON.stringify(user)
  });
  if (!response.ok) {
    throw new Error(`Failed to update user: ${response.statusText}`);
  }
}


export const createOrder = async (orderData: any) => {
  const response = await fetch("http://localhost:5154/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/plain",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Failed to place order");
  }

  return await response.json();
};
