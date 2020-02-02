export const sortArrayWithDates = (array, by = 'created_at') =>
  array &&
  array.sort((a, b) => new Date(b[by]).getTime() - new Date(a[by]).getTime())

export const currentDeployStatus = (status, deployments) =>
  Object.keys(status).length &&
  deployments.length &&
  status[deployments[0].id]?.length &&
  sortArrayWithDates(status[deployments[0].id])[0]?.state

export const isStatusLoading = status => {
  const resolvedStatus = ['success', 'failure']

  return !resolvedStatus.includes(status)
}
