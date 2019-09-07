import React, { Component } from 'react'

export default class lands extends Component {
  constructor (props) {
    super(props)
    this.state = { datakey: null }
    const { drizzle, drizzleState } = this.props
  }
  componentDidMount () {
    const contract = this.props.drizzle.contracts.Jenga
    const dataKey = contract.methods['getbalance'].cacheCall(this.props.drizzleState.accounts[0])
    this.setState({ dataKey })
  }
  render () {
    const { Jenga } = this.props.drizzleState.contracts
    const bal = Jenga.getbalance[this.state.dataKey]
    const vlue = bal && bal.value
   
    console.log(vlue)
    return (
      <>
      Your Balance is:
        <div className='cot'>
          {vlue} Coins
        </div>
      </>
    )
  }
}