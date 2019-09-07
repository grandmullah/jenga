import React, { Component } from 'react'
import { Button, Row, Col } from 'reactstrap';

export default class lands extends Component {
  constructor (props) {
    super(props)
    this.state = { datakey: null }
    const { drizzle, drizzleState } = this.props
    this.regisAcc = this.regisAcc.bind(this)
    this.subAcc = this.subAcc.bind(this)
  }
  regisAcc () {
    const contract = this.props.drizzle.contracts.Jenga
    const ln = this.props.drizzle.web3.utils.fromAscii(this.props.match.params.name)
    const stackId = contract.methods['regisAcc'].cacheSend(ln,{
      from:this.props.drizzleState.accounts[0], gas:500000
    })
    console.log(contract)
  }
  subAcc () {
    const contract = this.props.drizzle.contracts.Jenga
    const ln = this.props.drizzle.web3.utils.fromAscii(this.props.match.params.name)
    const stackId = contract.methods['subAcc'].cacheSend(ln,{
      from:this.props.drizzleState.accounts[0], gas:500000
    })
    console.log(contract)
  }
  componentDidMount () {
    const contract = this.props.drizzle.contracts.Jenga 
     const ln = this.props.drizzle.web3.utils.fromAscii(this.props.match.params.name)
    const dataKey = contract.methods['returnipfs'].cacheCall(ln)
    this.setState({ dataKey })
  }
  render () {
    const { Jenga } = this.props.drizzleState.contracts
    const bal = Jenga.returnipfs[this.state.dataKey]
    const vlue = bal && bal.value
     const copies = 'https://ipfs.io/ipfs/' + vlue
    if (this.props.drizzleState.accounts[0] == 0xFE4B8024BA809b203dfC8a71E9f88F6E2E2E0fCB) {
    return (
      <>
      the Pdf file is found in the link blow:
        <div className='cot'>
         <a href={copies} >{this.props.match.params.name}</a>
        </div>
        <div><br/> <br/>
        <Row>
        <Col>
          <Button onClick = {this.regisAcc}>
          Accept
          </Button>
        </Col>
        </Row>
        </div>
       
      </>
    )
    }else  if (this.props.drizzleState.accounts[0] == 0x14D5a987a409F12436f255d36Adcce67Bc357690) {
     return (
      <>
      the Pdf file is found in the link blow:
        <div className='cot'>
         <a href={copies} >{this.props.match.params.name}</a>
        </div>
        <div><br/> <br/>
        <Row>
        <Col>
          <Button onClick = {this.subAcc}>
          Accept
          </Button>
        </Col>
        </Row>
        </div>
       
      </>
    )
    }
  }
}