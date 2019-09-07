import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import Balance  from './Balance'
import { Form } from 'react-bootstrap'



export default class setprofile extends Component {
  constructor (props) {
    super(props)
    this.state = { amount: null , add: '', StackId: null,he:'' }
    const { drizzle, drizzleState } = this.props
    this.handlesubmit = this.handlesubmit.bind(this)
    this.handleadd = this.handleadd.bind(this)
    this.handleamount = this.handleamount.bind(this)
    
  }
 
  handleamount (event) {
    event.preventDefault()
    const nm = event.target.value
    this.setState({ amount:nm })
  }
  handleadd (event) {
    event.preventDefault()
    const nm = event.target.value
    this.setState({ add:nm })
  }
  handlesubmit (event) {
    event.preventDefault()
     const contract = this.props.drizzle.contracts.Jenga
     const ln = this.props.drizzle.web3.utils.fromAscii(this.props.match.params.name)
     console.log('ln :', ln);
     const stackId = contract.methods['Transfer'].cacheSend( this.state.add,this.state.amount,ln,{
       from: this.props.drizzleState.accounts[0],
       gas: 500000
     })
    
     this.setState({
       StackId: stackId
     
    })
  }
     GettxStatus = () => {
       const txHash = this.props.drizzleState.transactionStack[this.state.StackId]
       if (!txHash) return null
       return `Transaction status: ${this.props.drizzleState.transactions[txHash] && this.props.drizzleState.transactions[txHash].status}`
     }
  
  render () {
    return (<div>
      < >
        <Row>
        <Col>
        </Col>
          <Col >
            <div className='formid'>
              <h2> Pay for your construction</h2>
              <div className='form2'>
                <Form onSubmit={this.handlesubmit} >
                  <Form.Group>
                    <Form.Label> Amount:</Form.Label>
                    <Form.Control type='text' onChange={this.handleamount} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Address To :</Form.Label>
                    <Form.Control type='text' onChange={this.handleadd} />
                  </Form.Group>
                  <Form.Group>
                    <Button type='submit' color='primary' size='lg' block> PAY </Button>
                  </Form.Group>
                </Form>
              </div>
              <div>
              <Balance  drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
              </div>
              <div>
                {this.GettxStatus()}
              </div>
            </div>
          </Col>
          <Col>
          </Col>
        </Row>
      </ > </div>
    )
  }
}