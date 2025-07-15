export function gatherSkills(checkArr) {
  //const checkedSkills = [];
  // checkArr.forEach(element => {
  //    if(element.checked){
  //     checkedSkills.push(element.value);
  //    }
  // });
  const checkedSkills = checkArr
    .filter((element) => element.checked)
    .map((element) => element.value.toLowerCase());
  //const skills = checkedSkills.map((element) => element.value);
  return checkedSkills;
}


export function getMatch(skillArr) {
  const scores = {
    frontend: 0,
    backend: 0,
    devops: 0,
  };
  const techMap = {
  html: { role: "frontend", weight: 1 },
  'css': { role: "frontend", weight: 1 },
  javascript: { role: "frontend", weight: 2 },
  react: { role: "frontend", weight: 2 },
  "node.js": { role: "backend", weight: 2 },
  express: { role: "backend", weight: 2 },
  mongodb: { role: "backend", weight: 1 },
  sql: { role: "backend", weight: 1 },
  git: { role: "devops", weight: 1 },
  docker: { role: "devops", weight: 2 },
  linux: { role: "devops", weight: 1 },
  "ci/cd": { role: "devops", weight: 2 },
};

  skillArr.forEach((skill) => {
    const tech = techMap[skill];
    
    if (tech) {
    scores[tech.role] += tech.weight;
    }
  });

  let likelyRole = "";

// Full stack case
if (scores.frontend >= 4 && scores.backend >= 4) {
  likelyRole = "fullstack";
}
// Check for hybrid combinations
else {
  // Convert scores to sorted array: [['frontend', 5], ['backend', 5], ['devops', 2]]
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  const second = sorted[1];

  // If top two roles are tied or close (difference ≤ 1), suggest hybrid
  if (top[1] - second[1] <= 1 && second[1] > 0) {
    if(top[0] == "frontend" || top[0] == "backend" && second[0] == "frontend" || second[0] == "backend" ){
        likelyRole = "fullstack";
        
    }
    else{
    likelyRole = `${top[0]}-${second[0]}`;
    }
  } else {
    likelyRole = top[0]; // fallback to strongest single role
  }
}
  return likelyRole;
}
