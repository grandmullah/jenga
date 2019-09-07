import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import {Link} from 'react-router-dom'

export default class Applications extends React.Component {
  constructor (props) {
    super(props)
    this.state = { dataKey: null,datakey:null }
    this.handlecirculate =this.handlecirculate.bind(this)
    this.handleforward =this.handleforward.bind(this)
   
  }
  handlecirculate(event){
    event.preventDefault()
    const contract = this.props.drizzle.contracts.Jenga
    const stackId = contract.methods['cirulatee'].cacheSend( {
      from: this.props.drizzleState.accounts[0],
      gas: 500000
    })
  }
  handleforward(event){
    event.preventDefault()
    const contract = this.props.drizzle.contracts.Jenga
    const stackId = contract.methods['forwardd'].cacheSend( {
      from: this.props.drizzleState.accounts[0],
      gas: 500000
    })
  }
  componentDidMount () {
    const { drizzle, drizzleState } = this.props
    const contract = drizzle.contracts.Jenga
    const dataKey = contract.methods['applications'].cacheCall()
    const datakey = contract.methods['applicationss'].cacheCall()
    this.setState({ dataKey:dataKey ,datakey:datakey})
  }
  render () {
    const { Jenga } = this.props.drizzleState.contracts
    const apps = Jenga.applications[this.state.dataKey]
    const app = Jenga.applicationss[this.state.datakey]
    const lb = apps && apps.value
    const lbb = app && app.value
    console.log(lbb)
    const lt = apps && apps.value[0].length
    const ltt = app && app.value[0].length
    const lna = 0
    const loa = 1
    const sza = 2
    const AppArr = []
    const AppArr2 = []
    for (let i = 0; i < lt; i++) {
      if (lb[lna][i] === this.props.drizzleState.accounts[0]) {
      const apps = {
        name: this.props.drizzle.web3.utils.toAscii(lb[sza][i]),
        purp: this.props.drizzle.web3.utils.toAscii(lb[loa][i]),
        applied:lb[3][i], registry:lb[4][i],
        sub:lb[5][i],
        
        rejected:lb[6][i]
      }
      AppArr.push(apps)
    }else {
      const apps = {
        addr: lb[lna][i],
        name: this.props.drizzle.web3.utils.toAscii(lb[sza][i]),
        purp: this.props.drizzle.web3.utils.toAscii(lb[loa][i]),
        applied:lb[3][i],
        nameb:lb[sza][i],
        registry:lb[4][i],
        sub:lb[5][i],
        
        rejected:lb[6][i]
      }
     
      AppArr.push(apps)
      //AppArr.push(jj)
    }
    
    }
    for (let i = 0; i < ltt; i++) {
      const jj={
        paid:lbb[0][i],
        circulate:lbb[0][i]
      }
      //console.log()
      AppArr2.push(jj)
    }
      console.log(AppArr2)
  if (this.props.drizzleState.accounts[0] == 0xFE4B8024BA809b203dfC8a71E9f88F6E2E2E0fCB) {
    return(
      <Row>
      <Col>
          incoming applications:
          <div>
         {AppArr2.map((it) => AppArr.map((item) => item.applied && !item.rejected && !item.registry ? 
         (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry ? ("Rejected"):("awaiting")}<br/>
        <Link to={'/project/'+item.name}>read files here to accept or reject</Link>
      </div>):(null) 
      ))}
      </div>
      </Col>
      <Col>
        rejected Applications
         <div>
      {AppArr2.map((it) =>AppArr.map((item) => item.applied && item.rejected && item.registry ? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry ? ("approved"):("Rejected")}<br/>
      </div>):(null) 
      ))}
      </div>
      </Col>
      <Col>  approved applications:
         <div>
      {AppArr2.map((it)=>AppArr.map((item) => item.applied && !item.rejected && item.registry ? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry  ? ("Approved"):("Rejected")}<br/>
      </div>):(null) 
      ))}
      </div>
      </Col>

      </Row>
    )
  }else if (this.props.drizzleState.accounts[0] == 0x14D5a987a409F12436f255d36Adcce67Bc357690) 
   {
       return(
      <Row>
      <Col>
          incoming applications:
          <div>
         {AppArr2.map((it)=>AppArr.map((item) => item.registry && !item.rejected && !item.sub ? 
         (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry ? ("awaiting "):("Rejected")}<br/>
        <Link to={'/project/'+item.name}>read files here to accept or reject</Link>
      </div>):(null) 
      ))}
      </div>
      </Col>
      <Col>
        rejected Applications
         <div>
      {AppArr2.map((it) =>AppArr.map((item) => item.registry && item.rejected ? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry ? ("approved"):("Rejected")}<br/>
      </div>):(null) 
      ))}
      </div>
      </Col>
      <Col>  awaiting payments applications:
         <div>
      {AppArr2.map((it)=>AppArr.map((item) => item.registry && !item.rejected && item.sub && !it.paid? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry  ? ("Approved"):("Rejected")}<br/>
      </div>):(null) 
      ))}
      </div>
      </Col>
       <Col>  paid  Applications:
         <div>
      {AppArr2.map((it)=>AppArr.map((item) => item.registry && !item.rejected && item.sub && it.paid? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry  ? ("Approved"):("Rejected")}<br/>
        <Button onClick= {(e)=>this.handlecirculate()}>Criculate</Button><br/><br/>
        <Button onClick= {this.handleforward}>Forward to LHP</Button>
      </div>):(null) 
      ))}
      </div>
      </Col>

      </Row>
    )
  }else  if(this.props.drizzleState.accounts[0] == 0x08aE0D49e29D7e0524de0C1717a309b013210F2c){
          return (
            <div>
            <Col>  incoming Applications:
            <div>
         {AppArr2.map((it)=>AppArr.map((item) => it.forwad && !item.rejected? 
         (<div className='cot' key= {item.name}>
           Applicant:{item.addr} <br/>
           Purpose :{item.purp}<br />
           name :{item.name} <br />
           stage: {item.registry  ? ("Approved"):("Rejected")}<br/>
           <Button onClick= {(e)=>this.handlec()}>Criculate</Button><br/><br/>
          
         </div>):(null) 
         ))}
         </div>
         </Col>
            </div>
          )
  }else
   {
      return (
        <div> your applications
          {AppArr.map((item) => item.applied && !item.rejected ? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry  ? ("rejected"):("on progrees")}<br/>
      </div>):(null) 
      )} 
      <div> awaiting payment
      {AppArr2.map((it)=>AppArr.map((item) => item.registry && !item.rejected && item.sub && !it.paid? 
      (<div className='cot' key= {item.name}>
        Applicant:{item.addr} <br/>
        Purpose :{item.purp}<br />
        name :{item.name} <br />
        stage: {item.registry  ? ("awaiting payment"):("Rejected")}<br/>
        <Link to={'/transfer/'+item.name}>PAY</Link>
      </div>):(null) 
      ))}
      </div>
        </div>
      )
    }
  }
}