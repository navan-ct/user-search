export interface User {
  id: string;
  name: string;
  items: string[];
  address: string;
  pincode: string;
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch(
      "https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json",
    );
    if (!response.ok) {
      throw new Error("Something went wrong.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
