const DEFAULT_HEADER = {
  "Content-Type": "application/json; charset=utf-8",
};

export const fetchData = async <T>(
  url: string,
  headers = DEFAULT_HEADER
): Promise<T> => {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
