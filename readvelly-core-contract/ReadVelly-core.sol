pragma solidity ^0.4.24;

contract readVellyCore {
address ROTAddr = 0x09019b599EcEb3f1b75A887d37B6eFA36633465a;
address RPTAddr = 0x69bE4Bc52994051Fde529d436cB0e7BABcf2bFd4;
    struct Book{
        string bookname;
        uint bookprice;
        bool sendable;
    }
        Book[] Books;

function addBook(string memory _bookname, uint _bookprice, bool _sendable) public returns(uint){
Books.push(Book(_bookname, _bookprice, _sendable));
return Books.length - 1;
}

function editBookPrice(uint bookid, uint _bookprice) public{
Books[bookid].bookprice = _bookprice;
}

function getROT() public payable{
    uint excessAmount = msg.value;
	if (excessAmount > 0) {
      msg.sender.transfer(excessAmount);
      RPTAddr.call(bytes4(keccak256("transfer(address, uint256)")), msg.sender, msg.value);
    }
}

function getKlay(uint amount) public payable{
    RPTAddr.call(bytes4(keccak256("transferFrom(address,address,uint256)")), msg.sender,address(this),amount);
}

function buyBook(uint bookid) public payable{
uint bookprice = Books[bookid].bookprice;
uint tokenid = stringToUint(addressToString(msg.sender)) + bookid;
RPTAddr.call(bytes4(keccak256("transferFrom(address,address,uint256)")), msg.sender,address(this),bookprice);
ROTAddr.call(bytes4(keccak256("mint(address,uint)")),msg.sender,tokenid);
}

function verifyROT(uint tokenid , uint bookid) public returns (bool){
return true;
}

function sendROT(address targetAddr, uint bookid) public{
uint tokenid = stringToUint(addressToString(msg.sender)) + bookid;
ROTAddr.call(bytes4(keccak256("burn(uint)")),tokenid);
ROTAddr.call(bytes4(keccak256("mint(address,uint)")),msg.sender,tokenid);
}

function getOfflineKey(uint bookid) public view returns (uint){
uint key = stringToUint(addressToString(msg.sender)) + bookid;
return key;
}

function renounceBook(uint bookid) public {
uint tokenid = stringToUint(addressToString(msg.sender)) + bookid;
ROTAddr.call(bytes4(keccak256("burn(uint)")),tokenid);
}

function addressToString(address _address) public pure returns(string memory) {
    bytes32 _bytes = bytes32(uint256(_address));
    bytes memory HEX = "0123456789abcdef";
    bytes memory _string = new bytes(42);
    _string[0] = '0';
    _string[1] = 'x';
    for(uint i = 0; i < 20; i++) {
        _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
        _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
    }
    return string(_string);
}
  function stringToUint(string s) constant returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }
}
