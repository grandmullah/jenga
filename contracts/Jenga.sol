pragma solidity 0.5.8;

contract Jenga {
    
    struct Application {
        address applicant;
        string ipfs;
        bytes32 purpose;
        bytes32 name;
        bool applied;
        bool registry;
        bool rejected;
        bool sub;
        bool paid;
        bool circulate;
        bool forward;
        
    }
   
    bytes32[] public  applicationArr;
    mapping (bytes32=>Application)public Appmap;
    mapping (address => uint256) public balances;
     constructor () public {
         balances[0x0cAB5ed01BcBb9d45eaf36d9888fc55C2613D14c]= 10000;
     }
    function applyapproval
    ( 
        string memory _ipfs,
        bytes32 _purpose,
        bytes32 _name
    ) public
    {
      Application storage app = Appmap[_name];
      bytes32[] storage arr = applicationArr;
      app.applicant = msg.sender;
      app.ipfs = _ipfs;
      app.purpose = _purpose;
      app.name = _name;
      app.applied = true;
      arr.push(_name);

    }

    function applications()public view returns (
     address[] memory add,
     bytes32[] memory purp,
     bytes32[] memory name ,
     bool[] memory applied,
     bool[] memory registry,
     bool[] memory rejected,
     bool[] memory sub
     
    
    ){
        name = new bytes32[](applicationArr.length);
        purp = new bytes32[](applicationArr.length);
        add = new address[](applicationArr.length);
        applied = new bool[](applicationArr.length);
        registry = new bool[](applicationArr.length);
        rejected = new bool[](applicationArr.length);
        sub = new bool[](applicationArr.length);
       
     for (uint i = 0; i < applicationArr.length; i++) {        
        add[i] = Appmap[applicationArr[i]].applicant;
        purp[i] = Appmap[applicationArr[i]].purpose;
        name[i] = Appmap[applicationArr[i]].name;
        applied[i] = Appmap[applicationArr[i]].applied;
        registry[i] = Appmap[applicationArr[i]].registry;
        rejected[i] = Appmap[applicationArr[i]].rejected;
        sub[i] = Appmap[applicationArr[i]].sub;
        
     }
     return(add,purp,name,applied,registry,sub,rejected);
    }
    function returnipfs(bytes32 _name)public view returns(string memory ipfsfle) {
        ipfsfle = Appmap[_name].ipfs;
        return(ipfsfle);
        
    }
    function regisAcc(bytes32 _name)public {
        Application storage app = Appmap[_name];
        app.registry = true;
    }
    function subAcc(bytes32 _name)public {
        Application storage app = Appmap[_name];
        app.sub = true;
    }
    function reject(bytes32 _name)public {
        Application storage app = Appmap[_name];
        app.rejected = true;
    }
    function applicationss()public view returns(
        bool[] memory paid,
        bool[] memory circulate
    ) {
        paid = new bool[](applicationArr.length);
        circulate = new bool[](applicationArr.length);
        for (uint i = 0; i < applicationArr.length; i++) { 
            paid[i] = Appmap[applicationArr[i]].paid;
            circulate[i] = Appmap[applicationArr[i]].paid;
        }
        return(paid,circulate);
        
    }
    function Transfer
    (
       address _to, 
       uint256 _value,
       bytes32 _name
    ) 
    public
    {  Application storage app = Appmap[_name];
        app.paid = true;
        require(balances[msg.sender]>= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;xdvx vnh bbkvlb jn
        
    }
    function getbalance(address _user)public view returns(uint256){
        return balances[_user];
    }
    function forwardd(bytes32 _name)public {
        Application storage app = Appmap[_name];
        app.forward = true;
    }
    function circulatee(bytes32 _name)public {e3QDRdwefdx
        Application storage app = Appmap[_name];
        app.circulate = true;
    }
}