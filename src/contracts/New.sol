// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract New {
    mapping(address => bytes32[]) public fileOwners;
    mapping(bytes32 => mapping(address => bool)) public accessControl;
    function add(bytes32 _hash) external{
        fileOwners[msg.sender].push(_hash);
    }
    function check(address _user, bytes32 _hash) private view returns(bool) {
        for(uint i=0;i<fileOwners[msg.sender].length;i++) {
            if(fileOwners[_user][i] == _hash)
            return true;
        }
        return false;
    }
    function allow(address _user,bytes32 _hash) external{
        require(check(msg.sender,_hash),"You don't have access");
        accessControl[_hash][_user] = true;
    }
    function disallow(address _user,bytes32 _hash) external{
        require(check(msg.sender,_hash),"You don't have access");
        accessControl[_hash][_user] = false;
    }
    function display() external view returns(bytes32[] memory){
        return fileOwners[msg.sender];
    }
}