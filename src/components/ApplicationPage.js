import React from 'react'
import { Container } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useFirebaseConnect } from 'react-redux-firebase'
import { auth } from 'firebase'
import { useSelector, connect } from 'react-redux'
import { compose } from 'redux'
import requireAuth from './hoc/requireAuth'

const ApplicationPage = ({ auth }) => {
  let { id } = useParams()
  useFirebaseConnect([`applications/${auth.uid}/${id}`])
  const application = useSelector(({ firebaseReducer: { data } }) => {
    console.log(data)
    return (
      data.applications &&
      data.applications[auth.uid] &&
      data.applications[auth.uid][id]
    )
  })

  console.log(application)

  return <Container maxWidth="lg">{application && application}</Container>
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default compose(connect(mapStateToProps), requireAuth)(ApplicationPage)
