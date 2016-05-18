import React from 'react'
import Reflux from 'reflux'
import Radium from 'radium'
import {FOAF} from 'lib/namespaces'

import ProfileNode from 'components/node/profile.jsx'
import ImageNode from 'components/node/image.jsx'

import Dialog from 'components/common/dialog.jsx'
import {Layout, Content} from 'components/layout'

import NodeStore from 'stores/node'
import graphActions from 'actions/graph-actions'

let Node = React.createClass({
  mixins: [
    Reflux.connect(NodeStore, 'node')
  ],

  contextTypes: {
    history: React.PropTypes.any,
    node: React.PropTypes.object
  },

  componentDidMount() {
    this.refs.dialog.show()
  },

  componentWillUnmount() {
    this.refs.dialog.hide()
  },

  _handleClose() {
    this.refs.dialog.hide()
    graphActions.viewNode(null)
  },

  getStyles() {
    return {
      bar: {
        position: 'absolute',
        backgroundColor: 'transparent'
      }
    }
  },

  getNodeContent(type) {
    console.log(type)
    switch (type) {
      case FOAF('PersonalProfileDocument').uri:
        return ProfileNode
      case FOAF('Image').uri:
        return ImageNode
      case FOAF('Person').uri:
        return ProfileNode
      default:
        return ProfileNode
    }
  },

  render() {
    let {node} = this.props

    let content, Component = this.getNodeContent(node.type)

    if (Component) {
      content = <Component node={node} onClose={this._handleClose} />
    }

    return (
      <Dialog ref="dialog" fullscreen={true}>
        <Layout>
          <Content>
            {content}
          </Content>
        </Layout>
      </Dialog>
    )
  }
})

export default Radium(Node)
