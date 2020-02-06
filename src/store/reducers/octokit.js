import { LOAD_OCTOKIT } from '../actions/actionTypes'
import Octokit from '@octokit/rest'

const INITIAL_STATE = {}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOAD_OCTOKIT:
      const octokit = new Octokit({
        auth: action.payload,
        baseUrl: 'https://api.github.com',
      })
      return { ...state, octokit }
    default:
      return state
  }
}
