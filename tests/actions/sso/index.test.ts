import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { ssoActions } from '../../../src/actions'
import { SsoState, StateCredentialRequestSummary } from '../../../src/reducers/sso/'

describe('SSO action creators', () => {

  const initialState: SsoState = {
    activeCredentialRequest: {
      requester: '',
      callbackURL: '',
      availableCredentials: []
    }
  }
  const mockStore = configureStore([thunk])(initialState)

  beforeEach(() => {
    mockStore.clearActions()
  })

  it('attempts to set credentials request', () => {

    const request: StateCredentialRequestSummary = {
      callbackURL: 'http://example.com/myendpoint/',
      requester: 'did:jolo:mock',
      availableCredentials: []
    }
    // action is synchronous
    const syncAction = ssoActions.setCredentialRequest(request)
    expect(syncAction.type).toBe('SET_CREDENTIAL_REQUEST')
    expect(syncAction.value).toEqual(request)

  })
})
