import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import Form from 'react-bootstrap/Form'
import Applications from './Applications'
import Ipfs from '../Ipfs'


export default class Registration extends React.Component {
  constructor (props) {
    super(props)
    const { drizzle, drizzleState } = this.props
    this.state = { purpose: '', name: '', file: '', StackId: null, ipfshash: '', date:'' }
    this.handlepurpose = this.handlepurpose.bind(this)
    this.handlename = this.handlename.bind(this)
    this.handleconfile = this.handleconfile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }
  handlepurpose (event) {
    const ln = this.props.drizzle.web3.utils.fromAscii(event.target.value)
    this.setState({ purpose: ln })
    event.preventDefault() 
   }
  handlename (event) {
    const z = this.props.drizzle.web3.utils.fromAscii(event.target.value)

    console.log(z)
    this.setState({ name: z })
    event.preventDefault()
  }
 
  handleconfile (event) {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({ file:  Buffer(reader.result) })
    }
    event.preventDefault()
  }
  handleSubmit (event) {
    console.log("ererre")
    event.preventDefault()
    Ipfs.files.add(this.state.file, (error,result) => {
      if(error){
        console.log(error)
        return
      }
        this.setState({ ipfshash: result[0].hash })
         console.log(this.state.ipfshash)
     
    const ln = this.props.drizzle.web3.utils.fromAscii(this.state.ipfshash)
    const contract = this.props.drizzle.contracts.Jenga
    const stackId = contract.methods['applyapproval'].cacheSend(this.state.ipfshash,this.state.purpose, this.state.name,{
      from:this.props.drizzleState.accounts[0], gas:500000
    })
    
    this.setState({ StackId: stackId })
  })
  }
  GettxStatus = () => {
    const txHash = this.props.drizzleState.transactionStack[this.state.StackId]
    if(!txHash) return null
    return `Transaction status: ${this.props.drizzleState.transactions[txHash] && this.props.drizzleState.transactions[txHash].status}`
  }
  render () {
    if(this.props.drizzleState.accounts[0] == 0x0cAB5ed01BcBb9d45eaf36d9888fc55C2613D14c){
    return (
      < >
        <Row>
          <Col>
          <Applications drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
          </Col>
          <Col >
            <div className='formid'>
              <h2> Register construction"</h2>
              <div className='form2'>
                <form onSubmit={this.handleSubmit}>
                  <Form.Group as={Row} >
                    <Form.Label column sm={3} >construction Purpose:</Form.Label>
                    <Col>
                      <Form.Control type='text' onChange={this.handlepurpose} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3} >construction Name:</Form.Label>
                    <Col>
                      <Form.Control type='text'onChange={this.handlename} />
                    </Col>
                  </Form.Group>
                  
                  <Form.Group>
                    <Form.Label> Copies of Contruction:</Form.Label>
                    <Form.Control type='file' onChange={this.handleconfile} />
                  </Form.Group>
                  <Form.Group>
                    <Button type='submit' color='primary' name='lg' block> Register</Button>
                  </Form.Group>
                </form>
                <div>
                  {this.GettxStatus()}
                </div>
              </div>
            </div>
          </Col>
        </Row> 
      </>
    )
  }else{
      return (
        <div>
        <Applications drizzle={this.props.drizzle} drizzleState={this.props.drizzleState} />
        </div>
      )
    }
  }
}