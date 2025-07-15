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