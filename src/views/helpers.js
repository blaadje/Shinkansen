export const fetchDeploys = async (octokit, { username }, { name }) => {
  const { data } = await octokit.repos.listDeployments({
    owner: username,
    repo: name,
    per_page: 9,
  })

  return data
}

export const fetchTags = async (octokit, { username }, { name }) => {
  const { data } = await octokit.repos.listTags({
    owner: username,
    repo: name,
  })

  return data
}

export const fetchStatus = async (
  deploymentId,
  octokit,
  { username },
  { name }
) => {
  const { data } = await octokit.repos.listDeploymentStatuses({
    owner: username,
    repo: name,
    deployment_id: deploymentId,
  })

  return data
}
