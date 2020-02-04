export const sortArrayWithDates = (array, by = 'created_at') =>
  array &&
  array.sort((a, b) => new Date(b[by]).getTime() - new Date(a[by]).getTime())

export const currentDeployStatus = (status, deployments) =>
  (status &&
    Object.keys(status).length &&
    deployments.length &&
    status[deployments[0].id]?.length &&
    sortArrayWithDates(status[deployments[0].id])[0]?.state) ||
  []

export const isStatusLoading = status => {
  const resolvedStatus = ['success', 'failure']

  return !resolvedStatus.includes(status)
}

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
