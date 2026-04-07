export function gatherSkills(inputs = []) {
  return inputs
    .filter(({ checked }) => checked)
    .map(({ value }) => value.toLowerCase());
}


export function getMatch(skills = []) {
  const scores = {
    frontend: 0,
    backend: 0,
    devops: 0,
  };

  const techMap = {
    html: { role: "frontend", weight: 1 },
    css: { role: "frontend", weight: 1 },
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

  // Calculate scores
  for (const skill of skills) {
    const tech = techMap[skill];
    if (tech) {
      scores[tech.role] += tech.weight;
    }
  }

  // Sort roles by score
  const sortedRoles = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);

  const [[topRole, topScore], [secondRole, secondScore]] = sortedRoles;

  // Fullstack strong case
  if (scores.frontend >= 4 && scores.backend >= 4) {
    return "fullstack";
  }

  // Hybrid case (close scores)
  const isClose = topScore - secondScore <= 1 && secondScore > 0;

  if (isClose) {
    const isFullstackCombo =
      [topRole, secondRole].includes("frontend") &&
      [topRole, secondRole].includes("backend");

    return isFullstackCombo
      ? "fullstack"
      : `${topRole}-${secondRole}`;
  }

  // Default: strongest role
  return topRole;
}