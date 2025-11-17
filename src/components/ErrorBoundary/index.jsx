import { Component } from "react"
import { log } from "../../utils/common";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    log("ERROR_BOUNDARY:- ", error, errorInfo)
    this.setState({ hasError: true }, () => {
      if (this.props.onErrorCallback) this.props.onErrorCallback()
    })
  }

  render() {
    if (this.state.hasError) return null

    return this.props.children
  }
}

export default ErrorBoundary
