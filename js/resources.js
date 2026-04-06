/*
export const fetchData = async () => {
    try{
    const response = await fetch("../data/resources.json");
    const data = await response.json();
    if(!response.ok){
        alert("Error: " + response.status);
        return;
    }
    return data;
}
catch(err){
    console.error(err);

}

}
*/
export const fetchData = async () => {
  try {
    const response = await fetch("/data/resources.json");

    // 1. Check if the request was successful first
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 2. Parse the data only after confirming a good response
    return await response.json();
    
  } catch (err) {
    // 3. Centralize error logging and re-throw so the UI knows something failed
    console.error("Failed to fetch resources:", err);
    throw err; 
  }
};